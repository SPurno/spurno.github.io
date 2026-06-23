/**
 * Turso database connection module for Cloudflare Workers
 * Uses @libsql/client/web which is designed for edge runtimes.
 */
import { createClient } from '@libsql/client/web';

let db = null;

export function getDb(env) {
  if (!db) {
    db = createClient({
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    });
  }
  return db;
}

/**
 * Initialize database schema — creates tables if they don't exist.
 * Called on first request to ensure schema is ready.
 */
export async function ensureSchema(env) {
  const db = getDb(env);

  await db.execute(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT DEFAULT '',
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );`);

  await db.execute(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);`);

  await db.execute(`CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    item_id TEXT NOT NULL,
    item_type TEXT NOT NULL DEFAULT 'video',
    title TEXT NOT NULL DEFAULT '',
    thumbnail TEXT DEFAULT '',
    url TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, item_id)
  );`);

  await db.execute(`CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);`);

  await db.execute(`CREATE TABLE IF NOT EXISTS download_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    item_id TEXT NOT NULL,
    item_type TEXT NOT NULL DEFAULT 'video',
    title TEXT NOT NULL DEFAULT '',
    platform TEXT DEFAULT 'adobe',
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );`);

  await db.execute(`CREATE INDEX IF NOT EXISTS idx_downloads_user ON download_history(user_id);`);

  await db.execute(`CREATE TABLE IF NOT EXISTS password_resets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    used INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );`);

  await db.execute(`CREATE INDEX IF NOT EXISTS idx_resets_token ON password_resets(token);`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_resets_user ON password_resets(user_id);`);

  return true;
}

// ── Users ──────────────────────────────────────────────

export async function findUserByEmail(env, email) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT id, email, name, password_hash, created_at FROM users WHERE email = ?',
    args: [email],
  });
  return result.rows[0] || null;
}

export async function findUserById(env, id) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT id, email, name, created_at FROM users WHERE id = ?',
    args: [id],
  });
  return result.rows[0] || null;
}

/**
 * Generate a unique user ID in SP-hex format (e.g., SP0A3F9B2)
 */
function generateUserId() {
  const hex = Array.from({ length: 7 }, () =>
    Math.floor(Math.random() * 16).toString(16).toUpperCase()
  ).join('');
  return `SP${hex}`;
}

export async function createUser(env, { email, name, passwordHash }) {
  const db = getDb(env);

  // Retry loop in case of collision (extremely unlikely with 16^7 ≈ 268M IDs)
  for (let attempt = 0; attempt < 5; attempt++) {
    const id = generateUserId();
    try {
      const result = await db.execute({
        sql: "INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?) RETURNING id, email, name, created_at",
        args: [id, email, name, passwordHash],
      });
      return result.rows[0] || null;
    } catch (err) {
      // Only retry on UNIQUE constraint violation on the primary key
      if (err?.message?.includes('UNIQUE constraint failed') || err?.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
        continue;
      }
      throw err;
    }
  }

  // Fallback: extremely unlikely to reach here
  throw new Error('Failed to generate unique user ID after 5 attempts');
}

export async function updateUser(env, id, { name }) {
  const db = getDb(env);
  const result = await db.execute({
    sql: "UPDATE users SET name = ?, updated_at = datetime('now') WHERE id = ? RETURNING id, email, name, created_at",
    args: [name, id],
  });
  return result.rows[0] || null;
}

export async function updatePassword(env, id, passwordHash) {
  const db = getDb(env);
  await db.execute({
    sql: "UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?",
    args: [passwordHash, id],
  });
}

export async function findUserPasswordHash(env, userId) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT password_hash FROM users WHERE id = ?',
    args: [userId],
  });
  const row = result.rows[0];
  return row ? row.password_hash : null;
}

// ── Favorites ──────────────────────────────────────────

export async function getFavorites(env, userId) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT id, item_id, item_type, title, thumbnail, url, created_at FROM favorites WHERE user_id = ? ORDER BY created_at DESC',
    args: [userId],
  });
  return result.rows;
}

export async function addFavorite(env, userId, { itemId, itemType, title, thumbnail, url }) {
  const db = getDb(env);
  const result = await db.execute({
    sql: "INSERT OR IGNORE INTO favorites (user_id, item_id, item_type, title, thumbnail, url) VALUES (?, ?, ?, ?, ?, ?) RETURNING id, item_id, item_type, title, created_at",
    args: [userId, itemId, itemType || 'video', title || '', thumbnail || '', url || ''],
  });
  return result.rows[0] || null;
}

export async function removeFavorite(env, userId, itemId) {
  const db = getDb(env);
  await db.execute({
    sql: 'DELETE FROM favorites WHERE user_id = ? AND item_id = ?',
    args: [userId, itemId],
  });
  return true;
}

export async function isFavorite(env, userId, itemId) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT id FROM favorites WHERE user_id = ? AND item_id = ?',
    args: [userId, itemId],
  });
  return result.rows.length > 0;
}

// ── Download History ───────────────────────────────────

export async function getDownloads(env, userId) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT id, item_id, item_type, title, platform, created_at FROM download_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    args: [userId],
  });
  return result.rows;
}

export async function addDownload(env, userId, { itemId, itemType, title, platform }) {
  const db = getDb(env);
  const result = await db.execute({
    sql: "INSERT INTO download_history (user_id, item_id, item_type, title, platform) VALUES (?, ?, ?, ?, ?) RETURNING id, created_at",
    args: [userId, itemId, itemType || 'video', title || '', platform || 'adobe'],
  });
  return result.rows[0] || null;
}

// ── Password Resets ────────────────────────────────────

export async function createResetToken(env, userId, token, expiresAt) {
  const db = getDb(env);
  await db.execute({
    sql: "INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)",
    args: [userId, token, expiresAt],
  });
}

export async function findValidResetToken(env, token) {
  const db = getDb(env);
  const result = await db.execute({
    sql: "SELECT id, user_id, token, expires_at FROM password_resets WHERE token = ? AND used = 0 AND expires_at > datetime('now')",
    args: [token],
  });
  return result.rows[0] || null;
}

export async function markResetTokenUsed(env, tokenId) {
  const db = getDb(env);
  await db.execute({
    sql: 'UPDATE password_resets SET used = 1 WHERE id = ?',
    args: [tokenId],
  });
}
