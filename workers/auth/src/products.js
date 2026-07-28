import { getAllProducts } from './ecom-db.js';

export async function handleGetProducts(request, env) {
  try {
    if (!env.ECOM_TURSO_DATABASE_URL || !env.ECOM_TURSO_AUTH_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'Ecommerce database not configured. Set ECOM_TURSO_DATABASE_URL and ECOM_TURSO_AUTH_TOKEN secrets.' }),
        { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const products = await getAllProducts(env);
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
