import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { createHash } from "crypto";

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

  // Migration: Hash any existing plaintext passwords
  console.log("🔄 Hashing existing plaintext passwords...");
  try {
    const existingUsers = await client.execute("SELECT id, password FROM users;");
    for (const user of existingUsers.rows) {
      const pw = user.password;
      // If the password is NOT a 64-char hex string (not already SHA-256 hashed)
      if (pw && !/^[0-9a-f]{64}$/i.test(pw)) {
        const hash = createHash("sha256").update(pw).digest("hex");
        await client.execute("UPDATE users SET password = ? WHERE id = ?", [hash, user.id]);
        console.log(`  ✅ Hashed password for user #${user.id}`);
      }
    }
  } catch (err) {
    console.error("  ⚠️ Password migration error:", err.message);
  }

  // Migration: Fix broken product thumbnail URLs
  console.log("🔄 Fixing broken product thumbnail URLs...");
  const imageFixes = [
    { id: 2, old: "photo-1546868871-af0de0ae72b7", newUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", images: '["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80","https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80"]' },
    { id: 4, old: "photo-1507473885765-e6ed057ab6bc", newUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", images: '["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80","https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80"]' },
    { id: 7, old: "photo-1570194065650-d99fb4b8ccb0", newUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80", images: '["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80","https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80"]' },
    { id: 12, old: "photo-1590658268037-6bf12f032f55", newUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80", images: '["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80","https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80"]' },
    { id: 13, old: "photo-1536240478700-b869070f9279", newUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80", images: '["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80","https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"]' }
  ];
  for (const fix of imageFixes) {
    try {
      // Update image_url (direct column)
      await client.execute("UPDATE products SET image_url = ? WHERE id = ? AND image_url LIKE ?", [fix.newUrl, fix.id, `%${fix.old}%`]);
      // Update within the images JSON array via REPLACE (preserves other entries)
      await client.execute(
        `UPDATE products SET images = REPLACE(images, ? || '"', ? || '"') WHERE id = ? AND images LIKE ?`,
        [fix.old, fix.newUrl, fix.id, `%${fix.old}%`]
      );
      // Recovery: if images column was corrupted (not a valid JSON array), restore it fully
      await client.execute(
        `UPDATE products SET images = ? WHERE id = ? AND (images NOT LIKE '[%' OR images IS NULL)`,
        [fix.images, fix.id]
      );
      console.log(`  ✅ Fixed image for product #${fix.id}`);
    } catch (err) {
      if (!err.message.includes("no such column")) {
        console.error(`  ⚠️ Could not fix image for product #${fix.id}: ${err.message}`);
      }
    }
  }
  // Fix category 7 image
  try {
    await client.execute("UPDATE categories SET image_url = ? WHERE id = 7 AND image_url LIKE ?", ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80", "%photo-1536240478700-b869070f9279%"]);
    console.log("  ✅ Fixed image for category #7 (Videos)");
  } catch (err) {
    console.error("  ⚠️ Could not fix category image:", err.message);
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
