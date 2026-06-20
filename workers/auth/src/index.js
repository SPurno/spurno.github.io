/**
 * SPurno Auth Worker — User Registration & Login API
 * 
 * Endpoints:
 *   POST /api/register  — Create a new user account
 *   POST /api/login     — Authenticate and get JWT token
 *   GET  /api/me        — Get current user info (requires Bearer token)
 */
import { handleRegister, handleLogin, handleGetMe, handleOptions } from './auth.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Validate required secrets are configured
    if (!env.JWT_SECRET) {
      return new Response(
        JSON.stringify({ error: 'Server misconfigured: JWT_SECRET not set. Run: wrangler secret put JWT_SECRET' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    if (!env.TURSO_AUTH_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'Server misconfigured: TURSO_AUTH_TOKEN not set. Run: wrangler secret put TURSO_AUTH_TOKEN' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions(request, env);
    }

    // Route: POST /api/register
    if (path === '/api/register' && request.method === 'POST') {
      return handleRegister(request, env);
    }

    // Route: POST /api/login
    if (path === '/api/login' && request.method === 'POST') {
      return handleLogin(request, env);
    }

    // Route: GET /api/me
    if (path === '/api/me' && request.method === 'GET') {
      return handleGetMe(request, env);
    }

    // 404 for unknown routes
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  },
};
