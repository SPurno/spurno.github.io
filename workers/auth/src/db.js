/**
 * Turso database connection module for Cloudflare Workers
 */
import { connect } from '@tursodatabase/serverless';

let db = null;

export function getDb(env) {
  if (!db) {
    db = connect({
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
export function ensureSchema(env) {
  const db = getDb(env);

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT DEFAULT '',
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `);

  return true;
}

/**
 * Find a user by email
 */
export function findUserByEmail(env, email) {
  const db = getDb(env);
  const stmt = db.prepare('SELECT id, email, name, password_hash, created_at FROM users WHERE email = ?');
  const row = stmt.get(email);
  return row || null;
}

/**
 * Find a user by ID
 */
export function findUserById(env, id) {
  const db = getDb(env);
  const stmt = db.prepare('SELECT id, email, name, created_at FROM users WHERE id = ?');
  const row = stmt.get(id);
  return row || null;
}

/**
 * Create a new user
 */
export function createUser(env, { email, name, passwordHash }) {
  const db = getDb(env);
  const stmt = db.prepare(
    "INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?) RETURNING id, email, name, created_at"
  );
  const row = stmt.get(email, name, passwordHash);
  return row || null;
}
