// ============================================
// ShopVerse — Database Layer (Turso/libsql)
// ============================================

const DB = {
  client: null,

  init() {
    this.client = window.__tursoClient;
    if (!this.client) {
      console.error('Turso client not initialized');
    }
    return this;
  },

  async query(sql, params = []) {
    try {
      const result = await this.client.execute({ sql, args: params });
      return result.rows || [];
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  },

  async execute(sql, params = []) {
    try {
      const result = await this.client.execute({ sql, args: params });
      return result;
    } catch (error) {
      console.error('Database execute error:', error);
      throw error;
    }
  },

  // === Products ===
  async getProducts(filters = {}) {
    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (filters.category) {
      sql += ' AND category_id = (SELECT id FROM categories WHERE slug = ?)';
      params.push(filters.category);
    }
    if (filters.search) {
      sql += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    if (filters.featured) {
      sql += ' AND featured = 1';
    }
    if (filters.min_price) {
      sql += ' AND price >= ?';
      params.push(filters.min_price);
    }
    if (filters.max_price) {
      sql += ' AND price <= ?';
      params.push(filters.max_price);
    }

    // Sorting
    const sortMap = {
      'newest': 'created_at DESC',
      'price-asc': 'price ASC',
      'price-desc': 'price DESC',
      'rating': 'rating DESC',
      'name': 'name ASC'
    };
    const orderBy = sortMap[filters.sort] || 'created_at DESC';
    sql += ` ORDER BY ${orderBy}`;

    // Pagination
    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }
    if (filters.offset) {
      sql += ' OFFSET ?';
      params.push(filters.offset);
    }

    return this.query(sql, params);
  },

  async getProduct(slug) {
    const products = await this.query(
      'SELECT p.*, c.name as category_name, c.slug as category_slug FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.slug = ?',
      [slug]
    );
    return products.length > 0 ? products[0] : null;
  },

  async getProductById(id) {
    const products = await this.query(
      'SELECT p.*, c.name as category_name, c.slug as category_slug FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?',
      [id]
    );
    return products.length > 0 ? products[0] : null;
  },

  async getFeaturedProducts() {
    return this.query('SELECT * FROM products WHERE featured = 1 ORDER BY rating DESC LIMIT 8');
  },

  async getProductsByCategory(categorySlug, limit = 4) {
    return this.query(
      `SELECT p.* FROM products p 
       JOIN categories c ON p.category_id = c.id 
       WHERE c.slug = ? 
       ORDER BY p.rating DESC 
       LIMIT ?`,
      [categorySlug, limit]
    );
  },

  // === Categories ===
  async getCategories() {
    const categories = await this.query('SELECT * FROM categories ORDER BY name');
    // Add product count
    for (let cat of categories) {
      const countResult = await this.query(
        'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
        [cat.id]
      );
      cat.product_count = countResult[0]?.count || 0;
    }
    return categories;
  },

  async getCategory(slug) {
    const categories = await this.query('SELECT * FROM categories WHERE slug = ?', [slug]);
    return categories.length > 0 ? categories[0] : null;
  },

  // === Cart ===
  getSessionId() {
    let sessionId = localStorage.getItem('shop_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem('shop_session_id', sessionId);
    }
    return sessionId;
  },

  async getCart() {
    const sessionId = this.getSessionId();
    return this.query(
      `SELECT ci.*, p.name, p.price, p.compare_price, p.image_url, p.stock 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.session_id = ?
       ORDER BY ci.created_at DESC`,
      [sessionId]
    );
  },

  async getCartCount() {
    const sessionId = this.getSessionId();
    const result = await this.query(
      'SELECT COALESCE(SUM(quantity), 0) as count FROM cart_items WHERE session_id = ?',
      [sessionId]
    );
    return result[0]?.count || 0;
  },

  async getCartTotal() {
    const sessionId = this.getSessionId();
    const result = await this.query(
      `SELECT COALESCE(SUM(p.price * ci.quantity), 0) as total 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.session_id = ?`,
      [sessionId]
    );
    return result[0]?.total || 0;
  },

  async addToCart(productId, quantity = 1) {
    const sessionId = this.getSessionId();
    // Check if product already in cart
    const existing = await this.query(
      'SELECT * FROM cart_items WHERE session_id = ? AND product_id = ?',
      [sessionId, productId]
    );
    if (existing.length > 0) {
      return this.execute(
        'UPDATE cart_items SET quantity = quantity + ? WHERE session_id = ? AND product_id = ?',
        [quantity, sessionId, productId]
      );
    } else {
      return this.execute(
        'INSERT INTO cart_items (session_id, product_id, quantity) VALUES (?, ?, ?)',
        [sessionId, productId, quantity]
      );
    }
  },

  async updateCartItem(id, quantity) {
    if (quantity <= 0) {
      return this.removeFromCart(id);
    }
    return this.execute('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id]);
  },

  async removeFromCart(id) {
    return this.execute('DELETE FROM cart_items WHERE id = ?', [id]);
  },

  async clearCart() {
    const sessionId = this.getSessionId();
    return this.execute('DELETE FROM cart_items WHERE session_id = ?', [sessionId]);
  },

  // === Wishlist ===
  async getWishlist() {
    const sessionId = this.getSessionId();
    return this.query(
      `SELECT w.*, p.name, p.price, p.compare_price, p.image_url, p.slug
       FROM wishlist_items w 
       JOIN products p ON w.product_id = p.id 
       WHERE w.session_id = ?
       ORDER BY w.created_at DESC`,
      [sessionId]
    );
  },

  async getWishlistCount() {
    const sessionId = this.getSessionId();
    const result = await this.query(
      'SELECT COUNT(*) as count FROM wishlist_items WHERE session_id = ?',
      [sessionId]
    );
    return result[0]?.count || 0;
  },

  async toggleWishlist(productId) {
    const sessionId = this.getSessionId();
    const existing = await this.query(
      'SELECT * FROM wishlist_items WHERE session_id = ? AND product_id = ?',
      [sessionId, productId]
    );
    if (existing.length > 0) {
      await this.execute('DELETE FROM wishlist_items WHERE session_id = ? AND product_id = ?', [sessionId, productId]);
      return false; // removed
    } else {
      await this.execute('INSERT INTO wishlist_items (session_id, product_id) VALUES (?, ?)', [sessionId, productId]);
      return true; // added
    }
  },

  async isInWishlist(productId) {
    const sessionId = this.getSessionId();
    const result = await this.query(
      'SELECT * FROM wishlist_items WHERE session_id = ? AND product_id = ?',
      [sessionId, productId]
    );
    return result.length > 0;
  },

  // === Orders ===
  async createOrder(orderData) {
    const { total, subtotal, shipping, tax, shipping_address, payment_method, transaction_id, payment_provider, items } = orderData;
    const sessionId = this.getSessionId();

    const result = await this.execute(
      `INSERT INTO orders (session_id, total, subtotal, shipping, tax, shipping_address, payment_method, transaction_id, payment_provider, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [sessionId, total, subtotal, shipping || 0, tax || 0, shipping_address, payment_method, transaction_id || null, payment_provider || null]
    );

    const orderId = result.lastInsertRowid;

    // Insert order items
    for (const item of items) {
      await this.execute(
        `INSERT INTO order_items (order_id, product_id, product_name, product_image, quantity, price) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.name, item.image_url, item.quantity, item.price]
      );
    }

    // Clear the cart
    await this.clearCart();

    return orderId;
  },

  async getOrders() {
    const sessionId = this.getSessionId();
    return this.query(
      'SELECT * FROM orders WHERE session_id = ? ORDER BY created_at DESC',
      [sessionId]
    );
  },

  async getOrderItems(orderId) {
    return this.query(
      'SELECT * FROM order_items WHERE order_id = ?',
      [orderId]
    );
  },

  async approveTransaction(orderId) {
    return this.execute(
      "UPDATE orders SET transaction_approved = 1, status = 'confirmed' WHERE id = ?",
      [orderId]
    );
  },

  async rejectTransaction(orderId) {
    return this.execute(
      "UPDATE orders SET status = 'cancelled' WHERE id = ?",
      [orderId]
    );
  },

  async setDownloadLink(orderId, downloadLink) {
    return this.execute(
      'UPDATE orders SET download_link = ?, status = ? WHERE id = ?',
      [downloadLink, 'delivered', orderId]
    );
  },

  async getPendingTransactions() {
    return this.query(
      "SELECT * FROM orders WHERE transaction_id IS NOT NULL AND transaction_approved = 0 AND status = 'pending' ORDER BY created_at DESC"
    );
  },

  // === Reviews ===
  async getProductReviews(productId) {
    return this.query(
      'SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC',
      [productId]
    );
  },

  async addReview(productId, authorName, rating, comment) {
    return this.execute(
      'INSERT INTO reviews (product_id, author_name, rating, comment) VALUES (?, ?, ?, ?)',
      [productId, authorName, rating, comment]
    );
  },

  // === Contact ===
  async submitContact(name, email, subject, message) {
    return this.execute(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
  },

  // === Search / Autocomplete ===
  async searchSuggestions(query, limit = 6) {
    if (!query || query.trim().length < 1) return [];
    const products = await this.query(
      `SELECT p.id, p.name, p.slug, p.price, p.compare_price, p.image_url, p.stock, c.name as category_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.name LIKE ? OR p.slug LIKE ?
       ORDER BY 
         CASE 
           WHEN p.name LIKE ? THEN 0
           WHEN p.name LIKE ? THEN 1
           ELSE 2
         END,
         p.rating DESC
       LIMIT ?`,
      [`%${query}%`, `%${query}%`, `${query}%`, `%${query}%`, limit]
    );
    return products;
  },

  async searchCategories(query) {
    return this.query(
      `SELECT id, name, slug FROM categories WHERE name LIKE ? LIMIT 4`,
      [`%${query}%`]
    );
  },

  // === Coupons ===
  async validateCoupon(code) {
    const coupons = await this.query(
      `SELECT * FROM coupons WHERE code = ? AND (expires_at > datetime('now') OR expires_at IS NULL) AND current_uses < max_uses`,
      [code.toUpperCase()]
    );
    return coupons.length > 0 ? coupons[0] : null;
  },

  // === Admin: Analytics ===
  async getDashboardStats() {
    const productCount = await this.query('SELECT COUNT(*) as count FROM products');
    const orderCount = await this.query('SELECT COUNT(*) as count FROM orders');
    const userCount = await this.query('SELECT COUNT(*) as count FROM users');
    const revenueResult = await this.query("SELECT COALESCE(SUM(total), 0) as total FROM orders WHERE status != 'cancelled'");
    
    return {
      totalProducts: productCount[0]?.count || 0,
      totalOrders: orderCount[0]?.count || 0,
      totalUsers: userCount[0]?.count || 0,
      totalRevenue: revenueResult[0]?.total || 0
    };
  },

  async getRecentOrders(limit = 10) {
    return this.query(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
  },

  async getTopProducts(limit = 5) {
    return this.query(
      `SELECT p.*, COALESCE(SUM(oi.quantity), 0) as total_sold, COALESCE(SUM(oi.quantity * oi.price), 0) as revenue
       FROM products p
       LEFT JOIN order_items oi ON p.id = oi.product_id
       LEFT JOIN orders o ON oi.order_id = o.id AND o.status != 'cancelled'
       GROUP BY p.id
       ORDER BY revenue DESC
       LIMIT ?`,
      [limit]
    );
  },

  async getDailySales(days = 7) {
    return this.query(
      `SELECT DATE(created_at) as date, COUNT(*) as orders, COALESCE(SUM(total), 0) as revenue
       FROM orders 
       WHERE created_at >= datetime('now', '-${days} days') AND status != 'cancelled'
       GROUP BY DATE(created_at)
       ORDER BY date ASC`
    );
  },

  async getCategoryDistribution() {
    return this.query(
      `SELECT c.name, c.slug, COUNT(p.id) as product_count
       FROM categories c
       LEFT JOIN products p ON c.id = p.category_id
       GROUP BY c.id
       ORDER BY product_count DESC`
    );
  },

  async getOrdersByStatus() {
    return this.query(
      `SELECT status, COUNT(*) as count FROM orders GROUP BY status ORDER BY count DESC`
    );
  },

  // === Admin: Product Management ===
  async createProduct(data) {
    const { name, slug, description, price, compare_price, image_url, category_id, stock, featured, media_type, video_url, preview_url, preview_description, file_size, duration } = data;
    const result = await this.execute(
      `INSERT INTO products (name, slug, description, price, compare_price, image_url, category_id, stock, featured, media_type, video_url, preview_url, preview_description, file_size, duration)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, description, price, compare_price || null, image_url, category_id || null, stock || 0, featured ? 1 : 0, media_type || 'physical', video_url || null, preview_url || null, preview_description || null, file_size || null, duration || null]
    );
    return result.lastInsertRowid;
  },

  async updateProduct(id, data) {
    const fields = [];
    const params = [];
    
    const allowedFields = ['name', 'slug', 'description', 'price', 'compare_price', 'image_url', 'images', 'category_id', 'stock', 'featured', 'rating', 'reviews_count', 'media_type', 'video_url', 'preview_url', 'preview_description', 'file_size', 'duration'];
    
    for (const [key, value] of Object.entries(data)) {
      if (allowedFields.includes(key)) {
        fields.push(`${key} = ?`);
        params.push(value);
      }
    }
    
    if (fields.length === 0) return;
    
    params.push(id);
    return this.execute(
      `UPDATE products SET ${fields.join(', ')} WHERE id = ?`,
      params
    );
  },

  // === Video Products ===
  async createVideoProduct(data) {
    return this.createProduct({
      ...data,
      media_type: 'video',
      category_id: data.category_id || 7
    });
  },

  async getVideoProducts(filters = {}) {
    let sql = "SELECT * FROM products WHERE media_type = 'video'";
    const params = [];
    if (filters.search) {
      sql += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    if (filters.featured) {
      sql += ' AND featured = 1';
    }
    sql += ' ORDER BY created_at DESC';
    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }
    return this.query(sql, params);
  },

  async deleteProduct(id) {
    await this.execute('DELETE FROM cart_items WHERE product_id = ?', [id]);
    await this.execute('DELETE FROM wishlist_items WHERE product_id = ?', [id]);
    await this.execute('DELETE FROM reviews WHERE product_id = ?', [id]);
    await this.execute('DELETE FROM order_items WHERE product_id = ?', [id]);
    return this.execute('DELETE FROM products WHERE id = ?', [id]);
  },

  async getAllProducts(filters = {}) {
    let sql = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
    const params = [];

    if (filters.search) {
      sql += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    if (filters.category_id) {
      sql += ' AND p.category_id = ?';
      params.push(filters.category_id);
    }

    sql += ' ORDER BY p.created_at DESC';
    
    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }
    if (filters.offset) {
      sql += ' OFFSET ?';
      params.push(filters.offset);
    }

    return this.query(sql, params);
  },

  // === Admin: Order Management ===
  async getAllOrders(filters = {}) {
    let sql = 'SELECT o.*, COUNT(oi.id) as item_count FROM orders o LEFT JOIN order_items oi ON o.id = oi.order_id WHERE 1=1';
    const params = [];

    if (filters.status) {
      sql += ' AND o.status = ?';
      params.push(filters.status);
    }

    sql += ' GROUP BY o.id ORDER BY o.created_at DESC';
    
    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    }
    if (filters.offset) {
      sql += ' OFFSET ?';
      params.push(filters.offset);
    }

    return this.query(sql, params);
  },

  async getOrderDetail(orderId) {
    const [order] = await this.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (!order) return null;
    order.items = await this.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
    return order;
  },

  async updateOrderStatus(orderId, status) {
    return this.execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
  },

  // === User Management ===
  async createUser(name, email, password) {
    const result = await this.execute(
      'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, 0)',
      [name, email, password]
    );
    return result.lastInsertRowid;
  },

  async getAllUsers() {
    return this.query('SELECT id, name, email, phone, is_admin, created_at FROM users ORDER BY created_at DESC');
  },

  // === Media Library ===
  async getMedia(filters = {}) {
    let sql = 'SELECT * FROM media WHERE 1=1';
    const params = [];
    if (filters.media_type) {
      sql += ' AND media_type = ?';
      params.push(filters.media_type);
    }
    if (filters.search) {
      sql += ' AND (original_name LIKE ? OR alt_text LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }
    sql += ' ORDER BY created_at DESC';
    if (filters.limit) {
      sql += ' LIMIT ?';
      params.push(filters.limit);
    } else {
      sql += ' LIMIT 100';
    }
    return this.query(sql, params);
  },

  async addMedia(mediaData) {
    const { filename, original_name, url, secure_url, public_id, media_type, format, size, width, height, duration, thumbnail_url, alt_text, uploaded_by } = mediaData;
    const result = await this.execute(
      `INSERT INTO media (filename, original_name, url, secure_url, public_id, media_type, format, size, width, height, duration, thumbnail_url, alt_text, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [filename, original_name, url, secure_url, public_id, media_type, format, size || null, width || null, height || null, duration || null, thumbnail_url || null, alt_text || null, uploaded_by || null]
    );
    return result.lastInsertRowid;
  },

  async deleteMedia(id) {
    return this.execute('DELETE FROM media WHERE id = ?', [id]);
  },

  async getMediaById(id) {
    const items = await this.query('SELECT * FROM media WHERE id = ?', [id]);
    return items.length > 0 ? items[0] : null;
  },

  // === Admin Password Management ===
  async getUserByEmail(email) {
    const users = await this.query('SELECT * FROM users WHERE email = ?', [email]);
    return users.length > 0 ? users[0] : null;
  },

  async getUserById(id) {
    const users = await this.query('SELECT * FROM users WHERE id = ?', [id]);
    return users.length > 0 ? users[0] : null;
  },

  async updateUserPassword(userId, newPasswordHash) {
    return this.execute('UPDATE users SET password = ? WHERE id = ?', [newPasswordHash, userId]);
  },

  async storePasswordResetCode(email, code, expiresAt) {
    // Invalidate old codes
    await this.execute("UPDATE password_reset_codes SET used = 1 WHERE email = ? AND used = 0", [email]);
    return this.execute(
      'INSERT INTO password_reset_codes (email, code, expires_at) VALUES (?, ?, ?)',
      [email, code, expiresAt]
    );
  },

  async verifyResetCode(email, code) {
    const codes = await this.query(
      "SELECT * FROM password_reset_codes WHERE email = ? AND code = ? AND used = 0 AND expires_at > datetime('now')",
      [email, code]
    );
    return codes.length > 0 ? codes[0] : null;
  },

  async markResetCodeUsed(id) {
    return this.execute('UPDATE password_reset_codes SET used = 1 WHERE id = ?', [id]);
  },

  async setSecurityQuestion(userId, question, answerHash, recoveryEmail) {
    const existing = await this.query('SELECT * FROM admin_security WHERE user_id = ?', [userId]);
    if (existing.length > 0) {
      return this.execute(
        'UPDATE admin_security SET question = ?, answer_hash = ?, recovery_email = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
        [question, answerHash, recoveryEmail || null, userId]
      );
    } else {
      return this.execute(
        'INSERT INTO admin_security (user_id, question, answer_hash, recovery_email) VALUES (?, ?, ?, ?)',
        [userId, question, answerHash, recoveryEmail || null]
      );
    }
  },

  async getSecurityQuestion(email) {
    const result = await this.query(
      'SELECT s.question, s.recovery_email, u.email FROM admin_security s JOIN users u ON s.user_id = u.id WHERE u.email = ?',
      [email]
    );
    return result.length > 0 ? result[0] : null;
  },

  async verifySecurityAnswer(email, answerHash) {
    const result = await this.query(
      'SELECT s.*, u.id as user_id FROM admin_security s JOIN users u ON s.user_id = u.id WHERE u.email = ? AND s.answer_hash = ?',
      [email, answerHash]
    );
    return result.length > 0 ? result[0] : null;
  }
};


