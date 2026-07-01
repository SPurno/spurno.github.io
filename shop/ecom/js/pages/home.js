// ============================================
// PixabAnimation — Home Page
// Professional Gorgeous Design
// ============================================

const HomePage = {
  async render(params) {
    const content = document.getElementById('pageContent');
    
    content.innerHTML = `
      <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-content">
          <div class="hero-text">
            <div class="skeleton" style="width:160px;height:34px;border-radius:20px;margin-bottom:24px"></div>
            <div class="skeleton" style="width:90%;height:72px;margin-bottom:16px;border-radius:8px"></div>
            <div class="skeleton" style="width:75%;height:24px;margin-bottom:8px;border-radius:6px"></div>
            <div class="skeleton" style="width:60%;height:24px;margin-bottom:32px;border-radius:6px"></div>
            <div class="skeleton" style="width:240px;height:56px;border-radius:12px"></div>
          </div>
          <div class="skeleton" style="width:100%;aspect-ratio:16/10;border-radius:24px"></div>
        </div>
      </section>
    `;

    try {
      const [featuredProducts, categories] = await Promise.all([
        DB.getFeaturedProducts(),
        DB.getCategories()
      ]);

      // Get products for top categories
      const categoryProducts = {};
      const featuredSlugs = ['videos'];
      for (const slug of featuredSlugs) {
        try {
          categoryProducts[slug] = await DB.getProductsByCategory(slug, 8);
        } catch(e) {
          categoryProducts[slug] = [];
        }
      }

      const videoProducts = categoryProducts['videos'] || [];
      const allProducts = featuredProducts.length > 0 ? featuredProducts : videoProducts.slice(0, 8);

      content.innerHTML = `
        <!-- ============================================ -->
        <!-- HERO — Cinematic Full-Screen                   -->
        <!-- ============================================ -->
        <section class="hero" style="min-height:100vh;padding:140px 24px 80px;position:relative;overflow:hidden">
          <!-- Animated gradient orbs -->
          <div style="position:absolute;inset:0;background:var(--navy-gradient);opacity:0.4;z-index:0"></div>
          <div style="position:absolute;inset:0;overflow:hidden;z-index:0">
            <div style="position:absolute;width:700px;height:700px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,0.12),transparent 70%);top:-200px;right:-100px;animation:float 14s ease-in-out infinite"></div>
            <div style="position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,0.1),transparent 70%);bottom:-150px;left:-80px;animation:float 12s ease-in-out infinite reverse"></div>
            <div style="position:absolute;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,0.06),transparent 70%);top:30%;left:40%;animation:float 16s ease-in-out infinite 3s"></div>
          </div>

          <!-- Subtle grid overlay -->
          <div style="position:absolute;inset:0;z-index:0;opacity:0.03;background-image:linear-gradient(rgba(59,130,246,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.3) 1px,transparent 1px);background-size:60px 60px"></div>

          <div class="hero-content" style="position:relative;z-index:1;max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center">
            <div class="hero-text" style="animation:fadeInUp 0.8s ease-out">
              <div style="display:inline-flex;align-items:center;gap:10px;padding:8px 20px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);border-radius:100px;font-size:0.78rem;font-weight:500;color:var(--accent-1);margin-bottom:28px;letter-spacing:0.3px">
                <span style="width:7px;height:7px;border-radius:50%;background:var(--accent-1);box-shadow:0 0 6px rgba(59,130,246,0.6);animation:pulse 2s infinite"></span>
                New — 2026 Animation Collection
              </div>
              
              <h1 style="font-size:clamp(2.4rem,5vw,4rem);font-weight:800;line-height:1.08;margin-bottom:20px;font-family:var(--font-display);letter-spacing:-0.02em">
                Premium Animation<br>
                <span class="text-gradient">Assets for Creators</span>
              </h1>
              
              <p style="color:var(--text-secondary);font-size:clamp(1rem,1.2vw,1.15rem);line-height:1.8;margin-bottom:36px;max-width:520px">
                Elevate your projects with cinema-grade 4K video clips, motion graphics packs, 
                logo reveals, typography animations, and professional editing templates. 
                Used by top creators in 50+ countries.
              </p>
              
              <div style="display:flex;gap:14px;flex-wrap:wrap">
                <a href="#/shop" class="btn btn-primary btn-lg" style="display:inline-flex;align-items:center;gap:10px;padding:18px 40px;border-radius:12px;font-weight:600;font-size:1rem;background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:white;box-shadow:0 4px 24px rgba(59,130,246,0.35);transition:all 0.3s ease">
                  <i class="fas fa-play"></i> Browse Assets
                  <i class="fas fa-arrow-right" style="font-size:0.8rem;opacity:0.7"></i>
                </a>
                <a href="#/shop?category=videos" class="btn btn-secondary btn-lg" style="display:inline-flex;align-items:center;gap:8px;padding:18px 36px;border-radius:12px;font-weight:600;font-size:1rem;background:rgba(255,255,255,0.05);color:var(--text-primary);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(10px)">
                  <i class="fas fa-video"></i> Watch Demo
                </a>
              </div>

              <div style="display:flex;gap:48px;margin-top:48px;padding-top:32px;border-top:1px solid rgba(255,255,255,0.06)">
                <div>
                  <div style="font-size:1.8rem;font-weight:800;background:linear-gradient(135deg,#3b82f6,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">500+</div>
                  <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;letter-spacing:0.3px">Premium Assets</div>
                </div>
                <div>
                  <div style="font-size:1.8rem;font-weight:800;background:linear-gradient(135deg,#3b82f6,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">10K+</div>
                  <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;letter-spacing:0.3px">Happy Creators</div>
                </div>
                <div>
                  <div style="font-size:1.8rem;font-weight:800;background:linear-gradient(135deg,#3b82f6,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">4K</div>
                  <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;letter-spacing:0.3px">Ultra HD Quality</div>
                </div>
              </div>
            </div>

            <div class="hero-image" style="position:relative;animation:fadeInUp 0.8s ease-out 0.2s both">
              <!-- Main showcase image with glass card overlay -->
              <div style="position:relative;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.4);background:var(--bg-secondary)">
                <img src="https://images.unsplash.com/photo-1536240478700-b869070f9279?w=700&q=80" 
                     alt="PixabAnimation showcase" loading="eager" 
                     style="width:100%;display:block;aspect-ratio:16/10;object-fit:cover">
                <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(59,130,246,0.06),transparent 50%)"></div>
                
                <!-- Play button overlay -->
                <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;background:rgba(59,130,246,0.9);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(59,130,246,0.4);backdrop-filter:blur(4px)">
                  <i class="fas fa-play" style="color:white;font-size:1.2rem;margin-left:3px"></i>
                </div>
              </div>

              <!-- Floating card 1 -->
              <div style="position:absolute;top:-12px;right:-12px;padding:14px 18px;display:flex;align-items:center;gap:10px;background:rgba(22,34,64,0.8);backdrop-filter:blur(16px);border:1px solid rgba(59,130,246,0.15);border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.2);animation:float 7s ease-in-out infinite">
                <span style="font-size:1.3rem">🎬</span>
                <div>
                  <div style="font-weight:600;font-size:0.85rem;color:var(--text-primary)">4K Ultra HD</div>
                  <div style="font-size:0.7rem;color:var(--text-muted)">Cinematic Quality</div>
                </div>
              </div>

              <!-- Floating card 2 -->
              <div style="position:absolute;bottom:-12px;left:-12px;padding:14px 18px;display:flex;align-items:center;gap:10px;background:rgba(22,34,64,0.8);backdrop-filter:blur(16px);border:1px solid rgba(59,130,246,0.15);border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.2);animation:float 7s ease-in-out infinite 3.5s">
                <span style="font-size:1.3rem">⚡</span>
                <div>
                  <div style="font-weight:600;font-size:0.85rem;color:var(--text-primary)">Instant Download</div>
                  <div style="font-size:0.7rem;color:var(--text-muted)">After Purchase</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================ -->
        <!-- TRUST BAR — Glassmorphism Stats Row            -->
        <!-- ============================================ -->
        <div style="max-width:1280px;margin:-32px auto 0;padding:0 24px;position:relative;z-index:3">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);background:rgba(22,34,64,0.7);backdrop-filter:blur(20px);border:1px solid rgba(59,130,246,0.1);border-radius:20px;padding:4px;box-shadow:0 8px 40px rgba(0,0,0,0.15)">
            <div style="text-align:center;padding:28px 16px;border-right:1px solid rgba(255,255,255,0.04)">
              <div style="width:44px;height:44px;margin:0 auto 10px;background:rgba(59,130,246,0.08);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:var(--accent-1)"><i class="fas fa-cloud-download-alt"></i></div>
              <div style="font-weight:600;font-size:0.9rem;color:var(--text-primary)">Instant Download</div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">Access immediately</div>
            </div>
            <div style="text-align:center;padding:28px 16px;border-right:1px solid rgba(255,255,255,0.04)">
              <div style="width:44px;height:44px;margin:0 auto 10px;background:rgba(59,130,246,0.08);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:var(--accent-1)"><i class="fas fa-crown"></i></div>
              <div style="font-weight:600;font-size:0.9rem;color:var(--text-primary)">Premium Quality</div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">Hand-curated assets</div>
            </div>
            <div style="text-align:center;padding:28px 16px;border-right:1px solid rgba(255,255,255,0.04)">
              <div style="width:44px;height:44px;margin:0 auto 10px;background:rgba(59,130,246,0.08);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:var(--accent-1)"><i class="fas fa-undo-alt"></i></div>
              <div style="font-weight:600;font-size:0.9rem;color:var(--text-primary)">14-Day Guarantee</div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">Satisfaction assured</div>
            </div>
            <div style="text-align:center;padding:28px 16px">
              <div style="width:44px;height:44px;margin:0 auto 10px;background:rgba(59,130,246,0.08);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;color:var(--accent-1)"><i class="fas fa-headset"></i></div>
              <div style="font-weight:600;font-size:0.9rem;color:var(--text-primary)">24/7 Support</div>
              <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">We're here to help</div>
            </div>
          </div>
        </div>

        <!-- ============================================ -->
        <!-- FEATURED PRODUCTS — Animation Video Grid      -->
        <!-- ============================================ -->
        <section style="padding:100px 24px;max-width:1280px;margin:0 auto">
          <div style="text-align:center;margin-bottom:52px">
            <div style="display:inline-block;padding:6px 18px;background:rgba(59,130,246,0.08);color:var(--accent-1);border-radius:100px;font-size:0.78rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">Featured Collection</div>
            <h2 style="font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;margin-bottom:14px;font-family:var(--font-display);letter-spacing:-0.01em">
              Top <span class="text-gradient">Animation</span> Assets
            </h2>
            <p style="color:var(--text-secondary);font-size:1.05rem;max-width:560px;margin:0 auto;line-height:1.7">
              Handpicked premium video clips, motion graphics, and templates — 
              chosen for quality, creativity, and production value.
            </p>
          </div>
          <div class="product-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:24px">
            ${allProducts.slice(0, 8).map((p, i) => Components.productCard(p, i)).join('')}
          </div>
          <div style="text-align:center;margin-top:44px">
            <a href="#/shop" class="btn btn-primary btn-lg" style="display:inline-flex;align-items:center;gap:10px;padding:16px 36px;border-radius:12px;font-weight:600;font-size:0.95rem;background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:white;box-shadow:0 4px 24px rgba(59,130,246,0.3)">
              <i class="fas fa-eye"></i> View Full Catalog
              <i class="fas fa-arrow-right" style="font-size:0.8rem"></i>
            </a>
          </div>
        </section>

        <!-- ============================================ -->
        <!-- CATEGORIES — Glass Grid                       -->
        <!-- ============================================ -->
        <section style="padding:80px 24px;max-width:1280px;margin:0 auto">
          <div style="text-align:center;margin-bottom:48px">
            <div style="display:inline-block;padding:6px 18px;background:rgba(59,130,246,0.08);color:var(--accent-1);border-radius:100px;font-size:0.78rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">Browse By</div>
            <h2 style="font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;margin-bottom:14px;font-family:var(--font-display);letter-spacing:-0.01em">
              Explore <span class="text-gradient">Categories</span>
            </h2>
          </div>
          <div class="categories-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px">
            ${categories.map((c, i) => Components.categoryCard(c, i)).join('')}
          </div>
        </section>

        <!-- ============================================ -->
        <!-- WHY PIXABANIMATION — Value Props              -->
        <!-- ============================================ -->
        <section style="padding:100px 24px;background:var(--bg-secondary)">
          <div style="max-width:1280px;margin:0 auto">
            <div style="text-align:center;margin-bottom:52px">
              <div style="display:inline-block;padding:6px 18px;background:rgba(59,130,246,0.08);color:var(--accent-1);border-radius:100px;font-size:0.78rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">Why Us</div>
              <h2 style="font-size:clamp(1.8rem,3vw,2.6rem);font-weight:800;margin-bottom:14px;font-family:var(--font-display);letter-spacing:-0.01em">
                Built for <span class="text-gradient">Creators</span>
              </h2>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px">
              <div style="padding:36px 28px;background:rgba(22,34,64,0.5);border:1px solid rgba(59,130,246,0.08);border-radius:16px;transition:all 0.3s ease">
                <div style="width:52px;height:52px;background:rgba(59,130,246,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:var(--accent-1);margin-bottom:20px"><i class="fas fa-film"></i></div>
                <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:8px">Cinema-Grade Quality</h3>
                <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.7">Every asset is shot or rendered in true 4K resolution. No compression artifacts, no compromises — just stunning visual fidelity.</p>
              </div>
              <div style="padding:36px 28px;background:rgba(22,34,64,0.5);border:1px solid rgba(59,130,246,0.08);border-radius:16px;transition:all 0.3s ease">
                <div style="width:52px;height:52px;background:rgba(59,130,246,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:var(--accent-1);margin-bottom:20px"><i class="fas fa-bolt"></i></div>
                <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:8px">Instant Access</h3>
                <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.7">Download your purchases immediately in full resolution. No watermarks, no queues. Start creating the moment you buy.</p>
              </div>
              <div style="padding:36px 28px;background:rgba(22,34,64,0.5);border:1px solid rgba(59,130,246,0.08);border-radius:16px;transition:all 0.3s ease">
                <div style="width:52px;height:52px;background:rgba(59,130,246,0.1);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;color:var(--accent-1);margin-bottom:20px"><i class="fas fa-layer-group"></i></div>
                <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:8px">Editor-Friendly</h3>
                <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.7">Compatible with Premiere Pro, After Effects, Final Cut Pro, DaVinci Resolve, and more. Professional formats out of the box.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================ -->
        <!-- NEWSLETTER — Navy Gradient CTA                -->
        <!-- ============================================ -->
        <section style="padding:100px 24px;text-align:center;position:relative;overflow:hidden;background:var(--navy-gradient)">
          <div style="position:absolute;width:500px;height:500px;border-radius:50%;background:rgba(255,255,255,0.03);top:-150px;right:-80px"></div>
          <div style="position:absolute;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,0.03);bottom:-80px;left:-60px"></div>
          <div style="max-width:580px;margin:0 auto;position:relative;z-index:1">
            <div style="font-size:2.4rem;margin-bottom:16px;opacity:0.9">✧</div>
            <h2 style="font-size:clamp(1.6rem,2.8vw,2.2rem);font-weight:800;color:white;margin-bottom:10px;font-family:var(--font-display);letter-spacing:-0.01em">
              Join the PixabAnimation Community
            </h2>
            <p style="color:rgba(255,255,255,0.7);margin-bottom:28px;font-size:1rem;line-height:1.7;max-width:460px;margin-left:auto;margin-right:auto">
              Get early access to new releases, subscriber-only discounts, and creative inspiration delivered to your inbox every week.
            </p>
            <div style="display:flex;gap:10px;max-width:460px;margin:0 auto">
              <input type="email" placeholder="Enter your email address" id="newsletterEmail" 
                     style="flex:1;padding:16px 20px;border-radius:12px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.08);color:white;font-size:0.95rem;outline:none;font-family:var(--font-primary);transition:all 0.3s ease">
              <button onclick="App.subscribeNewsletter(event)" 
                      style="padding:16px 32px;background:white;color:#1d4ed8;border-radius:12px;font-weight:700;font-size:0.95rem;cursor:pointer;border:none;transition:all 0.3s ease;white-space:nowrap">
                Subscribe <i class="fas fa-arrow-right" style="margin-left:4px;font-size:0.8rem"></i>
              </button>
            </div>
            <p style="color:rgba(255,255,255,0.35);font-size:0.78rem;margin-top:14px;letter-spacing:0.3px">
              No spam. Unsubscribe anytime. Join 10,000+ fellow creators.
            </p>
          </div>
        </section>

        <!-- ============================================ -->
        <!-- TESTIMONIALS                                  -->
        <!-- ============================================ -->
        <section style="padding:80px 24px 100px;max-width:1280px;margin:0 auto">
          <div style="text-align:center;margin-bottom:44px">
            <div style="display:inline-block;padding:6px 18px;background:rgba(59,130,246,0.08);color:var(--accent-1);border-radius:100px;font-size:0.78rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">Testimonials</div>
            <h2 style="font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:800;font-family:var(--font-display);letter-spacing:-0.01em">
              Loved by <span class="text-gradient">Creators</span> Worldwide
            </h2>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px">
            <div style="padding:32px 28px;background:rgba(22,34,64,0.4);border:1px solid rgba(59,130,246,0.06);border-radius:16px">
              <div style="font-size:1.1rem;margin-bottom:14px;letter-spacing:2px">★★★★★</div>
              <p style="color:var(--text-secondary);font-size:0.9rem;font-style:italic;line-height:1.7;margin-bottom:16px">
                "The 4K nature reel is absolutely stunning. Best investment I've made for my video projects — the quality speaks for itself."
              </p>
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:white">SM</div>
                <div>
                  <div style="font-weight:600;font-size:0.85rem">Sarah M.</div>
                  <div style="font-size:0.72rem;color:var(--text-muted)">Video Editor</div>
                </div>
              </div>
            </div>
            <div style="padding:32px 28px;background:rgba(22,34,64,0.4);border:1px solid rgba(59,130,246,0.06);border-radius:16px">
              <div style="font-size:1.1rem;margin-bottom:14px;letter-spacing:2px">★★★★★</div>
              <p style="color:var(--text-secondary);font-size:0.9rem;font-style:italic;line-height:1.7;margin-bottom:16px">
                "PixabAnimation has the best motion graphics templates. My workflow has never been smoother. The drag-and-drop compatibility is a game-changer."
              </p>
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:white">AK</div>
                <div>
                  <div style="font-weight:600;font-size:0.85rem">Alex K.</div>
                  <div style="font-size:0.72rem;color:var(--text-muted)">Motion Designer</div>
                </div>
              </div>
            </div>
            <div style="padding:32px 28px;background:rgba(22,34,64,0.4);border:1px solid rgba(59,130,246,0.06);border-radius:16px">
              <div style="font-size:1.1rem;margin-bottom:14px;letter-spacing:2px">★★★★★</div>
              <p style="color:var(--text-secondary);font-size:0.9rem;font-style:italic;line-height:1.7;margin-bottom:16px">
                "Instant download, incredible quality, and the lower thirds bundle saved me hours. My go-to marketplace for animation assets."
              </p>
              <div style="display:flex;align-items:center;gap:10px">
                <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);display:flex;align-items:center;justify-content:center;font-size:0.85rem;font-weight:700;color:white">PR</div>
                <div>
                  <div style="font-weight:600;font-size:0.85rem">Priya R.</div>
                  <div style="font-size:0.72rem;color:var(--text-muted)">Content Creator</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;

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
