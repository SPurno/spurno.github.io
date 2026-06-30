// ============================================
// ShopVerse — Product Detail Page
// ============================================

const ProductPage = {
  async render(params) {
    const content = document.getElementById('pageContent');
    const slug = params.params.slug;

    content.innerHTML = `
      <div style="padding:40px 24px;max-width:var(--max-width);margin:0 auto">
        ${Components.loadingSkeleton(1)}
      </div>
    `;

    try {
      const product = await DB.getProduct(slug);
      if (!product) {
        content.innerHTML = Components.emptyState(
          '🔍', 'Product Not Found', 'The product you are looking for does not exist.',
          'Continue Shopping', '#/shop'
        );
        return;
      }

      const reviews = await DB.getProductReviews(product.id);
      const isInWishlist = await DB.isInWishlist(product.id);
      const images = JSON.parse(product.images || '[]');
      const allImages = [product.image_url, ...images.filter(i => i !== product.image_url)];
      const hasDiscount = product.compare_price && product.compare_price > product.price;

      content.innerHTML = `
        <div class="product-detail page-enter">
          <div class="product-images">
            <div class="product-main-image" id="mainImage">
              <img src="${allImages[0] || product.image_url}" alt="${product.name}">
            </div>
            ${allImages.length > 1 ? `
            <div class="product-thumbnails">
              ${allImages.map((img, i) => `
                <div class="product-thumbnail ${i === 0 ? 'active' : ''}" 
                     onclick="ProductPage.switchImage(this, '${img}')">
                  <img src="${img}" alt="${product.name}">
                </div>
              `).join('')}
            </div>` : ''}
          </div>
          <div class="product-info">
            <div class="product-card-category" style="margin-bottom:8px;font-size:0.85rem">
              ${product.category_name || 'General'}
            </div>
            <h1>${product.name}</h1>
            <div class="product-meta">
              <div class="stars" style="color:#ffc107;font-size:1.1rem">
                ${'★'.repeat(Math.round(product.rating || 0))}${'☆'.repeat(5 - Math.round(product.rating || 0))}
              </div>
              <span style="color:var(--text-muted)">(${product.reviews_count || 0} reviews)</span>
              <span style="color:var(--text-muted)">|</span>
              <span style="color:${product.stock > 0 ? 'var(--success)' : 'var(--error)'}">
                <i class="fas fa-${product.stock > 0 ? 'check-circle' : 'times-circle'}"></i>
                ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div class="product-price-detail">
              <span class="current-price text-gradient">$${parseFloat(product.price).toFixed(2)}</span>
              ${hasDiscount ? `<span class="compare-price">$${parseFloat(product.compare_price).toFixed(2)}</span>` : ''}
              ${hasDiscount ? `<span class="badge-sale product-card-badge" style="position:static;display:inline-block">
                -${Math.round((1 - product.price / product.compare_price) * 100)}%</span>` : ''}
            </div>
            <p class="product-description">${product.description}</p>
            
            <div class="product-actions">
              <div class="quantity-selector">
                <button onclick="ProductPage.changeQty(-1)">−</button>
                <span id="productQty">1</span>
                <button onclick="ProductPage.changeQty(1)">+</button>
              </div>
              <button class="btn btn-primary btn-lg" onclick="ProductPage.addToCart()" ${product.stock <= 0 ? 'disabled' : ''}>
                <i class="fas fa-shopping-bag"></i> Add to Cart
              </button>
              <button class="btn btn-secondary btn-icon btn-lg" onclick="App.toggleWishlistById(${product.id})" 
                      style="width:56px;height:56px;font-size:1.3rem" id="wishlistBtn">
                <i class="fas fa-${isInWishlist ? 'heart' : 'heart'}" style="color:${isInWishlist ? 'var(--error)' : 'inherit'}"></i>
              </button>
            </div>

            <div class="product-info-grid">
              <div class="product-info-item">
                <strong>Category</strong>
                <a href="#/shop?category=${product.category_slug || ''}" style="color:var(--accent-1)">
                  ${product.category_name || 'General'}
                </a>
              </div>
              <div class="product-info-item">
                <strong>SKU</strong>
                SKU-${String(product.id).padStart(4, '0')}
              </div>
              <div class="product-info-item">
                <strong>Availability</strong>
                ${product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>
              <div class="product-info-item">
                <strong>Shipping</strong>
                Free shipping available
              </div>
            </div>

            <div style="display:flex;gap:16px;margin-top:24px">
              <i class="fas fa-truck" style="color:var(--accent-1)"></i>
              <div>
                <strong>Free Delivery</strong>
                <div style="font-size:0.85rem;color:var(--text-muted)">Orders over $50 ship free</div>
              </div>
            </div>
            <div style="display:flex;gap:16px;margin-top:12px">
              <i class="fas fa-undo" style="color:var(--accent-1)"></i>
              <div>
                <strong>Easy Returns</strong>
                <div style="font-size:0.85rem;color:var(--text-muted)">30-day return policy</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews -->
        <div class="reviews-section page-enter">
          <h2>Customer Reviews (${reviews.length})</h2>
          ${reviews.length === 0 ? `
            <p style="color:var(--text-muted);margin-bottom:20px">No reviews yet. Be the first to review!</p>
          ` : reviews.map(r => Components.reviewCard(r)).join('')}
          
          <div style="margin-top:32px;padding:24px;background:var(--bg-card);border:1px solid var(--border-light);border-radius:var(--radius-md)">
            <h3 style="margin-bottom:16px">Write a Review</h3>
            <form onsubmit="ProductPage.submitReview(event, ${product.id})" style="display:flex;flex-direction:column;gap:12px">
              <div class="form-group">
                <label>Your Name</label>
                <input type="text" id="reviewName" placeholder="John Doe" required>
              </div>
              <div class="form-group">
                <label>Rating</label>
                <select id="reviewRating" required style="padding:12px 16px">
                  <option value="5">★★★★★ (5)</option>
                  <option value="4">★★★★☆ (4)</option>
                  <option value="3">★★★☆☆ (3)</option>
                  <option value="2">★★☆☆☆ (2)</option>
                  <option value="1">★☆☆☆☆ (1)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Comment</label>
                <textarea id="reviewComment" rows="3" placeholder="Share your experience..." style="resize:vertical"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Submit Review</button>
            </form>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Product page error:', error);
      content.innerHTML = Components.emptyState('😔', 'Failed to load product', error.message, 'Back to Shop', '#/shop');
    }
  },

  currentQty: 1,

  changeQty(delta) {
    this.currentQty = Math.max(1, Math.min(99, this.currentQty + delta));
    document.getElementById('productQty').textContent = this.currentQty;
  },

  async addToCart() {
    const slug = Router.currentRoute.split('/product/')[1];
    try {
      const product = await DB.getProduct(slug);
      if (product) {
        await DB.addToCart(product.id, this.currentQty);
        Components.toast(`${product.name} added to cart!`, 'success');
        App.updateCartBadge();
      }
    } catch (error) {
      Components.toast('Failed to add to cart', 'error');
    }
  },

  async submitReview(event, productId) {
    event.preventDefault();
    const name = document.getElementById('reviewName').value;
    const rating = parseInt(document.getElementById('reviewRating').value);
    const comment = document.getElementById('reviewComment').value;

    try {
      await DB.addReview(productId, name, rating, comment);
      Components.toast('Review submitted! Thank you.', 'success');
      event.target.reset();
    } catch (error) {
      Components.toast('Failed to submit review', 'error');
    }
  },

  switchImage(el, src) {
    document.querySelectorAll('.product-thumbnail').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.querySelector('#mainImage img').src = src;
  }
};
