/**
 * Admin handlers — All orders management with API key authentication
 */
import { getAllOrders, getOrderById, updateOrder, getOrderStats, adminDeleteOrder, getAllMessages, deleteMessage, getMessageStats } from './db.js';

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
 * Authenticate admin via API key in Authorization header
 * Expects: Authorization: Bearer <ADMIN_API_KEY>
 */
function authenticateAdmin(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: new Response(JSON.stringify({ error: 'Admin authentication required' }), {
      status: 401, headers: corsHeaders(),
    })};
  }

  const token = authHeader.split(' ')[1];

  if (token !== env.ADMIN_API_KEY) {
    return { error: new Response(JSON.stringify({ error: 'Invalid admin key' }), {
      status: 403, headers: corsHeaders(),
    })};
  }

  return { authenticated: true };
}

/**
 * GET /api/admin/orders — List all orders with user info
 * Optional query params: ?status=pending
 */
export async function handleAdminGetOrders(request, env) {
  const auth = authenticateAdmin(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const url = new URL(request.url);
    const statusFilter = url.searchParams.get('status');
    const orderId = url.searchParams.get('id');

    if (orderId) {
      const order = await getOrderById(env, orderId);
      if (!order) {
        return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404, headers });
      }
      return new Response(JSON.stringify({ order }), { status: 200, headers });
    }

    let orders = await getAllOrders(env);

    // Optional status filter
    if (statusFilter) {
      orders = orders.filter(o => o.status === statusFilter);
    }

    const stats = await getOrderStats(env);

    return new Response(JSON.stringify({ orders, stats }), { status: 200, headers });
  } catch (error) {
    console.error('Admin get orders error:', error);
    return new Response(JSON.stringify({ error: 'Failed to load orders' }), { status: 500, headers });
  }
}

/**
 * PUT /api/admin/orders — Update an order's status, quoted price, admin response
 * Body: { id, status?, quoted_price?, admin_response?, admin_notes? }
 */
export async function handleAdminUpdateOrder(request, env) {
  const auth = authenticateAdmin(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const body = await request.json();

    if (!body.id) {
      return new Response(JSON.stringify({ error: 'Order ID is required' }), { status: 400, headers });
    }

    const validStatuses = ['pending', 'quoted', 'accepted', 'in_progress', 'completed', 'cancelled'];
    if (body.status && !validStatuses.includes(body.status)) {
      return new Response(JSON.stringify({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }), { status: 400, headers });
    }

    const updated = await updateOrder(env, body.id, {
      status: body.status,
      quotedPrice: body.quoted_price,
      adminResponse: body.admin_response,
      adminNotes: body.admin_notes,
    });

    if (!updated) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404, headers });
    }

    return new Response(JSON.stringify({
      message: 'Order updated successfully',
      order: updated,
    }), { status: 200, headers });
  } catch (error) {
    console.error('Admin update order error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update order' }), { status: 500, headers });
  }
}

// ── Admin Delete Order ────────────────────────────────

/**
 * DELETE /api/admin/orders — Admin delete any order
 * Body: { id }
 */
export async function handleAdminDeleteOrder(request, env) {
  const auth = authenticateAdmin(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Order ID is required' }), { status: 400, headers });
    }

    const deleted = await adminDeleteOrder(env, id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404, headers });
    }

    return new Response(JSON.stringify({
      message: `Order ${deleted.order_number} deleted successfully`,
    }), { status: 200, headers });
  } catch (error) {
    console.error('Admin delete order error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete order' }), { status: 500, headers });
  }
}

// ── Admin Messages ────────────────────────────────────

/**
 * GET /api/admin/messages — List all messages from users
 */
export async function handleAdminGetMessages(request, env) {
  const auth = authenticateAdmin(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const messages = await getAllMessages(env);
    const stats = await getMessageStats(env);
    return new Response(JSON.stringify({ messages, stats }), { status: 200, headers });
  } catch (error) {
    console.error('Admin get messages error:', error);
    return new Response(JSON.stringify({ error: 'Failed to load messages' }), { status: 500, headers });
  }
}

/**
 * DELETE /api/admin/messages — Delete any message
 * Body: { id }
 */
export async function handleAdminDeleteMessage(request, env) {
  const auth = authenticateAdmin(request, env);
  if (auth.error) return auth.error;

  const headers = corsHeaders();

  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Message ID is required' }), { status: 400, headers });
    }

    await deleteMessage(env, id);

    return new Response(JSON.stringify({ message: 'Message deleted successfully' }), { status: 200, headers });
  } catch (error) {
    console.error('Admin delete message error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete message' }), { status: 500, headers });
  }
}
