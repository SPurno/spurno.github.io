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

  await db.execute(`CREATE TABLE IF NOT EXISTS custom_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    order_number TEXT NOT NULL UNIQUE,
    animation_type TEXT NOT NULL,
    duration_seconds INTEGER,
    description TEXT NOT NULL,
    reference_links TEXT DEFAULT '',
    budget_range TEXT DEFAULT '',
    deadline TEXT DEFAULT '',
    style_vibe TEXT DEFAULT '',
    payment_method TEXT DEFAULT '',
    contact_email TEXT DEFAULT '',
    contact_phone TEXT DEFAULT '',
    additional_notes TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending',
    quoted_price TEXT DEFAULT '',
    admin_notes TEXT DEFAULT '',
    admin_response TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );`);

  await db.execute(`CREATE INDEX IF NOT EXISTS idx_orders_user ON custom_orders(user_id);`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_orders_status ON custom_orders(status);`);

  await db.execute(`CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    subject TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    admin_reply TEXT DEFAULT '',
    admin_replied_at TEXT DEFAULT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );`);

  await db.execute(`CREATE INDEX IF NOT EXISTS idx_messages_user ON contact_messages(user_id);`);

  // ── Schema Migrations ────────────────────────────────
  // Add columns that may be missing if the table was created by an older schema version.
  // SQLite does not support IF NOT EXISTS for ALTER TABLE, so we catch the "duplicate" error.
  try { await db.execute(`ALTER TABLE contact_messages ADD COLUMN admin_reply TEXT DEFAULT ''`); } catch (e) { if (!e?.message?.includes('duplicate column')) throw e; }
  try { await db.execute(`ALTER TABLE contact_messages ADD COLUMN admin_replied_at TEXT DEFAULT NULL`); } catch (e) { if (!e?.message?.includes('duplicate column')) throw e; }

  try { await db.execute(`ALTER TABLE users ADD COLUMN phone TEXT DEFAULT ''`); } catch (e) { if (!e?.message?.includes('duplicate column')) throw e; }
  try { await db.execute(`ALTER TABLE users ADD COLUMN avatar_url TEXT DEFAULT ''`); } catch (e) { if (!e?.message?.includes('duplicate column')) throw e; }

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
    sql: 'SELECT id, email, name, phone, avatar_url, created_at FROM users WHERE id = ?',
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

export async function updateUser(env, id, { name, phone, avatar_url }) {
  const db = getDb(env);
  const result = await db.execute({
    sql: "UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone), avatar_url = COALESCE(?, avatar_url), updated_at = datetime('now') WHERE id = ? RETURNING id, email, name, phone, avatar_url, created_at",
    args: [name || null, phone !== undefined ? phone : null, avatar_url !== undefined ? avatar_url : null, id],
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

// ── Custom Orders ─────────────────────────────────────

function generateOrderNumber(userId) {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 1679616).toString(36).toUpperCase().padStart(4, '0');
  return `ORD-${userId}-${ts}${rand}`;
}

export async function createOrder(env, userId, data) {
  const db = getDb(env);
  const orderNumber = generateOrderNumber(userId);
  const {
    animationType, durationSeconds, description,
    referenceLinks, budgetRange, deadline, styleVibe,
    paymentMethod, contactEmail, contactPhone, additionalNotes,
  } = data;
  const result = await db.execute({
    sql: `INSERT INTO custom_orders (
      user_id, order_number, animation_type, duration_seconds, description,
      reference_links, budget_range, deadline, style_vibe,
      payment_method, contact_email, contact_phone, additional_notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id, order_number, animation_type, duration_seconds, description, reference_links, budget_range, deadline, style_vibe, payment_method, contact_email, contact_phone, additional_notes, status, created_at`,
    args: [
      userId, orderNumber, animationType, durationSeconds || null, description,
      referenceLinks || '', budgetRange || '', deadline || '', styleVibe || '',
      paymentMethod || '', contactEmail || '', contactPhone || '', additionalNotes || '',
    ],
  });
  return result.rows[0] || null;
}

export async function getOrders(env, userId) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT id, order_number, animation_type, duration_seconds, description, reference_links, budget_range, deadline, style_vibe, payment_method, contact_email, contact_phone, additional_notes, status, quoted_price, admin_response, created_at FROM custom_orders WHERE user_id = ? ORDER BY created_at DESC',
    args: [userId],
  });
  return result.rows;
}

export async function getOrderById(env, orderId) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT id, user_id, order_number, animation_type, duration_seconds, description, reference_links, budget_range, deadline, style_vibe, payment_method, contact_email, contact_phone, additional_notes, status, quoted_price, admin_notes, admin_response, created_at, updated_at FROM custom_orders WHERE id = ?',
    args: [orderId],
  });
  return result.rows[0] || null;
}

/**
 * Admin: get all orders across all users, with user info
 */
export async function getAllOrders(env) {
  const db = getDb(env);
  const result = await db.execute({
    sql: `SELECT o.id, o.user_id, o.order_number, o.animation_type, o.duration_seconds,
      o.description, o.reference_links, o.budget_range, o.deadline,
      o.style_vibe, o.payment_method, o.contact_email, o.contact_phone,
      o.additional_notes,
      o.status, o.quoted_price, o.admin_notes, o.admin_response,
      o.created_at, o.updated_at,
      u.email AS user_email, u.name AS user_name
      FROM custom_orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC`,
    args: [],
  });
  return result.rows;
}

/**
 * Admin: update an order (status, quoted_price, admin_response, admin_notes)
 */
export async function updateOrder(env, orderId, data) {
  const db = getDb(env);
  const { status, quotedPrice, adminResponse, adminNotes } = data;
  const result = await db.execute({
    sql: `UPDATE custom_orders SET
      status = COALESCE(?, status),
      quoted_price = COALESCE(?, quoted_price),
      admin_response = COALESCE(?, admin_response),
      admin_notes = COALESCE(?, admin_notes),
      updated_at = datetime('now')
      WHERE id = ?
      RETURNING id, user_id, order_number, status, quoted_price, admin_response, admin_notes, updated_at`,
    args: [status || null, quotedPrice || null, adminResponse || null, adminNotes || null, orderId],
  });
  return result.rows[0] || null;
}

/**
 * User: delete own order (ownership must be checked by caller)
 */
export async function deleteOrder(env, orderId) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'DELETE FROM custom_orders WHERE id = ? RETURNING id, order_number',
    args: [orderId],
  });
  return result.rows[0] || null;
}

/**
 * Admin: delete any order (no ownership check)
 */
export async function adminDeleteOrder(env, orderId) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'DELETE FROM custom_orders WHERE id = ? RETURNING id, order_number, user_id',
    args: [orderId],
  });
  return result.rows[0] || null;
}

// ── Contact Messages ──────────────────────────────────

export async function createMessage(env, userId, data) {
  const db = getDb(env);
  const { name, email, subject, message } = data;
  const result = await db.execute({
    sql: "INSERT INTO contact_messages (user_id, name, email, subject, message) VALUES (?, ?, ?, ?, ?) RETURNING id, name, email, subject, message, admin_reply, admin_replied_at, created_at",
    args: [userId, name || '', email || '', subject || '', message],
  });
  return result.rows[0] || null;
}

export async function getUserMessages(env, userId) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT id, name, email, subject, message, admin_reply, admin_replied_at, created_at FROM contact_messages WHERE user_id = ? ORDER BY created_at DESC',
    args: [userId],
  });
  return result.rows;
}

export async function getAllMessages(env) {
  const db = getDb(env);
  const result = await db.execute({
    sql: `SELECT m.id, m.user_id, m.name, m.email, m.subject, m.message, m.admin_reply, m.admin_replied_at, m.created_at,
      u.email AS user_email, u.name AS user_name
      FROM contact_messages m
      LEFT JOIN users u ON m.user_id = u.id
      ORDER BY m.created_at DESC`,
    args: [],
  });
  return result.rows;
}

export async function updateMessageReply(env, messageId, reply) {
  const db = getDb(env);
  const result = await db.execute({
    sql: "UPDATE contact_messages SET admin_reply = ?, admin_replied_at = datetime('now') WHERE id = ? RETURNING id, admin_reply, admin_replied_at",
    args: [reply, messageId],
  });
  return result.rows[0] || null;
}

export async function deleteMessage(env, messageId) {
  const db = getDb(env);
  await db.execute({
    sql: 'DELETE FROM contact_messages WHERE id = ?',
    args: [messageId],
  });
  return true;
}

export async function getMessageStats(env) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT COUNT(*) AS count FROM contact_messages',
    args: [],
  });
  return result.rows[0] || { count: 0 };
}

// ── Admin: Create message to a user (compose) ─────────

export async function createAdminMessage(env, userId, data) {
  const db = getDb(env);
  const { name, email, subject, message } = data;
  const result = await db.execute({
    sql: "INSERT INTO contact_messages (user_id, name, email, subject, message) VALUES (?, ?, ?, ?, ?) RETURNING id, name, email, subject, message, created_at",
    args: [userId, name || 'Admin', email || '', subject || '', message],
  });
  return result.rows[0] || null;
}

// ── Users (Admin) ─────────────────────────────────────

export async function getAllUsers(env) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT id, email, name, phone, avatar_url, created_at FROM users ORDER BY created_at DESC',
    args: [],
  });
  return result.rows;
}

export async function adminUpdateUser(env, userId, data) {
  const db = getDb(env);
  const sets = [];
  const args = [];
  if (data.name !== undefined) { sets.push('name = ?'); args.push(data.name); }
  if (data.phone !== undefined) { sets.push('phone = ?'); args.push(data.phone); }
  if (data.avatar_url !== undefined) { sets.push('avatar_url = ?'); args.push(data.avatar_url); }
  if (!sets.length) return null;
  args.push(userId);
  const result = await db.execute({
    sql: 'UPDATE users SET ' + sets.join(', ') + ' WHERE id = ?',
    args: args,
  });
  if (result.rowsAffected === 0) return null;
  const user = await db.execute({
    sql: 'SELECT id, email, name, phone, avatar_url, created_at FROM users WHERE id = ?',
    args: [userId],
  });
  return user.rows[0] || null;
}

export async function getMessageById(env, messageId) {
  const db = getDb(env);
  const result = await db.execute({
    sql: 'SELECT id, user_id, name, email, subject, message, admin_reply, admin_replied_at, created_at FROM contact_messages WHERE id = ?',
    args: [messageId],
  });
  return result.rows[0] || null;
}

/**
 * Admin: get order stats (counts by status)
 */
export async function getOrderStats(env) {
  const db = getDb(env);
  const result = await db.execute({
    sql: `SELECT status, COUNT(*) AS count FROM custom_orders GROUP BY status ORDER BY status`,
    args: [],
  });
  return result.rows;
}
