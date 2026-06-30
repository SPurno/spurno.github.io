// ============================================
// ShopVerse — About Page
// ============================================

const AboutPage = {
  render() {
    const content = document.getElementById('pageContent');

    content.innerHTML = `
      <div class="about-page page-enter">
        <div class="about-hero">
          <div class="section-label" style="margin-bottom:16px">About Us</div>
          <h1>Our Story: <span class="text-gradient">Quality</span> Meets Innovation</h1>
          <p>
            At ShopVerse, we believe shopping should be an experience — not just a transaction. 
            Founded in 2024, we set out to create a curated marketplace that combines premium products 
            with exceptional service. Every item in our collection is handpicked for quality, 
            style, and value.
          </p>
        </div>

        <div class="about-values">
          <div class="value-card glass">
            <div class="feature-icon"><i class="fas fa-gem"></i></div>
            <h3>Premium Quality</h3>
            <p>We rigorously test every product to ensure it meets our high standards before it reaches your doorstep.</p>
          </div>
          <div class="value-card glass">
            <div class="feature-icon"><i class="fas fa-leaf"></i></div>
            <h3>Sustainable Practices</h3>
            <p>Committed to eco-friendly packaging and carbon-neutral shipping. We partner with brands that share our values.</p>
          </div>
          <div class="value-card glass">
            <div class="feature-icon"><i class="fas fa-heart"></i></div>
            <h3>Customer First</h3>
            <p>Your satisfaction is our priority. Our support team is available 24/7 to ensure your experience is seamless.</p>
          </div>
          <div class="value-card glass">
            <div class="feature-icon"><i class="fas fa-rocket"></i></div>
            <h3>Fast Delivery</h3>
            <p>Free shipping on orders over $50 with tracking on every order. Most deliveries arrive within 3-5 business days.</p>
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
                <div style="color:var(--text-muted)">Happy Customers</div>
              </div>
              <div>
                <div style="font-size:2.5rem;font-weight:800;color:var(--accent-1)">500+</div>
                <div style="color:var(--text-muted)">Products</div>
              </div>
              <div>
                <div style="font-size:2.5rem;font-weight:800;color:var(--accent-1)">50+</div>
                <div style="color:var(--text-muted)">Brand Partners</div>
              </div>
              <div>
                <div style="font-size:2.5rem;font-weight:800;color:var(--accent-1)">98%</div>
                <div style="color:var(--text-muted)">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div style="max-width:var(--max-width);margin:40px auto;padding:0 24px 60px;text-align:center">
          <h2 style="font-size:1.6rem;font-weight:700;margin-bottom:16px">Ready to Start Shopping?</h2>
          <p style="color:var(--text-secondary);margin-bottom:24px">Join thousands of happy customers who trust ShopVerse for their needs.</p>
          <a href="#/shop" class="btn btn-primary btn-lg">
            <i class="fas fa-store"></i> Explore Products
          </a>
        </div>
      </div>
    `;
  }
};
