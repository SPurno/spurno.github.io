// ============================================
// ShopVerse — Auth Pages (Login & Register)
// ============================================

const AuthPage = {
  render(params) {
    const content = document.getElementById('pageContent');
    const type = params.query?.type || 'login';

    if (type === 'register') {
      this.renderRegister(content);
    } else {
      this.renderLogin(content);
    }
  },

  renderLogin(container) {
    container.innerHTML = `
      <div class="auth-page page-enter">
        <div class="auth-card glass">
          <div class="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>
          <form class="auth-form" onsubmit="AuthPage.login(event)">
            <div class="form-group">
              <label>Email</label>
              <div class="input-with-icon">
                <i class="fas fa-envelope"></i>
                <input type="email" id="loginEmail" placeholder="demo@example.com" required>
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <div class="input-with-icon">
                <i class="fas fa-lock"></i>
                <input type="password" id="loginPassword" placeholder="••••••••" required>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.85rem">
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
                <input type="checkbox" checked> Remember me
              </label>
              <a href="#/forgot-password" style="color:var(--accent-1)">Forgot password?</a>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg">
              <i class="fas fa-sign-in-alt"></i> Sign In
            </button>
          </form>
          <div class="auth-footer">
            Don't have an account? <a href="#/login?type=register">Create one</a>
          </div>
        </div>
      </div>
    `;
  },

  renderRegister(container) {
    container.innerHTML = `
      <div class="auth-page page-enter">
        <div class="auth-card glass">
          <div class="auth-header">
            <h1>Create Account</h1>
            <p>Join ShopVerse and start shopping</p>
          </div>
          <form class="auth-form" onsubmit="AuthPage.register(event)">
            <div class="form-group">
              <label>Full Name</label>
              <div class="input-with-icon">
                <i class="fas fa-user"></i>
                <input type="text" id="regName" placeholder="John Doe" required>
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <div class="input-with-icon">
                <i class="fas fa-envelope"></i>
                <input type="email" id="regEmail" placeholder="john@example.com" required>
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <div class="input-with-icon">
                <i class="fas fa-lock"></i>
                <input type="password" id="regPassword" placeholder="Min. 8 characters" minlength="8" required>
              </div>
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <div class="input-with-icon">
                <i class="fas fa-lock"></i>
                <input type="password" id="regConfirm" placeholder="Confirm password" required>
              </div>
            </div>
            <label style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:var(--text-muted);cursor:pointer">
              <input type="checkbox" required style="width:auto;margin-top:3px">
              I agree to the <a href="#" style="color:var(--accent-1)">Terms of Service</a> and <a href="#" style="color:var(--accent-1)">Privacy Policy</a>
            </label>
            <button type="submit" class="btn btn-primary btn-block btn-lg">
              <i class="fas fa-user-plus"></i> Create Account
            </button>
          </form>
          <div class="auth-footer">
            Already have an account? <a href="#/login">Sign in</a>
          </div>
        </div>
      </div>
    `;
  },

  async login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Demo user credentials
    if (email === 'demo@example.com' && password === 'password123') {
      localStorage.setItem('shop_user', JSON.stringify({
        id: 1,
        name: 'Demo User',
        email: 'demo@example.com',
        is_admin: false
      }));
      localStorage.setItem('shop_password', password);
      Components.toast('Welcome back, Demo User!', 'success');
      App.updateAuthUI();
      Router.navigate('#/');
    }
    // Admin credentials
    else if (email === 'admin@shopverse.com' && password === 'admin123') {
      localStorage.setItem('shop_user', JSON.stringify({
        id: 2,
        name: 'Admin',
        email: 'admin@shopverse.com',
        is_admin: true
      }));
      localStorage.setItem('shop_password', password);
      Components.toast('Welcome, Admin! Redirecting to dashboard...', 'success');
      App.updateAuthUI();
      Router.navigate('#/admin');
    } else {
      Components.toast('Invalid credentials.<br>Demo: demo@example.com / password123<br>Admin: admin@shopverse.com / admin123', 'error');
    }
  },

  async register(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;

    if (password !== confirm) {
      Components.toast('Passwords do not match', 'error');
      return;
    }

    // Store user in localStorage for demo
    localStorage.setItem('shop_user', JSON.stringify({
      id: Date.now(),
      name,
      email,
      is_admin: false
    }));
    localStorage.setItem('shop_password', password);
    Components.toast(`Welcome, ${name}!`, 'success');
    App.updateAuthUI();
    Router.navigate('#/');
  },

  logout() {
    localStorage.removeItem('shop_user');
    Components.toast('Logged out successfully', 'info');
    App.updateAuthUI();
    Router.navigate('#/');
  }
};
