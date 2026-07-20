/**
 * SPurno Auth Worker — User Registration, Login & Dashboard API
 * 
 * Endpoints:
 *   POST /api/register     — Create a new user account
 *   POST /api/login        — Authenticate and get JWT token
 *   GET  /api/me           — Get current user info
 *   GET  /api/favorites    — List user favorites (or ?item_id=xxx to check)
 *   POST /api/favorites    — Add a favorite
 *   DELETE /api/favorites  — Remove a favorite
 *   GET  /api/downloads    — List download history
 *   POST /api/downloads    — Record a download
 *   PUT  /api/account      — Update name / change password
 */
import { handleRegister, handleLogin, handleGetMe, handleOptions, handleForgotPassword, handleResetPassword } from './auth.js';
import {
  handleGetFavorites, handleAddFavorite, handleRemoveFavorite,
  handleGetDownloads, handleAddDownload,
  handleUpdateAccount,
  handleCreateOrder, handleGetOrders, handleDeleteOrder,
  handleSendMessage, handleGetMessages,
} from './dashboard.js';
import {
  handleAdminGetOrders, handleAdminUpdateOrder, handleAdminDeleteOrder,
  handleAdminGetMessages, handleAdminDeleteMessage,
  handleAdminReplyMessage, handleAdminGetUsers, handleAdminComposeMessage,
  handleAdminUpdateUser,
} from './admin.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Validate required secrets are configured
    if (!env.JWT_SECRET) {
      return new Response(
        JSON.stringify({ error: 'Server misconfigured: JWT_SECRET not set. Run: wrangler secret put JWT_SECRET' }),
        { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }
    if (!env.TURSO_AUTH_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'Server misconfigured: TURSO_AUTH_TOKEN not set. Run: wrangler secret put TURSO_AUTH_TOKEN' }),
        { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }
    if (!env.ADMIN_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Server misconfigured: ADMIN_API_KEY not set. Run: wrangler secret put ADMIN_API_KEY' }),
        { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return handleOptions(request, env);
    }

    // ── Auth Routes ────────────────────────────────────
    if (path === '/api/register' && method === 'POST') return handleRegister(request, env);
    if (path === '/api/login' && method === 'POST') return handleLogin(request, env);
    if (path === '/api/me' && method === 'GET') return handleGetMe(request, env);
    if (path === '/api/forgot-password' && method === 'POST') return handleForgotPassword(request, env);
    if (path === '/api/reset-password' && method === 'POST') return handleResetPassword(request, env);

    // ── Favorites Routes ───────────────────────────────
    if (path === '/api/favorites' && method === 'GET') return handleGetFavorites(request, env);
    if (path === '/api/favorites' && method === 'POST') return handleAddFavorite(request, env);
    if (path === '/api/favorites' && method === 'DELETE') return handleRemoveFavorite(request, env);

    // ── Download History Routes ─────────────────────────
    if (path === '/api/downloads' && method === 'GET') return handleGetDownloads(request, env);
    if (path === '/api/downloads' && method === 'POST') return handleAddDownload(request, env);

    // ── Account Settings ───────────────────────────────
    if (path === '/api/account' && method === 'PUT') return handleUpdateAccount(request, env);

    // ── Custom Orders Routes ───────────────────────────
    if (path === '/api/orders' && method === 'POST') return handleCreateOrder(request, env);
    if (path === '/api/orders' && method === 'GET') return handleGetOrders(request, env);
    if (path === '/api/orders' && method === 'DELETE') return handleDeleteOrder(request, env);

    // ── Contact Messages Routes ────────────────────────
    if (path === '/api/messages' && method === 'POST') return handleSendMessage(request, env);
    if (path === '/api/messages' && method === 'GET') return handleGetMessages(request, env);

    // ── Admin Routes ───────────────────────────────────
    if (path === '/api/admin/orders' && method === 'GET') return handleAdminGetOrders(request, env);
    if (path === '/api/admin/orders' && method === 'PUT') return handleAdminUpdateOrder(request, env);
    if (path === '/api/admin/orders' && method === 'DELETE') return handleAdminDeleteOrder(request, env);

    // ── Admin Messages Routes ──────────────────────────
    if (path === '/api/admin/messages' && method === 'GET') return handleAdminGetMessages(request, env);
    if (path === '/api/admin/messages' && method === 'DELETE') return handleAdminDeleteMessage(request, env);
    if (path === '/api/admin/messages/reply' && method === 'POST') return handleAdminReplyMessage(request, env);
    if (path === '/api/admin/messages/compose' && method === 'POST') return handleAdminComposeMessage(request, env);

    // ── Admin Users Routes ──────────────────────────────
    if (path === '/api/admin/users' && method === 'GET') return handleAdminGetUsers(request, env);
    if (path === '/api/admin/users' && method === 'PUT') return handleAdminUpdateUser(request, env);

    // 404 for unknown routes
    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );
  },
};
