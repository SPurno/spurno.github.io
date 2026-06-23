/**
 * Dashboard handlers — Favorites, Download History, Account Settings
 */
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
import {
  getFavorites, addFavorite, removeFavorite, isFavorite,
  getDownloads, addDownload,
  updateUser, updatePassword, findUserById, findUserPasswordHash,
  createOrder, getOrders, getOrderById,
} from './db.js';

const SALT_ROUNDS = 10;

const JWT_ALGORITHM = 'HS256';

let jwtSecretKey = null;

function getJwtSecret(env) {
  if (!jwtSecretKey) {
    jwtSecretKey = new TextEncoder().encode(env.JWT_SECRET);
  }
  return jwtSecretKey;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': 'https://spurno.github.io',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  };
}

/**
 * Extract and verify JWT from request, returns payload or Response
 */
async function authenticate(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: new Response(JSON.stringify({ error: 'Authentication required' }), {
      status: 401, headers: corsHeaders(),
    })};
  }

  const token = authHeader.split(' ')[1];

  try {
    const result = await jwtVerify(token, getJwtSecret(env), {
      algorithms: [JWT_ALGORITHM],
    });
    return { payload: result.payload };
  } catch {
    return { error: new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
      status: 401, headers: corsHeaders(),
    })};
  }
}

// ── Favorites ──────────────────────────────────────────

/**
 * GET /api/favorites?item_id=xxx — Check if item is favorited (returns boolean)
 * GET /api/favorites — List all user favorites
 */
export async function handleGetFavorites(request, env) {
  const auth = await authenticate(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();
  const url = new URL(request.url);
  const itemId = url.searchParams.get('item_id');

  try {
    if (itemId) {
      const favorited = await isFavorite(env, auth.payload.sub, itemId);
      return new Response(JSON.stringify({ favorited }), { status: 200, headers });
    }

    const favorites = await getFavorites(env, auth.payload.sub);
    return new Response(JSON.stringify({ favorites }), { status: 200, headers });
  } catch (error) {
    console.error('Get favorites error:', error);
    return new Response(JSON.stringify({ error: 'Failed to get favorites' }), { status: 500, headers });
  }
}

/**
 * POST /api/favorites — Add a favorite
 * Body: { item_id, item_type, title, thumbnail, url }
 */
export async function handleAddFavorite(request, env) {
  const auth = await authenticate(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const { item_id, item_type, title, thumbnail, url } = await request.json();

    if (!item_id) {
      return new Response(JSON.stringify({ error: 'item_id is required' }), { status: 400, headers });
    }

    const favorite = await addFavorite(env, auth.payload.sub, {
      itemId: item_id,
      itemType: item_type,
      title,
      thumbnail,
      url,
    });

    return new Response(JSON.stringify({
      message: favorite ? 'Saved to favorites' : 'Already in favorites',
      favorite,
    }), { status: 200, headers });
  } catch (error) {
    console.error('Add favorite error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save favorite' }), { status: 500, headers });
  }
}

/**
 * DELETE /api/favorites — Remove a favorite
 * Body: { item_id }
 */
export async function handleRemoveFavorite(request, env) {
  const auth = await authenticate(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const { item_id } = await request.json();

    if (!item_id) {
      return new Response(JSON.stringify({ error: 'item_id is required' }), { status: 400, headers });
    }

    await removeFavorite(env, auth.payload.sub, item_id);

    return new Response(JSON.stringify({ message: 'Removed from favorites' }), { status: 200, headers });
  } catch (error) {
    console.error('Remove favorite error:', error);
    return new Response(JSON.stringify({ error: 'Failed to remove favorite' }), { status: 500, headers });
  }
}

// ── Download History ───────────────────────────────────

/**
 * GET /api/downloads — List download history
 */
export async function handleGetDownloads(request, env) {
  const auth = await authenticate(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const downloads = await getDownloads(env, auth.payload.sub);
    return new Response(JSON.stringify({ downloads }), { status: 200, headers });
  } catch (error) {
    console.error('Get downloads error:', error);
    return new Response(JSON.stringify({ error: 'Failed to get downloads' }), { status: 500, headers });
  }
}

/**
 * POST /api/downloads — Record a download
 * Body: { item_id, item_type, title, platform }
 */
