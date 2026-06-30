// ============================================
// ShopVerse — Home Page
// ============================================

const HomePage = {
  async render(params) {
    const content = document.getElementById('pageContent');
    
    // Show loading skeleton
    content.innerHTML = `
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-content">
          <div class="hero-text">
            <div class="skeleton" style="width:120px;height:32px;border-radius:20px;margin-bottom:24px"></div>
            <div class="skeleton" style="width:80%;height:60px;margin-bottom:16px;border-radius:8px"></div>
            <div class="skeleton" style="width:90%;height:48px;margin-bottom:32px;border-radius:8px"></div>
            <div class="skeleton" style="width:200px;height:52px;border-radius:12px"></div>
          </div>
          <div class="skeleton" style="width:100%;aspect-ratio:4/3;border-radius:20px"></div>
        </div>
      </section>
    `;

    try {
      const [featuredProducts, categories] = await Promise.all([
        DB.getFeaturedProducts(),
        DB.getCategories()
      ]);

      // Get some products for each featured category
      const categoryProducts = {};
      for (const cat of categories.slice(0, 3)) {
        try {
          categoryProducts[cat.slug] = await DB.getProductsByCategory(cat.slug, 4);
        } catch(e) {
          categoryProducts[cat.slug] = [];
        }
      }

      content.innerHTML = `
        <!-- Hero Section -->
        <section class="hero">
          <div class="hero-bg"></div>
          <div class="hero-content">
            <div class="hero-text">
              <div class="hero-badge">
                <i class="fas fa-sparkles"></i> New Collection 2026
              </div>
              <h1 class="hero-title">
                Elevate Your<br>
                <span class="text-gradient">Style</span> Game
              </h1>
              <p class="hero-description">
                Discover curated collections of premium products designed for the modern lifestyle. 
                From cutting-edge electronics to timeless fashion — find everything you need.
              </p>
              <div class="hero-actions">
                <a href="#/shop" class="btn btn-primary btn-lg">
                  <i class="fas fa-store"></i> Shop Now
                </a>
                <a href="#/shop?category=electronics" class="btn btn-secondary btn-lg">
                  <i class="fas fa-headphones"></i> Electronics
                </a>
              </div>
              <div class="hero-stats">
                <div class="stat-item">
                  <div class="stat-number">10K+</div>
                  <div class="stat-label">Happy Customers</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">500+</div>
                  <div class="stat-label">Products</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">98%</div>
                  <div class="stat-label">Satisfaction</div>
                </div>
              </div>
            </div>
            <div class="hero-image">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" 
                   alt="ShopVerse Collection" loading="eager">
              <div class="hero-image-float hero-image-float-1">
                <div style="background:var(--success);width:12px;height:12px;border-radius:50%"></div>
                <div>
                  <div style="font-weight:700;font-size:0.9rem">Free Shipping</div>
                  <div style="font-size:0.75rem;color:var(--text-muted)">On orders over $50</div>
                </div>
              </div>
              <div class="hero-image-float hero-image-float-2">
                <div style="background:var(--accent-1);width:12px;height:12px;border-radius:50%"></div>
                <div>
                  <div style="font-weight:700;font-size:0.9rem">24/7 Support</div>
                  <div style="font-size:0.75rem;color:var(--text-muted)">Dedicated team</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Bar -->
        <div class="features-bar">
          <div class="feature-item">
            <div class="feature-icon"><i class="fas fa-truck"></i></div>
            <div class="feature-title">Free Shipping</div>
            <div class="feature-desc">On orders over $50</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><i class="fas fa-shield-alt"></i></div>
            <div class="feature-title">Secure Payment</div>
            <div class="feature-desc">100% secure checkout</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><i class="fas fa-undo"></i></div>
            <div class="feature-title">Easy Returns</div>
            <div class="feature-desc">30-day return policy</div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><i class="fas fa-headset"></i></div>
            <div class="feature-title">24/7 Support</div>
            <div class="feature-desc">Dedicated support team</div>
          </div>
        </div>

        <!-- Featured Products -->
        <section class="section featured-section">
          <div class="section-header">
            <div class="section-label">Featured</div>
            <h2 class="section-title">Featured <span class="text-gradient">Products</span></h2>
            <p class="section-subtitle">Handpicked favorites from our latest collection</p>
          </div>
          <div class="product-grid">
            ${featuredProducts.map((p, i) => Components.productCard(p, i)).join('')}
          </div>
          <div style="text-align:center;margin-top:40px">
            <a href="#/shop" class="btn btn-secondary">
              <i class="fas fa-eye"></i> View All Products
            </a>
          </div>
        </section>

        <!-- Categories -->
        <section class="section">
          <div class="section-header">
            <div class="section-label">Categories</div>
            <h2 class="section-title">Shop by <span class="text-gradient">Category</span></h2>
            <p class="section-subtitle">Explore our wide range of product categories</p>
          </div>
          <div class="categories-grid">
            ${categories.map((c, i) => Components.categoryCard(c, i)).join('')}
          </div>
        </section>

        <!-- Category Showcases -->
        ${Object.entries(categoryProducts).filter(([_, products]) => products.length > 0).map(([slug, products], ci) => `
          <section class="section ${ci % 2 === 0 ? 'featured-section' : ''}">
            <div class="section-header" style="text-align:${ci % 2 === 0 ? 'center' : 'left'}">
              <div class="section-label">${products[0]?.category_name || slug}</div>
              <h2 class="section-title">${products[0]?.category_name || slug} <span class="text-gradient">Collection</span></h2>
            </div>
            <div class="product-grid">
              ${products.map((p, i) => Components.productCard(p, i)).join('')}
            </div>
            <div style="text-align:center;margin-top:40px">
              <a href="#/shop?category=${slug}" class="btn btn-secondary">
                <i class="fas fa-arrow-right"></i> View All
              </a>
            </div>
          </section>
        `).join('')}

        <!-- Newsletter -->
        <section class="newsletter-section">
          <div class="newsletter-content">
            <h2>Join the Shop<span style="color:rgba(255,255,255,0.7)">Verse</span> Community</h2>
            <p>Subscribe to get exclusive deals, early access to new arrivals, and member-only perks.</p>
            <div class="newsletter-form-wrapper">
              <input type="email" placeholder="Enter your email" id="newsletterEmail">
              <button onclick="App.subscribeNewsletter()">
                Subscribe <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </section>
      `;

      // Initialize wishlist icons
      App.updateWishlistIcons();
    } catch (error) {
      console.error('Home page error:', error);
      content.innerHTML = Components.emptyState(
        '😔',
        'Unable to load',
        'Failed to load the page. Please check your connection.',
        'Try Again',
        '#/'
      );
    }
  }
};
