/**
 * Database setup script — creates the users table in Turso.
 * Usage: node scripts/setup-db.mjs <auth-token>
 * Or:    node scripts/setup-db.mjs (will check TURSO_AUTH_TOKEN env var)
 */
import { createClient } from '@libsql/client';

const TURSO_DATABASE_URL = 'libsql://userreg-spurno.aws-us-east-1.turso.io';
const TURSO_AUTH_TOKEN = process.argv[2] || process.env.TURSO_AUTH_TOKEN;

if (!TURSO_AUTH_TOKEN) {
  console.error('Error: Auth token is required.');
  console.error('Usage: node scripts/setup-db.mjs <auth-token>');
  process.exit(1);
}

async function setup() {
  console.log('Connecting to Turso database...');

  const db = createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  });

  console.log('Creating users table...');

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT DEFAULT '',
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);

  console.log('Creating email index...');

  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `);

  console.log('✓ Database setup complete!');
  console.log('✓ Users table created successfully.');
  
  db.close();
}

setup().catch((error) => {
  console.error('Setup failed:', error);
  process.exit(1);
});
