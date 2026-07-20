var AuthClient = (function() {
  var API_BASE = 'https://spurno-auth.ispurno.workers.dev/api';
  var TOKEN_KEY = 'spurno_token';

  function getToken() {
    try { return localStorage.getItem(TOKEN_KEY); } catch(e) { return null; }
  }

  function setToken(token) {
    try { localStorage.setItem(TOKEN_KEY, token); } catch(e) {}
  }

  function clearToken() {
    try { localStorage.removeItem(TOKEN_KEY); } catch(e) {}
  }

  async function apiFetch(path, options) {
    options = options || {};
    var token = getToken();
    var headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    if (options.headers) Object.assign(headers, options.headers);

    var res = await fetch(API_BASE + path, {
      method: options.method || 'GET',
      headers: headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    var data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  return {
    isAuthenticated: function() {
      return !!getToken();
    },

    login: async function(email, password) {
      var data = await apiFetch('/login', {
        method: 'POST',
        body: { email: email, password: password },
      });
      setToken(data.token);
      return data;
    },

    register: async function(email, password, name) {
      var data = await apiFetch('/register', {
        method: 'POST',
        body: { email: email, password: password, name: name },
      });
      setToken(data.token);
      return data;
    },

    getMe: async function() {
      return await apiFetch('/me');
    },

    updateAccount: async function(data) {
      return await apiFetch('/account', {
        method: 'PUT',
        body: data,
      });
    },

    logout: function() {
      clearToken();
    },

    forgotPassword: async function(email) {
      return await apiFetch('/forgot-password', {
        method: 'POST',
        body: { email: email },
      });
    },

    resetPassword: async function(token, password) {
      return await apiFetch('/reset-password', {
        method: 'POST',
        body: { token: token, password: password },
      });
    },
  };
})();
