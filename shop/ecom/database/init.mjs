import { createClient } from "@libsql/client";
import { readFileSync } from "fs";

const client = createClient({
  url: "libsql://ecommercelog-spurno.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODI4Mzg4MjUsImlkIjoiMDE5ZjE5NzItZmQwMS03ZDBkLWFkNWMtNWQ5YTkzZWI0NzBlIiwia2lkIjoiY3dfWmw5T3NsV2FnNFFkUjVHZUN0Nll2b19MTkdlUmY1STY1bEZVMXRCOCIsInJpZCI6ImVjYzBjNjcxLWUyMmMtNDA0Yy1hZjNmLWYzZDNlNjE4OTk5ZiJ9.4otvGu6MrGbhOb7JppDQwSXHXXsWDKf5miDw43Oba8M33U5wRNtK8DC8Zv2D-M-21nE6fo2cdazBjAgB4mgDAQ"
});

async function main() {
  console.log("🚀 Initializing ShopVerse database...");

  // Read schema
  const schema = readFileSync("schema.sql", "utf-8");
  const seed = readFileSync("seed.sql", "utf-8");

  // Execute schema
  console.log("📦 Creating tables...");
  const statements = schema.split(";").filter(s => s.trim().length > 0);
  for (const stmt of statements) {
    try {
      await client.execute(stmt.trim() + ";");
    } catch (err) {
      if (!err.message.includes("already exists")) {
        console.error(`Error executing: ${stmt.substring(0, 50)}...`);
        console.error(err.message);
      }
    }
  }

  // Migration: Add transaction columns to existing orders table
  const orderMigrations = [
    "ALTER TABLE orders ADD COLUMN transaction_id TEXT",
    "ALTER TABLE orders ADD COLUMN payment_provider TEXT",
    "ALTER TABLE orders ADD COLUMN download_link TEXT",
    "ALTER TABLE orders ADD COLUMN transaction_approved INTEGER DEFAULT 0"
  ];
  for (const migration of orderMigrations) {
    try {
      await client.execute(migration);
      console.log(`  ✅ Order migration: ${migration.substring(0, 50)}...`);
    } catch (err) {
      if (!err.message.includes('duplicate column') && !err.message.includes('already exists')) {
        console.error(`  ⚠️ Order migration: ${migration.substring(0, 50)}... (might already exist)`);
      }
    }
  }

  // Migration: Add media_type and video columns to existing products table
  console.log("🔄 Running migrations...");
  const migrations = [
    "ALTER TABLE products ADD COLUMN media_type TEXT DEFAULT 'physical' CHECK(media_type IN ('physical','digital','video'))",
    "ALTER TABLE products ADD COLUMN video_url TEXT",
    "ALTER TABLE products ADD COLUMN preview_url TEXT",
    "ALTER TABLE products ADD COLUMN preview_description TEXT",
    "ALTER TABLE products ADD COLUMN file_size REAL",
    "ALTER TABLE products ADD COLUMN duration INTEGER"
  ];
  for (const migration of migrations) {
    try {
      await client.execute(migration);
      console.log(`  ✅ Migration: ${migration.substring(0, 50)}...`);
    } catch (err) {
      if (!err.message.includes('duplicate column') && !err.message.includes('already exists')) {
        console.error(`  ⚠️ Migration: ${migration.substring(0, 50)}... (might already exist)`);
      }
    }
  }

  // Execute seed
  console.log("🌱 Seeding data...");
  const seedStatements = seed.split(";").filter(s => s.trim().length > 0);
  for (const stmt of seedStatements) {
    try {
      await client.execute(stmt.trim() + ";");
    } catch (err) {
      if (!err.message.includes("UNIQUE constraint") && !err.message.includes("already exists")) {
        console.error(`Error executing: ${stmt.substring(0, 50)}...`);
        console.error(err.message);
      }
    }
  }

  // Verify
  console.log("✅ Verifying...");
  const productCount = await client.execute("SELECT COUNT(*) as count FROM products;");
  const categoryCount = await client.execute("SELECT COUNT(*) as count FROM categories;");
  
  console.log(`📊 Categories: ${categoryCount.rows[0].count}`);
  console.log(`📊 Products: ${productCount.rows[0].count}`);
  console.log("✅ Database initialization complete!");
  
  // Show some sample products
  const sample = await client.execute("SELECT id, name, price FROM products LIMIT 5;");
  console.log("\n📋 Sample products:");
  for (const row of sample.rows) {
    console.log(`   #${row.id} ${row.name} - $${row.price}`);
  }
}

main().catch(console.error);
