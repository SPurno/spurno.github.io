// ============================================
// ShopVerse — Admin Dashboard
// ============================================

const AdminPage = {
  currentTab: 'dashboard',
  productPage: 0,
  orderPage: 0,
  pageSize: 10,

  async render() {
    const content = document.getElementById('pageContent');
    
    // Admin access guard
    const user = App.getUser();
    if (!user || !user.is_admin) {
      content.innerHTML = Components.emptyState(
        '🔒', 'Admin Access Required', 'Please sign in with an admin account to access the dashboard.',
        'Sign In', '#/login'
      );
      return;
    }

    content.innerHTML = `
      <div class="admin-page page-enter">
        <div class="admin-sidebar">
          <div class="admin-sidebar-header">
            <span class="brand-icon">✦</span>
            <span class="brand-text">Admin</span>
          </div>
          <nav class="admin-sidebar-nav">
            <button class="admin-nav-item active" data-tab="dashboard" onclick="AdminPage.switchTab('dashboard')">
              <i class="fas fa-chart-pie"></i> Dashboard
            </button>
            <button class="admin-nav-item" data-tab="products" onclick="AdminPage.switchTab('products')">
              <i class="fas fa-box"></i> Products
            </button>
            <button class="admin-nav-item" data-tab="orders" onclick="AdminPage.switchTab('orders')">
              <i class="fas fa-truck"></i> Orders
            </button>
            <button class="admin-nav-item" data-tab="users" onclick="AdminPage.switchTab('users')">
              <i class="fas fa-users"></i> Users
            </button>
            <button class="admin-nav-item" data-tab="coupons" onclick="AdminPage.switchTab('coupons')">
              <i class="fas fa-tag"></i> Coupons
            </button>
            <hr class="admin-divider">
            <a href="#/" class="admin-nav-item" style="display:flex;align-items:center;gap:10px;padding:12px 16px;color:var(--text-muted);text-decoration:none;border-radius:var(--radius-sm);font-size:0.9rem;transition:var(--transition-normal)">
              <i class="fas fa-arrow-left"></i> Back to Store
            </a>
          </nav>
        </div>
        <div class="admin-main">
          <div class="admin-header">
            <h2 id="adminPageTitle">Dashboard</h2>
            <div class="admin-header-actions">
              <span class="admin-badge">Admin</span>
            </div>
          </div>
          <div class="admin-content" id="adminContent">
            <div style="text-align:center;padding:60px">
              <div class="loader-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    await this.loadDashboard();
  },

  switchTab(tab) {
    this.currentTab = tab;
    document.querySelectorAll('.admin-nav-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
    document.getElementById('adminPageTitle').textContent = tab.charAt(0).toUpperCase() + tab.slice(1);

    const content = document.getElementById('adminContent');
    content.innerHTML = `<div style="text-align:center;padding:60px"><div class="loader-spinner"></div></div>`;

    switch (tab) {
      case 'dashboard': this.loadDashboard(); break;
      case 'products': this.loadProducts(); break;
      case 'orders': this.loadOrders(); break;
      case 'users': this.loadUsers(); break;
      case 'coupons': this.loadCoupons(); break;
    }
  },

  // ===================== DASHBOARD =====================
  async loadDashboard() {
    const container = document.getElementById('adminContent');

    try {
      const [stats, recentOrders, topProducts, dailySales, categoryDist, ordersByStatus] = await Promise.all([
        DB.getDashboardStats(),
        DB.getRecentOrders(5),
        DB.getTopProducts(5),
        DB.getDailySales(7),
        DB.getCategoryDistribution(),
        DB.getOrdersByStatus()
      ]);

      // Generate sales chart bars
      const salesData = this.generateSalesData(dailySales, 7);

      container.innerHTML = `
        <!-- Stats Cards -->
        <div class="admin-stats-grid">
          <div class="admin-stat-card glass">
            <div class="admin-stat-icon" style="background:rgba(108,99,255,0.15);color:var(--accent-1)">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <div class="admin-stat-info">
              <div class="admin-stat-value">$${parseFloat(stats.totalRevenue).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <div class="admin-stat-label">Total Revenue</div>
            </div>
            <div class="admin-stat-change positive">
              <i class="fas fa-arrow-up"></i> 12.5%
            </div>
          </div>
          <div class="admin-stat-card glass">
            <div class="admin-stat-icon" style="background:rgba(0,229,255,0.15);color:var(--accent-3)">
              <i class="fas fa-shopping-bag"></i>
            </div>
            <div class="admin-stat-info">
              <div class="admin-stat-value">${stats.totalOrders}</div>
              <div class="admin-stat-label">Total Orders</div>
            </div>
            <div class="admin-stat-change positive">
              <i class="fas fa-arrow-up"></i> 8.3%
            </div>
          </div>
          <div class="admin-stat-card glass">
            <div class="admin-stat-icon" style="background:rgba(0,230,118,0.15);color:var(--success)">
              <i class="fas fa-box"></i>
            </div>
            <div class="admin-stat-info">
              <div class="admin-stat-value">${stats.totalProducts}</div>
              <div class="admin-stat-label">Products</div>
            </div>
            <div class="admin-stat-change">
              <i class="fas fa-minus"></i> 0%
            </div>
          </div>
          <div class="admin-stat-card glass">
            <div class="admin-stat-icon" style="background:rgba(255,215,64,0.15);color:var(--warning)">
              <i class="fas fa-users"></i>
            </div>
            <div class="admin-stat-info">
              <div class="admin-stat-value">${stats.totalUsers}</div>
              <div class="admin-stat-label">Users</div>
            </div>
            <div class="admin-stat-change positive">
              <i class="fas fa-arrow-up"></i> 5.2%
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="admin-charts-row">
          <div class="admin-chart-card glass">
            <div class="admin-chart-header">
              <h3>Sales (Last 7 Days)</h3>
            </div>
            <div class="admin-chart-body">
              <div class="admin-bar-chart" id="salesChart">
                ${salesData.map((d, i) => `
                  <div class="admin-bar-item">
                    <div class="admin-bar-value">$${d.revenue}</div>
                    <div class="admin-bar-track">
                      <div class="admin-bar-fill" style="height:${d.percent}%"></div>
                    </div>
                    <div class="admin-bar-label">${d.label}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="admin-chart-card glass">
            <div class="admin-chart-header">
              <h3>Orders by Status</h3>
            </div>
            <div class="admin-chart-body">
              <div class="admin-pie-legend">
                ${this.getStatusColorMap().map(s => {
                  const count = ordersByStatus.find(o => o.status === s.id)?.count || 0;
                  const total = ordersByStatus.reduce((sum, o) => sum + o.count, 0);
                  const pct = total > 0 ? Math.round(count / total * 100) : 0;
                  return `
                    <div class="admin-legend-item">
                      <span class="admin-legend-dot" style="background:${s.color}"></span>
                      <span>${s.label}</span>
                      <span class="admin-legend-count">${count} (${pct}%)</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Row -->
        <div class="admin-charts-row">
          <div class="admin-chart-card glass">
            <div class="admin-chart-header">
              <h3>Top Products</h3>
              <a href="#/admin" onclick="AdminPage.switchTab('products');return false" class="admin-chart-link">View All</a>
            </div>
            <div class="admin-chart-body" style="padding:0">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sold</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  ${topProducts.length === 0 ? '<tr><td colspan="3" style="text-align:center;padding:24px;color:var(--text-muted)">No sales data yet</td></tr>' : 
                    topProducts.map(p => `
                      <tr>
                        <td style="display:flex;align-items:center;gap:10px">
                          <img src="${p.image_url}" alt="${p.name}" style="width:36px;height:36px;border-radius:6px;object-fit:cover">
                          <span style="font-weight:500;font-size:0.9rem">${p.name}</span>
                        </td>
                        <td>${p.total_sold || 0}</td>
                        <td style="font-weight:600;color:var(--accent-1)">$${parseFloat(p.revenue || 0).toFixed(2)}</td>
                      </tr>
                    `).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="admin-chart-card glass">
            <div class="admin-chart-header">
              <h3>Recent Orders</h3>
              <a href="#/admin" onclick="AdminPage.switchTab('orders');return false" class="admin-chart-link">View All</a>
            </div>
            <div class="admin-chart-body" style="padding:0">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentOrders.length === 0 ? '<tr><td colspan="3" style="text-align:center;padding:24px;color:var(--text-muted)">No orders yet</td></tr>' :
                    recentOrders.map(o => `
                      <tr>
                        <td>
                          <span style="font-weight:600">#${o.id}</span>
                          <span style="font-size:0.8rem;color:var(--text-muted);display:block">
                            ${new Date(o.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td>${AdminPage.statusBadge(o.status)}</td>
                        <td style="font-weight:600">$${parseFloat(o.total).toFixed(2)}</td>
                      </tr>
                    `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Dashboard error:', error);
      container.innerHTML = Components.emptyState('😔', 'Failed to load dashboard', error.message);
    }
  },

  generateSalesData(dailySales, days) {
    const data = [];
    const maxRevenue = Math.max(...dailySales.map(d => parseFloat(d.revenue || 0)), 1);
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = dailySales.find(d => d.date === dateStr) || { revenue: '0', orders: '0' };
      const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      data.push({
        label: dayLabels[date.getDay()],
        date: dateStr,
        revenue: parseFloat(dayData.revenue).toFixed(0),
        orders: dayData.orders || 0,
        percent: Math.max((parseFloat(dayData.revenue) / maxRevenue) * 100, 5)
      });
    }
    return data;
  },

  getStatusColorMap() {
    return [
      { id: 'pending', label: 'Pending', color: 'var(--warning)' },
      { id: 'confirmed', label: 'Confirmed', color: 'var(--info)' },
      { id: 'shipped', label: 'Shipped', color: 'var(--accent-1)' },
      { id: 'delivered', label: 'Delivered', color: 'var(--success)' },
      { id: 'cancelled', label: 'Cancelled', color: 'var(--error)' }
    ];
  },

  statusBadge(status) {
    const colors = {
      'pending': 'var(--warning)',
      'confirmed': 'var(--info)',
      'shipped': 'var(--accent-1)',
      'delivered': 'var(--success)',
      'cancelled': 'var(--error)'
    };
    return `<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:var(--radius-full);font-size:0.75rem;font-weight:600;background:${colors[status] || 'var(--text-muted)'}20;color:${colors[status] || 'var(--text-muted)'}">
      <span style="width:6px;height:6px;border-radius:50%;background:${colors[status] || 'var(--text-muted)'}"></span>
      ${status.charAt(0).toUpperCase() + status.slice(1)}
    </span>`;
  },

  // ===================== PRODUCTS =====================
  async loadProducts(search = '') {
    const container = document.getElementById('adminContent');

    try {
      const filters = {};
      if (search) filters.search = search;
      const [products, categories] = await Promise.all([
        DB.getAllProducts(filters),
        DB.getCategories()
      ]);

      container.innerHTML = `
        <div class="admin-toolbar">
          <div class="admin-search">
            <i class="fas fa-search"></i>
            <input type="text" id="productSearch" placeholder="Search products..." value="${search}" 
                   onkeydown="if(event.key==='Enter')AdminPage.loadProducts(this.value)">
          </div>
          <button class="btn btn-primary btn-sm" onclick="AdminPage.showProductForm(null, ${JSON.stringify(categories).replace(/"/g, "'")})">
            <i class="fas fa-plus"></i> Add Product
          </button>
        </div>
        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width:40px">ID</th>
                <th style="width:300px">Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Featured</th>
                <th style="width:120px">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${products.length === 0 ? 
                '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted)">No products found</td></tr>' :
                products.map(p => `
                  <tr>
                    <td style="color:var(--text-muted);font-size:0.85rem">#${p.id}</td>
                    <td>
                      <div style="display:flex;align-items:center;gap:12px">
                        <img src="${p.image_url || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&q=60'}" 
                             alt="${p.name}" style="width:44px;height:44px;border-radius:8px;object-fit:cover">
                        <div>
                          <div style="font-weight:600;font-size:0.9rem">${p.name}</div>
                          <div style="font-size:0.75rem;color:var(--text-muted)">Slug: ${p.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td><span style="font-size:0.85rem">${p.category_name || '—'}</span></td>
                    <td><span style="font-weight:600;color:var(--accent-1)">$${parseFloat(p.price).toFixed(2)}</span></td>
                    <td>
                      <span style="color:${p.stock > 0 ? 'var(--success)' : 'var(--error)'};font-weight:600">
                        ${p.stock > 0 ? p.stock : 'Out'}
                      </span>
                    </td>
                    <td>
                      <span style="color:#ffc107">${'★'.repeat(Math.round(p.rating || 0))}${'☆'.repeat(5 - Math.round(p.rating || 0))}</span>
                      <span style="font-size:0.8rem;color:var(--text-muted)">(${p.reviews_count || 0})</span>
                    </td>
                    <td>
                      <button class="admin-toggle ${p.featured ? 'active' : ''}" 
                              onclick="AdminPage.toggleFeatured(${p.id}, ${!p.featured})">
                        <div class="admin-toggle-knob"></div>
                      </button>
                    </td>
                    <td>
                      <div style="display:flex;gap:6px">
                        <button class="admin-action-btn" onclick="AdminPage.showProductForm(${p.id}, ${JSON.stringify(categories).replace(/"/g, "'")})" title="Edit">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button class="admin-action-btn delete" onclick="AdminPage.deleteProduct(${p.id}, '${p.name.replace(/'/g, "\\'")}')" title="Delete">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } catch (error) {
      console.error('Products error:', error);
      container.innerHTML = Components.emptyState('😔', 'Failed to load products', error.message);
    }
  },

  async showProductForm(productId, categories) {
    let product = null;
    if (productId) {
      product = await DB.getProductById(productId);
    }

    const isEdit = !!product;
    const catOptions = categories.map(c => 
      `<option value="${c.id}" ${product && product.category_id === c.id ? 'selected' : ''}>${c.name}</option>`
    ).join('');

    Components.showModal(isEdit ? 'Edit Product' : 'Add Product', `
      <form id="productForm" onsubmit="AdminPage.saveProduct(event, ${productId || 'null'})" style="display:flex;flex-direction:column;gap:14px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="form-group">
            <label>Product Name</label>
            <input type="text" id="pf_name" value="${isEdit ? product.name : ''}" required>
          </div>
          <div class="form-group">
            <label>Slug</label>
            <input type="text" id="pf_slug" value="${isEdit ? product.slug : ''}" placeholder="auto-generated">
          </div>
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea id="pf_description" rows="3" style="resize:vertical">${isEdit ? (product.description || '') : ''}</textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
          <div class="form-group">
            <label>Price ($)</label>
            <input type="number" id="pf_price" step="0.01" min="0" value="${isEdit ? product.price : ''}" required>
          </div>
          <div class="form-group">
            <label>Compare Price ($)</label>
            <input type="number" id="pf_compare" step="0.01" min="0" value="${isEdit && product.compare_price ? product.compare_price : ''}">
          </div>
          <div class="form-group">
            <label>Stock</label>
            <input type="number" id="pf_stock" min="0" value="${isEdit ? product.stock : '0'}">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="form-group">
            <label>Category</label>
            <select id="pf_category">
              <option value="">No category</option>
              ${catOptions}
            </select>
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="pf_image" value="${isEdit ? (product.image_url || '') : ''}" placeholder="https://...">
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <input type="checkbox" id="pf_featured" ${isEdit && product.featured ? 'checked' : ''} style="width:auto">
          <label for="pf_featured" style="margin:0">Featured product</label>
        </div>
        <button type="submit" class="btn btn-primary btn-block">
          <i class="fas fa-${isEdit ? 'save' : 'plus'}"></i> ${isEdit ? 'Save Changes' : 'Add Product'}
        </button>
      </form>
    `);

    // Auto-generate slug from name (only for new products)
    const slugField = document.getElementById('pf_slug');
    const nameField = document.getElementById('pf_name');
    
    // If it's a new product (empty slug), enable auto-generation
    if (!slugField.value) {
      nameField?.addEventListener('input', function() {
        if (!slugField.dataset.manual) {
          slugField.value = this.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }
      });
    }
    
    slugField?.addEventListener('input', function() {
      this.dataset.manual = 'true';
    });
  },

  async saveProduct(event, productId) {
    event.preventDefault();
    const data = {
      name: document.getElementById('pf_name').value,
      slug: document.getElementById('pf_slug').value || document.getElementById('pf_name').value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      description: document.getElementById('pf_description').value,
      price: parseFloat(document.getElementById('pf_price').value),
      compare_price: document.getElementById('pf_compare').value ? parseFloat(document.getElementById('pf_compare').value) : null,
      stock: parseInt(document.getElementById('pf_stock').value) || 0,
      category_id: document.getElementById('pf_category').value ? parseInt(document.getElementById('pf_category').value) : null,
      image_url: document.getElementById('pf_image').value || null,
      featured: document.getElementById('pf_featured').checked ? 1 : 0
    };

    try {
      if (productId) {
        await DB.updateProduct(productId, data);
        Components.toast('Product updated!', 'success');
      } else {
        await DB.createProduct(data);
        Components.toast('Product created!', 'success');
      }
      document.querySelector('.modal-overlay')?.remove();
      this.loadProducts();
    } catch (error) {
      Components.toast('Failed to save product: ' + error.message, 'error');
    }
  },

  async toggleFeatured(productId, featured) {
    try {
      await DB.updateProduct(productId, { featured: featured ? 1 : 0 });
      Components.toast(featured ? 'Featured' : 'Unfeatured', 'success');
      this.loadProducts();
    } catch (error) {
      Components.toast('Failed to update', 'error');
    }
  },

  async deleteProduct(productId, productName) {
    Components.showModal('Delete Product', `
      <p style="color:var(--text-secondary);margin-bottom:20px">
        Are you sure you want to delete <strong>${productName}</strong>? This action cannot be undone.
      </p>
      <div style="display:flex;gap:12px">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
        <button class="btn btn-primary" style="background:var(--error)" onclick="AdminPage.confirmDelete(${productId})">
          <i class="fas fa-trash"></i> Delete
        </button>
      </div>
    `);
  },

  async confirmDelete(productId) {
    try {
      await DB.deleteProduct(productId);
      Components.toast('Product deleted', 'success');
      document.querySelector('.modal-overlay')?.remove();
      this.loadProducts();
    } catch (error) {
      Components.toast('Failed to delete', 'error');
    }
  },

  // ===================== ORDERS =====================
  async loadOrders(statusFilter = '') {
    const container = document.getElementById('adminContent');

    try {
      const filters = statusFilter ? { status: statusFilter } : {};
      const orders = await DB.getAllOrders(filters);

      container.innerHTML = `
        <div class="admin-toolbar">
          <div class="admin-search">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search orders..." onkeydown="if(event.key==='Enter')AdminPage.loadOrders()">
          </div>
          <div>
            <select class="filter-select" onchange="AdminPage.loadOrders(this.value)" style="font-size:0.85rem">
              <option value="" ${statusFilter === '' ? 'selected' : ''}>All Status</option>
              <option value="pending" ${statusFilter === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="confirmed" ${statusFilter === 'confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="shipped" ${statusFilter === 'shipped' ? 'selected' : ''}>Shipped</option>
              <option value="delivered" ${statusFilter === 'delivered' ? 'selected' : ''}>Delivered</option>
              <option value="cancelled" ${statusFilter === 'cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </div>
        </div>
        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${orders.length === 0 ?
                '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-muted)">No orders found</td></tr>' :
                orders.map(o => `
                  <tr>
                    <td><span style="font-weight:700">#${o.id}</span></td>
                    <td><span style="font-size:0.85rem;color:var(--text-muted)">${new Date(o.created_at).toLocaleDateString()}</span></td>
                    <td><span style="font-size:0.85rem">${o.shipping_address ? o.shipping_address.split(',')[0] : '—'}</span></td>
                    <td>${o.item_count}</td>
                    <td style="font-weight:600;color:var(--accent-1)">$${parseFloat(o.total).toFixed(2)}</td>
                    <td><span style="font-size:0.8rem;text-transform:capitalize">${o.payment_method || '—'}</span></td>
                    <td>${this.statusBadge(o.status)}</td>
                    <td>
                      <div style="display:flex;gap:4px">
                        <button class="admin-action-btn" onclick="AdminPage.viewOrder(${o.id})" title="View">
                          <i class="fas fa-eye"></i>
                        </button>
                        <select class="admin-status-select" onchange="AdminPage.updateOrderStatus(${o.id}, this.value)" style="padding:4px 8px;font-size:0.75rem">
                          <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
                          <option value="confirmed" ${o.status === 'confirmed' ? 'selected' : ''}>Confirm</option>
                          <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>Ship</option>
                          <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Deliver</option>
                          <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Cancel</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } catch (error) {
      console.error('Orders error:', error);
      container.innerHTML = Components.emptyState('😔', 'Failed to load orders', error.message);
    }
  },



  async viewOrder(orderId) {
    try {
      const order = await DB.getOrderDetail(orderId);
      if (!order) {
        Components.toast('Order not found', 'error');
        return;
      }

      const statusColors = {
        'pending': 'var(--warning)',
        'confirmed': 'var(--info)',
        'shipped': 'var(--accent-1)',
        'delivered': 'var(--success)',
        'cancelled': 'var(--error)'
      };

      Components.showModal(`Order #${order.id}`, `
        <div style="display:flex;flex-direction:column;gap:16px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:0.8rem;color:var(--text-muted)">Date</div>
              <div>${new Date(order.created_at).toLocaleString()}</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:0.8rem;color:var(--text-muted)">Status</div>
              ${this.statusBadge(order.status)}
            </div>
          </div>
          <div style="padding:12px;background:var(--bg-input);border-radius:var(--radius-sm)">
            <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:4px">Shipping Address</div>
            <div style="font-size:0.9rem">${order.shipping_address || 'No address'}</div>
          </div>
          <div style="padding:12px;background:var(--bg-input);border-radius:var(--radius-sm)">
            <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:4px">Payment Method</div>
            <div style="font-size:0.9rem;text-transform:capitalize">${order.payment_method?.replace(/_/g, ' ') || 'N/A'}</div>
          </div>
          <div>
            <div style="font-size:0.85rem;font-weight:600;margin-bottom:8px">Items (${order.items?.length || 0})</div>
            ${(order.items || []).map(item => `
              <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border-light)">
                <img src="${item.product_image}" alt="${item.product_name}" style="width:40px;height:40px;border-radius:6px;object-fit:cover">
                <div style="flex:1;font-size:0.85rem">${item.product_name} × ${item.quantity}</div>
                <div style="font-weight:600;font-size:0.9rem">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
              </div>
            `).join('')}
          </div>
          <div style="border-top:1px solid var(--border-light);padding-top:12px">
            <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem">
              <span>Subtotal</span>
              <span>$${parseFloat(order.subtotal || 0).toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem">
              <span>Shipping</span>
              <span>${parseFloat(order.shipping || 0) === 0 ? 'FREE' : '$' + parseFloat(order.shipping).toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem">
              <span>Tax</span>
              <span>$${parseFloat(order.tax || 0).toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:1.1rem;font-weight:700;color:var(--accent-1)">
              <span>Total</span>
              <span>$${parseFloat(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>
      `);
    } catch (error) {
      Components.toast('Failed to load order details', 'error');
    }
  },

  async updateOrderStatus(orderId, status) {
    try {
      await DB.updateOrderStatus(orderId, status);
      Components.toast(`Order #${orderId} status updated to ${status}`, 'success');
      this.loadOrders();
    } catch (error) {
      Components.toast('Failed to update order status', 'error');
    }
  },

  // ===================== USERS =====================
  async loadUsers() {
    const container = document.getElementById('adminContent');

    try {
      const users = await DB.getAllUsers();

      container.innerHTML = `
        <div class="admin-toolbar">
          <h3 style="font-size:1rem;font-weight:600">All Registered Users</h3>
          <span style="color:var(--text-muted);font-size:0.85rem">${users.length} total</span>
        </div>
        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              ${users.length === 0 ?
                '<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)">No users found</td></tr>' :
                users.map(u => `
                  <tr>
                    <td style="color:var(--text-muted);font-size:0.85rem">#${u.id}</td>
                    <td><span style="font-weight:600">${u.name}</span></td>
                    <td>${u.email}</td>
                    <td>${u.phone || '—'}</td>
                    <td>
                      ${u.is_admin ? 
                        '<span style="padding:2px 10px;border-radius:var(--radius-full);font-size:0.75rem;font-weight:600;background:rgba(108,99,255,0.15);color:var(--accent-1)">Admin</span>' :
                        '<span style="padding:2px 10px;border-radius:var(--radius-full);font-size:0.75rem;background:var(--bg-input);color:var(--text-muted)">User</span>'
                      }
                    </td>
                    <td style="font-size:0.85rem;color:var(--text-muted)">${new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                `).join('')}
            </tbody>
          </table>
        </div>
      `;
    } catch (error) {
      console.error('Users error:', error);
      container.innerHTML = Components.emptyState('😔', 'Failed to load users', error.message);
    }
  },

  // ===================== COUPONS =====================
  async loadCoupons() {
    const container = document.getElementById('adminContent');

    try {
      const coupons = await DB.query(
        "SELECT *, CASE WHEN expires_at < datetime('now') THEN 'expired' WHEN current_uses >= max_uses THEN 'used_up' ELSE 'active' END as status FROM coupons ORDER BY created_at DESC"
      );

      container.innerHTML = `
        <div class="admin-toolbar">
          <h3 style="font-size:1rem;font-weight:600">Coupon Codes</h3>
          <span style="color:var(--text-muted);font-size:0.85rem">${coupons.length} coupons</span>
        </div>
        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Min Purchase</th>
                <th>Uses</th>
                <th>Expires</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${coupons.length === 0 ?
                '<tr><td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)">No coupons created</td></tr>' :
                coupons.map(c => {
                  const statusColors = { active: 'var(--success)', expired: 'var(--error)', used_up: 'var(--warning)' };
                  return `
                    <tr>
                      <td><span style="font-weight:700;font-family:monospace;font-size:0.95rem">${c.code}</span></td>
                      <td><span style="font-weight:600;color:var(--accent-1)">${c.discount_percent}% OFF</span></td>
                      <td>$${parseFloat(c.min_purchase || 0).toFixed(2)}</td>
                      <td>${c.current_uses || 0} / ${c.max_uses || '∞'}</td>
                      <td style="font-size:0.85rem;color:var(--text-muted)">${c.expires_at ? new Date(c.expires_at).toLocaleDateString() : 'Never'}</td>
                      <td><span style="padding:2px 10px;border-radius:var(--radius-full);font-size:0.75rem;font-weight:600;background:${statusColors[c.status] || 'var(--text-muted)'}20;color:${statusColors[c.status] || 'var(--text-muted)'}">${c.status}</span></td>
                    </tr>
                  `;
                }).join('')}
            </tbody>
          </table>
        </div>
      `;
    } catch (error) {
      console.error('Coupons error:', error);
      container.innerHTML = Components.emptyState('😔', 'Failed to load coupons', error.message);
    }
  }
};
