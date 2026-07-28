import { createClient } from '@libsql/client/web';

let db = null;

export function getEcomDb(env) {
  if (!db) {
    db = createClient({
      url: env.ECOM_TURSO_DATABASE_URL,
      authToken: env.ECOM_TURSO_AUTH_TOKEN,
    });
  }
  return db;
}

export async function getAllProducts(env) {
  const db = getEcomDb(env);
  const result = await db.execute(`
    SELECT p.id, p.name, p.slug, p.price, p.compare_price, p.image_url,
           p.stock, p.rating, p.reviews_count, p.featured, p.preview_description,
           c.name AS category_name, c.slug AS category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.id
  `);
  return result.rows;
}
