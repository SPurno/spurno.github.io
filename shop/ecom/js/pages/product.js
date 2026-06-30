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
      const isVideo = product.media_type === 'video';
      const images = JSON.parse(product.images || '[]');
      const allImages = [product.image_url, ...images.filter(i => i !== product.image_url)];
      const hasDiscount = product.compare_price && product.compare_price > product.price;

      const formatDuration = (seconds) => {
        if (!seconds) return '';
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
      };

      content.innerHTML = `
        <div class="product-detail page-enter">
          <div class="product-images">
            ${isVideo ? `
            <div class="product-main-image" style="background:#000;border-radius:var(--radius-md);overflow:hidden;position:relative">
              ${product.preview_url ? `
              <video class="video-preview-player" controls preload="metadata" poster="${product.image_url}"
                     style="width:100%;height:100%;object-fit:contain;max-height:500px;display:block">
                <source src="${product.preview_url}" type="video/mp4">
                Your browser does not support the video tag.
              </video>` : `
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:350px;gap:16px;color:var(--text-muted)">
                <i class="fas fa-film" style="font-size:4rem;opacity:0.3"></i>
                <span>Preview video not available</span>
              </div>`}
              ${product.duration ? `
              <div style="position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,0.8);color:#fff;padding:4px 10px;border-radius:var(--radius-sm);font-size:0.8rem">
                <i class="fas fa-clock"></i> ${formatDuration(product.duration)}
              </div>` : ''}
            </div>
            ` : `
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
            </div>` : ''}`}
          </div>
          <div class="product-info">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              <span class="product-card-category" style="font-size:0.85rem">
                ${product.category_name || 'General'}
              </span>
              ${isVideo ? '<span style="font-size:0.75rem;padding:2px 8px;border-radius:var(--radius-full);background:rgba(108,99,255,0.15);color:var(--accent-1)">🎬 Video</span>' : ''}
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
                ${product.stock > 0 ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <div class="product-price-detail">
              <span class="current-price text-gradient">$${parseFloat(product.price).toFixed(2)}</span>
              ${hasDiscount ? `<span class="compare-price">$${parseFloat(product.compare_price).toFixed(2)}</span>` : ''}
              ${hasDiscount ? `<span class="badge-sale product-card-badge" style="position:static;display:inline-block">
                -${Math.round((1 - product.price / product.compare_price) * 100)}%</span>` : ''}
            </div>
            <p class="product-description">${product.description}</p>

            ${isVideo && product.file_size ? `
            <div style="display:flex;gap:16px;margin:16px 0;padding:12px 16px;background:var(--bg-input);border-radius:var(--radius-sm)">
              <div style="text-align:center;flex:1">
                <div style="font-size:1.2rem">🎬</div>
                <div style="font-weight:600;font-size:0.9rem">${product.file_size}GB</div>
                <div style="font-size:0.75rem;color:var(--text-muted)">File Size</div>
              </div>
              ${product.duration ? `
              <div style="text-align:center;flex:1">
                <div style="font-size:1.2rem">⏱️</div>
                <div style="font-weight:600;font-size:0.9rem">${formatDuration(product.duration)}</div>
                <div style="font-size:0.75rem;color:var(--text-muted)">Duration</div>
              </div>` : ''}
              <div style="text-align:center;flex:1">
                <div style="font-size:1.2rem">📥</div>
                <div style="font-weight:600;font-size:0.9rem">Instant</div>
                <div style="font-size:0.75rem;color:var(--text-muted)">Download</div>
              </div>
            </div>` : ''}

            ${isVideo && product.preview_description ? `
            <div style="margin:16px 0;padding:16px;background:var(--bg-input);border-left:3px solid var(--accent-1);border-radius:var(--radius-sm)">
              <div style="font-weight:600;font-size:0.85rem;margin-bottom:6px;color:var(--accent-1)">
                <i class="fas fa-eye"></i> Preview
              </div>
              <p style="font-size:0.9rem;color:var(--text-secondary);margin:0">${product.preview_description}</p>
            </div>` : ''}
            
            <div class="product-actions">
              ${isVideo ? `
              <button class="btn btn-primary btn-lg" onclick="ProductPage.addToCart()" style="flex:1">
                <i class="fas fa-download"></i> Purchase & Download
              </button>
              ` : `
              <div class="quantity-selector">
                <button onclick="ProductPage.changeQty(-1)">−</button>
                <span id="productQty">1</span>
                <button onclick="ProductPage.changeQty(1)">+</button>
              </div>
              <button class="btn btn-primary btn-lg" onclick="ProductPage.addToCart()" ${product.stock <= 0 ? 'disabled' : ''}>
                <i class="fas fa-shopping-bag"></i> Add to Cart
              </button>`}
              <button class="btn btn-secondary btn-icon btn-lg" onclick="App.toggleWishlistById(${product.id})" 
                      style="width:56px;height:56px;font-size:1.3rem" id="wishlistBtn">
                <i class="fas fa-heart" style="color:${isInWishlist ? 'var(--error)' : 'inherit'}"></i>
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
                ${product.stock > 0 ? 'Digital download' : 'Unavailable'}
              </div>
              <div class="product-info-item">
                <strong>Delivery</strong>
                ${isVideo ? 'Instant download after purchase' : 'Free shipping available'}
              </div>
            </div>

            ${!isVideo ? `
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
            </div>` : `
            <div style="display:flex;gap:16px;margin-top:24px">
              <i class="fas fa-download" style="color:var(--accent-1)"></i>
              <div>
                <strong>Instant Download</strong>
                <div style="font-size:0.85rem;color:var(--text-muted)">Access your video immediately after purchase</div>
              </div>
            </div>
            <div style="display:flex;gap:16px;margin-top:12px">
              <i class="fas fa-shield-alt" style="color:var(--accent-1)"></i>
              <div>
                <strong>Secure Access</strong>
                <div style="font-size:0.85rem;color:var(--text-muted)">High-quality 4K video with watermark protection</div>
              </div>
            </div>`}
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
