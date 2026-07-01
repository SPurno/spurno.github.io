// ============================================
// PixabAnimation — About Page
// ============================================

const AboutPage = {
  render() {
    const content = document.getElementById('pageContent');

    content.innerHTML = `
      <div class="about-page page-enter">
        <div class="about-hero" style="text-align:center;padding:60px 24px;max-width:800px;margin:0 auto">
          <div class="section-label" style="display:inline-block;padding:6px 16px;background:rgba(59,130,246,0.1);color:var(--accent-1);border-radius:var(--radius-full);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px">Our Story</div>
          <h1 style="font-size:2.8rem;font-weight:800;font-family:var(--font-display);margin-bottom:16px">
            Where <span class="text-gradient">Creativity</span> Meets Motion
          </h1>
          <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.8">
            At PixabAnimation, we believe every creator deserves access to premium animation assets that bring their vision to life. 
            Founded in 2024, our marketplace curates the finest 4K video clips, motion graphics, design templates, and animation resources 
            from top artists around the world. From indie filmmakers to major production studios — we power the stories that move us.
          </p>
        </div>

        <div class="about-values" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;max-width:var(--max-width);margin:0 auto;padding:40px 24px">
          <div class="value-card glass" style="padding:32px;text-align:center">
            <div class="feature-icon" style="width:64px;height:64px;margin:0 auto 16px;background:var(--bg-glass);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.6rem;color:var(--accent-1);transition:var(--transition-normal)">
              <i class="fas fa-gem"></i>
            </div>
            <h3 style="margin-bottom:8px;font-size:1.1rem">Premium Quality</h3>
            <p style="color:var(--text-muted);font-size:0.9rem">Every asset is hand-curated and tested to ensure 4K resolution, professional-grade quality, and seamless integration with your workflow.</p>
          </div>
          <div class="value-card glass" style="padding:32px;text-align:center">
            <div class="feature-icon" style="width:64px;height:64px;margin:0 auto 16px;background:var(--bg-glass);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.6rem;color:var(--accent-1);transition:var(--transition-normal)">
              <i class="fas fa-leaf"></i>
            </div>
            <h3 style="margin-bottom:8px;font-size:1.1rem">Creator-First</h3>
            <p style="color:var(--text-muted);font-size:0.9rem">We partner with independent artists and studios worldwide, ensuring fair compensation and a diverse, ever-growing library of original content.</p>
          </div>
          <div class="value-card glass" style="padding:32px;text-align:center">
            <div class="feature-icon" style="width:64px;height:64px;margin:0 auto 16px;background:var(--bg-glass);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.6rem;color:var(--accent-1);transition:var(--transition-normal)">
              <i class="fas fa-rocket"></i>
            </div>
            <h3 style="margin-bottom:8px;font-size:1.1rem">Instant Access</h3>
            <p style="color:var(--text-muted);font-size:0.9rem">Download your purchases instantly in full resolution. No watermarks, no delays. Start creating the moment you buy.</p>
          </div>
          <div class="value-card glass" style="padding:32px;text-align:center">
            <div class="feature-icon" style="width:64px;height:64px;margin:0 auto 16px;background:var(--bg-glass);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:1.6rem;color:var(--accent-1);transition:var(--transition-normal)">
              <i class="fas fa-heart"></i>
            </div>
            <h3 style="margin-bottom:8px;font-size:1.1rem">Community Driven</h3>
            <p style="color:var(--text-muted);font-size:0.9rem">Join a thriving community of 10,000+ creators. Share your work, get inspired, and grow your craft with PixabAnimation.</p>
          </div>
        </div>

        <div style="max-width:var(--max-width);margin:40px auto;padding:0 24px">
          <div class="glass" style="padding:48px;text-align:center">
            <h2 style="font-size:1.8rem;font-weight:700;margin-bottom:16px;font-family:var(--font-display)">
              <span class="text-gradient">Numbers</span> Speak Louder
            </h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:32px;margin-top:32px">
              <div>
                <div style="font-size:2.5rem;font-weight:800;color:var(--accent-1)">10K+</div>
                <div style="color:var(--text-muted)">Happy Creators</div>
              </div>
              <div>
                <div style="font-size:2.5rem;font-weight:800;color:var(--accent-1)">500+</div>
                <div style="color:var(--text-muted)">Premium Assets</div>
              </div>
              <div>
                <div style="font-size:2.5rem;font-weight:800;color:var(--accent-1)">50+</div>
                <div style="color:var(--text-muted)">Artist Partners</div>
              </div>
              <div>
                <div style="font-size:2.5rem;font-weight:800;color:var(--accent-1)">4K</div>
                <div style="color:var(--text-muted)">Ultra HD Quality</div>
              </div>
            </div>
          </div>
        </div>

        <div style="max-width:var(--max-width);margin:40px auto;padding:0 24px 60px;text-align:center">
          <h2 style="font-size:1.6rem;font-weight:700;margin-bottom:16px">Ready to Elevate Your Creative Projects?</h2>
          <p style="color:var(--text-secondary);margin-bottom:24px">Join thousands of creators who trust PixabAnimation for their animation and design needs.</p>
          <a href="#/shop" class="btn btn-primary btn-lg" style="display:inline-flex;align-items:center;gap:8px;padding:18px 36px;border-radius:var(--radius-md);font-weight:600;font-size:1rem;background:var(--accent-gradient);color:white;box-shadow:var(--shadow-glow)">
            <i class="fas fa-store"></i> Explore Assets
          </a>
        </div>
      </div>
    `;
  }
};
