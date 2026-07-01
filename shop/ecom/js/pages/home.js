// ============================================
// PixabAnimation — Home Page
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
            <div class="skeleton" style="width:140px;height:32px;border-radius:20px;margin-bottom:24px"></div>
            <div class="skeleton" style="width:85%;height:64px;margin-bottom:16px;border-radius:8px"></div>
            <div class="skeleton" style="width:70%;height:48px;margin-bottom:32px;border-radius:8px"></div>
            <div class="skeleton" style="width:220px;height:56px;border-radius:12px"></div>
          </div>
          <div class="skeleton" style="width:100%;aspect-ratio:4/3;border-radius:24px"></div>
        </div>
      </section>
    `;

    try {
      const [featuredProducts, categories] = await Promise.all([
        DB.getFeaturedProducts(),
        DB.getCategories()
      ]);

      // Get products for featured categories (animation/video, electronics, fashion)
      const categoryProducts = {};
      const featuredSlugs = ['videos', 'electronics', 'fashion'];
      for (const slug of featuredSlugs) {
        try {
          categoryProducts[slug] = await DB.getProductsByCategory(slug, 4);
        } catch(e) {
          categoryProducts[slug] = [];
        }
      }

      content.innerHTML = `
        <!-- Hero Section with Animated Gradient Background -->
        <section class="hero" style="min-height:100vh;padding:140px 24px 80px;position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background:var(--forest-gradient);opacity:0.3;z-index:0"></div>
          <div style="position:absolute;inset:0;overflow:hidden;z-index:0">
            <div style="position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(46,204,113,0.2),transparent 70%);top:-150px;right:-80px;animation:float 12s ease-in-out infinite"></div>
            <div style="position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(26,188,156,0.15),transparent 70%);bottom:-80px;left:-80px;animation:float 10s ease-in-out infinite reverse"></div>
            <div style="position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(46,204,113,0.1),transparent 70%);top:40%;left:50%;animation:float 14s ease-in-out infinite 2s"></div>
          </div>
          <div class="hero-content" style="position:relative;z-index:1;max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
            <div class="hero-text" style="animation:fadeInUp 0.8s ease-out">
              <div class="hero-badge" style="display:inline-flex;align-items:center;gap:8px;padding:8px 18px;background:rgba(46,204,113,0.15);border:1px solid rgba(46,204,113,0.25);border-radius:var(--radius-full);font-size:0.8rem;font-weight:600;color:var(--accent-1);margin-bottom:24px">
                <span style="display:inline-flex;width:8px;height:8px;border-radius:50%;background:var(--accent-1);animation:pulse 2s infinite"></span>
                Premium Animation Assets — 2026 Collection
              </div>
              <h1 class="hero-title" style="font-size:3.8rem;font-weight:800;line-height:1.1;margin-bottom:20px;font-family:var(--font-display)">
                Bring Your<br>
                <span class="text-gradient">Creative Vision</span> to Life
              </h1>
              <p class="hero-description" style="color:var(--text-secondary);font-size:1.15rem;line-height:1.8;margin-bottom:32px;max-width:540px">
                Discover premium animation assets, 4K video clips, motion graphics, and design resources. 
                From cinematic reels to stunning templates — elevate your projects today.
              </p>
              <div class="hero-actions" style="display:flex;gap:16px;flex-wrap:wrap">
                <a href="#/shop" class="btn btn-primary btn-lg" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:18px 36px;border-radius:var(--radius-md);font-weight:600;font-size:1rem;transition:var(--transition-normal);cursor:pointer;background:var(--accent-gradient);color:white;box-shadow:0 0 30px rgba(46,204,113,0.3)">
                  <i class="fas fa-play"></i> Explore Assets
                </a>
                <a href="#/shop?category=videos" class="btn btn-secondary btn-lg" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:18px 36px;border-radius:var(--radius-md);font-weight:600;font-size:1rem;transition:var(--transition-normal);cursor:pointer;background:var(--bg-glass);color:var(--text-primary);border:1px solid var(--border-color)">
                  <i class="fas fa-video"></i> Video Library
                </a>
              </div>
              <div class="hero-stats" style="display:flex;gap:40px;margin-top:48px;padding-top:32px;border-top:1px solid var(--border-light)">
                <div class="stat-item" style="text-align:center">
                  <div class="stat-number" style="font-size:2rem;font-weight:800;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">10K+</div>
                  <div class="stat-label" style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">Happy Creators</div>
                </div>
                <div class="stat-item" style="text-align:center">
                  <div class="stat-number" style="font-size:2rem;font-weight:800;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">500+</div>
                  <div class="stat-label" style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">Premium Assets</div>
                </div>
                <div class="stat-item" style="text-align:center">
                  <div class="stat-number" style="font-size:2rem;font-weight:800;background:var(--accent-gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">4K</div>
                  <div class="stat-label" style="font-size:0.85rem;color:var(--text-muted);margin-top:4px">Ultra HD Quality</div>
                </div>
              </div>
            </div>
            <div class="hero-image" style="position:relative;animation:fadeInUp 0.8s ease-out 0.15s both">
              <div style="position:relative;border-radius:24px;overflow:hidden;box-shadow:var(--shadow-lg)">
                <img src="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&q=80" 
                     alt="PixabAnimation creative showcase" loading="eager" style="width:100%;border-radius:24px;box-shadow:var(--shadow-lg)">
                <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(46,204,113,0.1),transparent 50%)"></div>
              </div>
              <div class="glass" style="position:absolute;top:-16px;right:-16px;padding:12px 16px;display:flex;align-items:center;gap:10px;animation:float 6s ease-in-out infinite;backdrop-filter:blur(10px)">
                <div style="width:10px;height:10px;border-radius:50%;background:var(--success);box-shadow:0 0 8px rgba(46,204,113,0.5)"></div>
                <div>
                  <div style="font-weight:700;font-size:0.85rem">4K Ultra HD</div>
                  <div style="font-size:0.7rem;color:var(--text-muted)">Cinematic Quality</div>
                </div>
              </div>
              <div class="glass" style="position:absolute;bottom:-16px;left:-16px;padding:12px 16px;display:flex;align-items:center;gap:10px;animation:float 6s ease-in-out infinite 3s;backdrop-filter:blur(10px)">
                <div style="width:10px;height:10px;border-radius:50%;background:#ffc107;box-shadow:0 0 8px rgba(255,193,7,0.5)"></div>
                <div>
                  <div style="font-weight:700;font-size:0.85rem">Instant Download</div>
                  <div style="font-size:0.7rem;color:var(--text-muted)">After Purchase</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Bar - Glassmorphism -->
        <div style="max-width:1280px;margin:0 auto;padding:0 24px;margin-top:-40px;position:relative;z-index:2">
          <div class="glass" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0;padding:8px;backdrop-filter:blur(20px)">
            <div style="text-align:center;padding:24px 16px;border-right:1px solid var(--border-color)">
              <div style="width:48px;height:48px;margin:0 auto 12px;background:var(--bg-glass);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--accent-1)"><i class="fas fa-cloud-download-alt"></i></div>
              <div style="font-weight:600;margin-bottom:2px;font-size:0.95rem">Instant Download</div>
              <div style="font-size:0.8rem;color:var(--text-muted)">Access files immediately</div>
            </div>
            <div style="text-align:center;padding:24px 16px;border-right:1px solid var(--border-color)">
              <div style="width:48px;height:48px;margin:0 auto 12px;background:var(--bg-glass);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--accent-1)"><i class="fas fa-crown"></i></div>
              <div style="font-weight:600;margin-bottom:2px;font-size:0.95rem">Premium Quality</div>
              <div style="font-size:0.8rem;color:var(--text-muted)">Curated 4K assets</div>
            </div>
            <div style="text-align:center;padding:24px 16px;border-right:1px solid var(--border-color)">
              <div style="width:48px;height:48px;margin:0 auto 12px;background:var(--bg-glass);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--accent-1)"><i class="fas fa-undo-alt"></i></div>
              <div style="font-weight:600;margin-bottom:2px;font-size:0.95rem">Easy Refunds</div>
              <div style="font-size:0.8rem;color:var(--text-muted)">14-day satisfaction</div>
            </div>
            <div style="text-align:center;padding:24px 16px">
              <div style="width:48px;height:48px;margin:0 auto 12px;background:var(--bg-glass);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--accent-1)"><i class="fas fa-headset"></i></div>
              <div style="font-weight:600;margin-bottom:2px;font-size:0.95rem">24/7 Support</div>
              <div style="font-size:0.8rem;color:var(--text-muted)">Dedicated team</div>
            </div>
          </div>
        </div>

        <!-- Featured Video/Animation Products -->
        <section class="section featured-section" style="padding:80px 24px;max-width:1280px;margin:0 auto">
          <div class="section-header" style="text-align:center;margin-bottom:48px">
            <div class="section-label" style="display:inline-block;padding:6px 16px;background:rgba(46,204,113,0.1);color:var(--accent-1);border-radius:var(--radius-full);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Featured Assets</div>
            <h2 class="section-title" style="font-size:2.5rem;font-weight:800;margin-bottom:12px;font-family:var(--font-display)">
              Premium <span class="text-gradient">Animation</span> Assets
            </h2>
            <p class="section-subtitle" style="color:var(--text-secondary);font-size:1.05rem;max-width:600px;margin:0 auto">
              Handpicked motion graphics, video templates, and design resources for creators
            </p>
          </div>
          <div class="product-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px">
            ${featuredProducts.slice(0, 8).map((p, i) => Components.productCard(p, i)).join('')}
          </div>
          <div style="text-align:center;margin-top:40px">
            <a href="#/shop" class="btn btn-primary btn-lg" style="display:inline-flex;align-items:center;gap:8px;padding:18px 36px;border-radius:var(--radius-md);font-weight:600;font-size:1rem;background:var(--accent-gradient);color:white;box-shadow:var(--shadow-glow)">
              <i class="fas fa-eye"></i> Browse All Assets
            </a>
          </div>
        </section>

        <!-- Categories - Glass Grid -->
        <section class="section" style="padding:80px 24px;max-width:1280px;margin:0 auto">
          <div class="section-header" style="text-align:center;margin-bottom:48px">
            <div class="section-label" style="display:inline-block;padding:6px 16px;background:rgba(46,204,113,0.1);color:var(--accent-1);border-radius:var(--radius-full);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Categories</div>
            <h2 class="section-title" style="font-size:2.5rem;font-weight:800;margin-bottom:12px;font-family:var(--font-display)">
              Browse by <span class="text-gradient">Category</span>
            </h2>
            <p class="section-subtitle" style="color:var(--text-secondary);font-size:1.05rem;max-width:600px;margin:0 auto">
              Explore our curated collection of premium creative resources
            </p>
          </div>
          <div class="categories-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px">
            ${categories.map((c, i) => Components.categoryCard(c, i)).join('')}
          </div>
        </section>

        <!-- Category Showcases -->
        ${Object.entries(categoryProducts).filter(([_, products]) => products.length > 0).map(([slug, products], ci) => `
          <section class="section" style="padding:80px 24px;max-width:1280px;margin:0 auto">
            <div class="section-header" style="text-align:center;margin-bottom:48px">
              <div class="section-label" style="display:inline-block;padding:6px 16px;background:rgba(46,204,113,0.1);color:var(--accent-1);border-radius:var(--radius-full);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">${products[0]?.category_name || slug}</div>
              <h2 class="section-title" style="font-size:2.5rem;font-weight:800;margin-bottom:12px;font-family:var(--font-display)">
                ${products[0]?.category_name || slug} <span class="text-gradient">Collection</span>
              </h2>
            </div>
            <div class="product-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px">
              ${products.map((p, i) => Components.productCard(p, i)).join('')}
            </div>
            <div style="text-align:center;margin-top:40px">
              <a href="#/shop?category=${slug}" class="btn btn-secondary" style="display:inline-flex;align-items:center;gap:8px;padding:14px 28px;border-radius:var(--radius-md);font-weight:600;font-size:0.9rem;background:var(--bg-glass);color:var(--text-primary);border:1px solid var(--border-color)">
                <i class="fas fa-arrow-right"></i> View All ${products[0]?.category_name || slug}
              </a>
            </div>
          </section>
        `).join('')}

        <!-- Newsletter Section - Forest Green Gradient -->
        <section style="padding:100px 24px;text-align:center;position:relative;overflow:hidden;background:var(--forest-gradient)">
          <div style="position:absolute;width:400px;height:400px;border-radius:50%;background:rgba(255,255,255,0.04);top:-120px;right:-60px"></div>
          <div style="position:absolute;width:250px;height:250px;border-radius:50%;background:rgba(255,255,255,0.04);bottom:-60px;left:-60px"></div>
          <div style="max-width:600px;margin:0 auto;position:relative;z-index:1">
            <div style="font-size:3rem;margin-bottom:16px">🎬</div>
            <h2 style="font-size:2.4rem;font-weight:800;color:white;margin-bottom:12px;font-family:var(--font-display)">
              Join the Pixab<span style="opacity:0.7">Animation</span> Community
            </h2>
            <p style="color:rgba(255,255,255,0.8);margin-bottom:28px;font-size:1.05rem">
              Get early access to new releases, exclusive discounts, and creative inspiration delivered to your inbox.
            </p>
            <div style="display:flex;gap:10px;max-width:480px;margin:0 auto">
              <input type="email" placeholder="Enter your email" id="newsletterEmail" 
                     style="flex:1;padding:16px 20px;border-radius:var(--radius-md);border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.1);color:white;font-size:1rem;outline:none;font-family:var(--font-primary)">
              <button onclick="App.subscribeNewsletter(event)" 
                      style="padding:16px 32px;background:white;color:var(--accent-1);border-radius:var(--radius-md);font-weight:700;font-size:1rem;cursor:pointer;border:none;transition:var(--transition-normal);white-space:nowrap">
                Subscribe <i class="fas fa-arrow-right"></i>
              </button>
            </div>
            <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin-top:12px">
              No spam. Unsubscribe anytime. Join 10,000+ creators.
            </p>
          </div>
        </section>

        <!-- Testimonial / Trust Bar -->
        <section style="padding:60px 24px;max-width:1280px;margin:0 auto;text-align:center">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px">
            <div class="glass" style="padding:32px 24px;text-align:center">
              <div style="font-size:2rem;margin-bottom:12px">⭐⭐⭐⭐⭐</div>
              <p style="color:var(--text-secondary);font-size:0.9rem;font-style:italic;line-height:1.6">
                "The 4K nature reel is absolutely stunning. Best investment for my video projects!"
              </p>
              <div style="margin-top:12px;font-weight:600;font-size:0.85rem">— Sarah M., Video Editor</div>
            </div>
            <div class="glass" style="padding:32px 24px;text-align:center">
              <div style="font-size:2rem;margin-bottom:12px">⭐⭐⭐⭐⭐</div>
              <p style="color:var(--text-secondary);font-size:0.9rem;font-style:italic;line-height:1.6">
                "PixabAnimation has the best motion graphics templates. My workflow has never been smoother."
              </p>
              <div style="margin-top:12px;font-weight:600;font-size:0.85rem">— Alex K., Motion Designer</div>
            </div>
            <div class="glass" style="padding:32px 24px;text-align:center">
              <div style="font-size:2rem;margin-bottom:12px">⭐⭐⭐⭐⭐</div>
              <p style="color:var(--text-secondary);font-size:0.9rem;font-style:italic;line-height:1.6">
                "Instant download, incredible quality. My go-to marketplace for animation assets."
              </p>
              <div style="margin-top:12px;font-weight:600;font-size:0.85rem">— Priya R., Content Creator</div>
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
