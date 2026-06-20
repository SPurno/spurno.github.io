/**
 * Authentication handlers for Cloudflare Worker
 */
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { findUserByEmail, findUserById, createUser, ensureSchema, createResetToken, findValidResetToken, markResetTokenUsed, updatePassword } from './db.js';

const SALT_ROUNDS = 10;
const JWT_ALGORITHM = 'HS256';
const JWT_EXPIRATION = '7d';

// Cache the encoded JWT secret to avoid re-encoding on every request
let jwtSecretKey = null;

function getJwtSecret(env) {
  if (!jwtSecretKey) {
    jwtSecretKey = new TextEncoder().encode(env.JWT_SECRET);
  }
  return jwtSecretKey;
}

/**
 * Generate CORS headers for cross-origin requests from the GitHub Pages site
 */
function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': 'https://spurno.github.io',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
}

/**
 * Handle OPTIONS preflight requests
 */
export function handleOptions(request, env) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(env),
  });
}

/**
 * POST /api/register
 * Creates a new user account
 */
export async function handleRegister(request, env) {
  const headers = corsHeaders(env);

  try {
    const { email, password, name } = await request.json();

    // Validation
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 6 characters' }),
        { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // Ensure schema exists
    await ensureSchema(env);

    // Check if user already exists
    const existingUser = await findUserByEmail(env, email.toLowerCase());
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'An account with this email already exists' }),
        { status: 409, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // Hash password (sync)
    const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

    // Create user
    const user = await createUser(env, {
      email: email.toLowerCase(),
      name: name || email.split('@')[0],
      passwordHash,
    });

    // Generate JWT (async — uses Web Crypto API)
    const token = await new SignJWT({ sub: String(user.id), email: user.email })
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRATION)
      .sign(getJwtSecret(env));

    return new Response(
      JSON.stringify({
        message: 'Account created successfully',
        user: { id: user.id, email: user.email, name: user.name },
        token,
      }),
      { status: 201, headers: { ...headers, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Register error:', error);
    return new Response(
      JSON.stringify({ error: 'Registration failed. Please try again.' }),
      { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * POST /api/login
 * Authenticates a user and returns a JWT
 */
export async function handleLogin(request, env) {
  const headers = corsHeaders(env);

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // Ensure schema exists
    await ensureSchema(env);

    // Find user
    const user = await findUserByEmail(env, email.toLowerCase());
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // Verify password (sync)
    const passwordValid = bcrypt.compareSync(password, user.password_hash);
    if (!passwordValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid email or password' }),
        { status: 401, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // Generate JWT (async — uses Web Crypto API)
    const token = await new SignJWT({ sub: String(user.id), email: user.email })
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRATION)
      .sign(getJwtSecret(env));

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        user: { id: user.id, email: user.email, name: user.name },
        token,
      }),
      { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Login failed. Please try again.' }),
      { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * POST /api/forgot-password
 * Generates a password reset token. In production this would be emailed.
 */
export async function handleForgotPassword(request, env) {
  const headers = corsHeaders(env);

  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // Ensure schema exists (creates password_resets table if needed)
    await ensureSchema(env);

    // Always return success to prevent email enumeration
    const user = await findUserByEmail(env, email.toLowerCase());

    if (user) {
      // Generate a random token (48 bytes of hex = 96 chars)
      const array = new Uint8Array(48);
      crypto.getRandomValues(array);
      const token = Array.from(array, b => b.toString(16).padStart(2, '0')).join('');

      // Token expires in 1 hour
      const expiresAt = new Date(Date.now() + 3600000).toISOString().replace('T', ' ').replace('Z', '');

      await createResetToken(env, user.id, token, expiresAt);

      // Build reset link (in production this would be emailed)
      const resetLink = `https://spurno.github.io/reset-password.html?token=${token}`;

      return new Response(
        JSON.stringify({
          message: 'If an account exists with this email, a reset link has been generated.',
          // In production, remove this and send via email:
          _debug_reset_link: resetLink,
        }),
        { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // Same response even if user doesn't exist (no email enumeration)
    return new Response(
      JSON.stringify({
        message: 'If an account exists with this email, a reset link has been generated.',
      }),
      { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * POST /api/reset-password
 * Resets a user's password using a valid reset token
 */
export async function handleResetPassword(request, env) {
  const headers = corsHeaders(env);

  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return new Response(
        JSON.stringify({ error: 'Token and password are required' }),
        { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 6 characters' }),
        { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // Ensure schema exists
    await ensureSchema(env);

    // Find valid (unused, not expired) token
    const resetRecord = await findValidResetToken(env, token);
    if (!resetRecord) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired reset token. Please request a new one.' }),
        { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // Hash new password
    const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

    // Update password & mark token used
    await updatePassword(env, resetRecord.user_id, passwordHash);
    await markResetTokenUsed(env, resetRecord.id);

    return new Response(
      JSON.stringify({ message: 'Password reset successful. You can now sign in with your new password.' }),
      { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to reset password. Please try again.' }),
      { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * GET /api/me
 * Returns the currently authenticated user's info
 */
export async function handleGetMe(request, env) {
  const headers = corsHeaders(env);

  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT (async)
    let payload;
    try {
      const result = await jwtVerify(token, getJwtSecret(env), {
        algorithms: [JWT_ALGORITHM],
      });
      payload = result.payload;
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // Get user from database
    const user = await findUserById(env, payload.sub);
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        user: { id: user.id, email: user.email, name: user.name, created_at: user.created_at },
      }),
      { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Get me error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get user info' }),
      { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } }
    );
  }
}
