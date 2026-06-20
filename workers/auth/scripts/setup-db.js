/**
 * Database setup script — creates the users table in Turso.
 * Run: node scripts/setup-db.js
 */
const { connect } = require('@tursodatabase/serverless');

const TURSO_DATABASE_URL = 'libsql://userreg-spurno.aws-us-east-1.turso.io';
// Set TURSO_AUTH_TOKEN as environment variable for security
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

if (!TURSO_AUTH_TOKEN) {
  console.error('Error: TURSO_AUTH_TOKEN environment variable is required.');
  console.error('Run: set TURSO_AUTH_TOKEN=your_token && node scripts/setup-db.js');
  process.exit(1);
}

async function setup() {
  console.log('Connecting to Turso database...');

  const db = connect({
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
}

setup().catch((error) => {
  console.error('Setup failed:', error);
  process.exit(1);
});
