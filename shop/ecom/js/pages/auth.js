// ============================================
// ShopVerse — Auth Pages (Login & Register)
// ============================================

const AuthPage = {
  render(params) {
    const content = document.getElementById('pageContent');
    // Show register form when path is /register OR query has type=register
    const type = (params.path === '/register') ? 'register' : (params.query?.type || 'login');

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
                <input type="email" id="loginEmail" placeholder="your@email.com" required>
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
            Don't have an account? <a href="#/register">Create one</a>
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

    try {
      // Look up user in database
      const user = await DB.getUserByEmail(email);
      
      if (user) {
        // Hash the entered password and compare with stored hash
        const hashedPassword = await DB.hashPassword(password);
        
        if (user.password === hashedPassword) {
          // Successful login - store user session (never store raw password)
          localStorage.setItem('shop_user', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            is_admin: !!user.is_admin
          }));
          Components.toast(`Welcome back, ${user.name}!`, 'success');
          App.updateAuthUI();
          Router.navigate(user.is_admin ? '#/admin' : '#/');
          return;
        }
      }
      
      Components.toast('Invalid email or password', 'error');
    } catch (error) {
      console.error('Login error:', error);
      Components.toast('Login failed: ' + error.message, 'error');
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

    try {
      // Check if email is already taken
      const existing = await DB.getUserByEmail(email);
      if (existing) {
        Components.toast('An account with this email already exists', 'error');
        return;
      }

      // Insert user into the database (password is hashed inside createUser)
      const userId = await DB.createUser(name, email, password);

      // Store user session only (never store raw password)
      localStorage.setItem('shop_user', JSON.stringify({
        id: userId,
        name,
        email,
        is_admin: false
      }));
      Components.toast(`Welcome, ${name}!`, 'success');
      App.updateAuthUI();
      Router.navigate('#/');
    } catch (error) {
      console.error('Registration error:', error);
      Components.toast('Registration failed: ' + error.message, 'error');
    }
  },

  logout() {
    localStorage.removeItem('shop_user');
    Components.toast('Logged out successfully', 'info');
    App.updateAuthUI();
    Router.navigate('#/');
  }
};
