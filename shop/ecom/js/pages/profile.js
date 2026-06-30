// ============================================
// ShopVerse — Profile Page
// ============================================

const ProfilePage = {
  async render() {
    const content = document.getElementById('pageContent');
    const user = App.getUser();

    if (!user) {
      content.innerHTML = Components.emptyState(
        '🔒',
        'Sign In Required',
        'Please sign in to view your profile.',
        'Sign In',
        '#/login'
      );
      return;
    }

    content.innerHTML = `
      <div class="profile-page page-enter">
        <div class="profile-header">
          <div class="profile-avatar">${user.name.charAt(0).toUpperCase()}</div>
          <div class="profile-info">
            <h1>${user.name}</h1>
            <p>${user.email}</p>
          </div>
        </div>

        <div class="profile-tabs">
          <button class="profile-tab active" onclick="ProfilePage.switchTab('orders', this)">My Orders</button>
          <button class="profile-tab" onclick="ProfilePage.switchTab('details', this)">Account Details</button>
          <button class="profile-tab" onclick="ProfilePage.logout()" style="margin-left:auto;color:var(--error)">Sign Out</button>
        </div>

        <div class="profile-content" id="profileContent">
          <div style="text-align:center;padding:40px">
            <div class="loader-spinner"></div>
          </div>
        </div>
      </div>
    `;

    await this.loadOrders();
  },

  async loadOrders() {
    const container = document.getElementById('profileContent');

    try {
      const orders = await DB.getOrders();

      if (orders.length === 0) {
        container.innerHTML = Components.emptyState(
          '📦', 'No orders yet', 'Start shopping to see your orders here.',
          'Start Shopping', '#/shop'
        );
        return;
      }

      let html = '';
      for (const order of orders) {
        const items = await DB.getOrderItems(order.id);
        const statusColors = {
          'pending': 'var(--warning)',
          'confirmed': 'var(--info)',
          'shipped': 'var(--accent-1)',
          'delivered': 'var(--success)',
          'cancelled': 'var(--error)'
        };

        html += `
          <div style="padding:20px;background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-md)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px">
              <div>
                <strong style="font-size:1.1rem">Order #${order.id}</strong>
                <div style="font-size:0.85rem;color:var(--text-muted)">
                  ${new Date(order.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </div>
              </div>
              <div style="display:flex;gap:12px;align-items:center">
                <span style="color:${statusColors[order.status] || 'var(--text-muted)'};font-weight:600">
                  <i class="fas fa-circle" style="font-size:0.5rem;vertical-align:middle;margin-right:4px"></i>
                  ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <span style="font-weight:700;color:var(--accent-1);font-size:1.1rem">
                  $${parseFloat(order.total).toFixed(2)}
                </span>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px">
              ${items.map(item => `
                <div style="display:flex;align-items:center;gap:12px;padding:8px;background:var(--bg-input);border-radius:var(--radius-sm)">
                  <img src="${item.product_image}" alt="${item.product_name}" style="width:40px;height:40px;border-radius:6px;object-fit:cover">
                  <div style="flex:1;font-size:0.9rem">${item.product_name} × ${item.quantity}</div>
                  <div style="font-weight:600">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      container.innerHTML = html;
    } catch (error) {
      console.error('Orders error:', error);
      container.innerHTML = Components.emptyState('😔', 'Failed to load orders', error.message);
    }
  },

  switchTab(tab, btn) {
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const container = document.getElementById('profileContent');

    if (tab === 'details') {
      const user = App.getUser();
      container.innerHTML = `
        <div style="padding:32px;background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-md)" class="page-enter">
          <h3 style="margin-bottom:24px">Account Details</h3>
          <div style="display:grid;gap:16px;max-width:480px">
            <div class="form-group">
              <label>Name</label>
              <input type="text" value="${user.name}">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" value="${user.email}">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Add phone number">
            </div>
            <div class="form-group">
              <label>Address</label>
              <textarea rows="2" placeholder="Add your shipping address"></textarea>
            </div>
            <button class="btn btn-primary" onclick="Components.toast('Profile updated!', 'success')">
              Save Changes
            </button>
          </div>
        </div>
      `;
    } else {
      this.loadOrders();
    }
  },

  logout() {
    AuthPage.logout();
  }
};
