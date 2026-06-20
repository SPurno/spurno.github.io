/**
 * SPurno Auth Client — Handles login/register API calls and token management
 */

const AUTH_API_URL = 'https://spurno-auth.ispurno.workers.dev/api';

// For local development, uncomment the line below and adjust:
// const AUTH_API_URL = 'http://localhost:8787/api';

const AuthClient = {
  // ── Helper: authenticated fetch ────────────────────
  async _fetch(path, options = {}) {
    const token = this.getToken();
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${AUTH_API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
  },

  // ── Favorites ───────────────────────────────────────
  async getFavorites() {
    return this._fetch('/favorites');
  },

  async isFavorite(itemId) {
    return this._fetch(`/favorites?item_id=${encodeURIComponent(itemId)}`);
  },

  async addFavorite({ item_id, item_type, title, thumbnail, url }) {
    return this._fetch('/favorites', {
      method: 'POST',
      body: JSON.stringify({ item_id, item_type, title, thumbnail, url }),
    });
  },

  async removeFavorite(itemId) {
    return this._fetch('/favorites', {
      method: 'DELETE',
      body: JSON.stringify({ item_id: itemId }),
    });
  },

  // ── Download History ─────────────────────────────────
  async getDownloads() {
    return this._fetch('/downloads');
  },

  async addDownload({ item_id, item_type, title, platform }) {
    return this._fetch('/downloads', {
      method: 'POST',
      body: JSON.stringify({ item_id, item_type, title, platform }),
    });
  },

  // ── Account Settings ────────────────────────────────
  async updateAccount({ name, current_password, new_password }) {
    return this._fetch('/account', {
      method: 'PUT',
      body: JSON.stringify({ name, current_password, new_password }),
    });
  },

  // ── Password Reset ───────────────────────────────────
  async forgotPassword(email) {
    const response = await fetch(`${AUTH_API_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
  },

  async resetPassword(token, password) {
    const response = await fetch(`${AUTH_API_URL}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
  },

  // ── Original methods below ──────────────────────────
  /**
   * Register a new user
   */
  async register(email, password, name) {
    const response = await fetch(`${AUTH_API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    // Store the token
    this.setToken(data.token);
    this.setUser(data.user);

    return data;
  },

  /**
   * Login an existing user
   */
  async login(email, password) {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Store the token
    this.setToken(data.token);
    this.setUser(data.user);

    return data;
  },

  /**
   * Get the currently authenticated user's info
   */
  async getMe() {
    const token = this.getToken();
    if (!token) return null;

    try {
      const response = await fetch(`${AUTH_API_URL}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Token might be expired
        if (response.status === 401) {
          this.clearAuth();
        }
        return null;
      }

      const data = await response.json();
      this.setUser(data.user);
      return data.user;
    } catch {
      return null;
    }
  },

  /**
   * Logout — clears stored auth data
   */
  logout() {
    this.clearAuth();
    window.location.href = '/login.html';
  },

  /**
   * Store JWT token in localStorage
   */
  setToken(token) {
    localStorage.setItem('spurno_auth_token', token);
  },

  /**
   * Get JWT token from localStorage
   */
  getToken() {
    return localStorage.getItem('spurno_auth_token');
  },

  /**
   * Store user data in localStorage
   */
  setUser(user) {
    localStorage.setItem('spurno_auth_user', JSON.stringify(user));
  },

  /**
   * Get user data from localStorage
   */
  getUser() {
    try {
      const data = localStorage.getItem('spurno_auth_user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.getToken();
  },

  /**
   * Clear all auth data
   */
  clearAuth() {
    localStorage.removeItem('spurno_auth_token');
    localStorage.removeItem('spurno_auth_user');
  },
};