export async function handleAddDownload(request, env) {
  const auth = await authenticate(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const { item_id, item_type, title, platform } = await request.json();

    if (!item_id) {
      return new Response(JSON.stringify({ error: 'item_id is required' }), { status: 400, headers });
    }

    const download = await addDownload(env, auth.payload.sub, {
      itemId: item_id,
      itemType: item_type,
      title,
      platform,
    });

    return new Response(JSON.stringify({ message: 'Download recorded', download }), { status: 200, headers });
  } catch (error) {
    console.error('Add download error:', error);
    return new Response(JSON.stringify({ error: 'Failed to record download' }), { status: 500, headers });
  }
}

// ── Account Settings ───────────────────────────────────

/**
 * PUT /api/account — Update account settings
 * Body: { name?, current_password?, new_password? }
 */
export async function handleUpdateAccount(request, env) {
  const auth = await authenticate(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const { name, current_password, new_password } = await request.json();
    const userId = auth.payload.sub;

    // Update name
    if (name !== undefined) {
      const user = await updateUser(env, userId, { name });
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers });
      }
    }

    // Change password
    if (current_password && new_password) {
      if (new_password.length < 6) {
        return new Response(JSON.stringify({ error: 'New password must be at least 6 characters' }), { status: 400, headers });
      }

      const user = await findUserById(env, userId);
      if (!user) {
        return new Response(JSON.stringify({ error: 'User not found' }), { status: 404, headers });
      }

      // Verify current password
      const currentHash = await findUserPasswordHash(env, userId);

      if (!currentHash || !bcrypt.compareSync(current_password, currentHash)) {
        return new Response(JSON.stringify({ error: 'Current password is incorrect' }), { status: 403, headers });
      }

      const newHash = bcrypt.hashSync(new_password, SALT_ROUNDS);
      await updatePassword(env, userId, newHash);
    }

    // Fetch updated user
    const updated = await findUserById(env, userId);

    return new Response(JSON.stringify({
      message: 'Account updated successfully',
      user: updated ? { id: updated.id, email: updated.email, name: updated.name, created_at: updated.created_at } : null,
    }), { status: 200, headers });
  } catch (error) {
    console.error('Update account error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update account' }), { status: 500, headers });
  }
}

// ── Custom Orders ─────────────────────────────────────

/**
 * POST /api/orders — Create a custom order / quote request
 * Body: { animation_type, duration_seconds, description, reference_links, budget_range, deadline, style_vibe, payment_method, additional_notes }
 */
export async function handleCreateOrder(request, env) {
  const auth = await authenticate(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const body = await request.json();

    if (!body.animation_type || !body.description) {
      return new Response(JSON.stringify({ error: 'Animation type and description are required' }), { status: 400, headers });
    }

    const order = await createOrder(env, auth.payload.sub, {
      animationType: body.animation_type,
      durationSeconds: body.duration_seconds ? parseInt(body.duration_seconds, 10) : null,
      description: body.description,
      referenceLinks: body.reference_links,
      budgetRange: body.budget_range,
      deadline: body.deadline,
      styleVibe: body.style_vibe,
      paymentMethod: body.payment_method,
      additionalNotes: body.additional_notes,
    });

    return new Response(JSON.stringify({
      message: 'Quote request submitted successfully! We will review and get back to you shortly.',
      order,
    }), { status: 201, headers });
  } catch (error) {
    console.error('Create order error:', error);
    return new Response(JSON.stringify({ error: 'Failed to submit quote request. Please try again.' }), { status: 500, headers });
  }
}

/**
 * GET /api/orders — List all orders for the authenticated user
 */
export async function handleGetOrders(request, env) {
  const auth = await authenticate(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const url = new URL(request.url);
    const orderId = url.searchParams.get('id');

    if (orderId) {
      const order = await getOrderById(env, orderId);
      if (!order) {
        return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404, headers });
      }
      // Security: only return if it belongs to the user
      if (order.user_id !== auth.payload.sub) {
        return new Response(JSON.stringify({ error: 'Not authorized' }), { status: 403, headers });
      }
      return new Response(JSON.stringify({ order }), { status: 200, headers });
    }

    const orders = await getOrders(env, auth.payload.sub);
    return new Response(JSON.stringify({ orders }), { status: 200, headers });
  } catch (error) {
    console.error('Get orders error:', error);
    return new Response(JSON.stringify({ error: 'Failed to load orders' }), { status: 500, headers });
  }
}
