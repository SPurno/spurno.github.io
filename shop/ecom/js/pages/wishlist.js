// ============================================
// ShopVerse — Wishlist Page
// ============================================

const WishlistPage = {
  async render() {
    const content = document.getElementById('pageContent');

    content.innerHTML = `
      <div class="wishlist-page page-enter">
        <h1><i class="fas fa-heart" style="color:var(--error)"></i> Your Wishlist</h1>
        <div id="wishlistContent">
          <div style="text-align:center;padding:40px">
            <div class="loader-spinner"></div>
          </div>
        </div>
      </div>
    `;

    await this.loadWishlist();
  },

  async loadWishlist() {
    const container = document.getElementById('wishlistContent');

    try {
      const items = await DB.getWishlist();

      if (items.length === 0) {
        container.innerHTML = Components.emptyState(
          '💔',
          'Your wishlist is empty',
          'Save items you love to your wishlist and find them here.',
          'Explore Products',
          '#/shop'
        );
        return;
      }

      container.innerHTML = `
        <div class="product-grid">
          ${items.map((item, i) => `
            <div class="product-card stagger-${(i % 6) + 1}">
              <div class="product-card-image" onclick="Router.navigate('#/product/${item.slug}')">
                <img src="${item.image_url}" alt="${item.name}" loading="lazy">
                <button class="product-card-wishlist active" onclick="App.toggleWishlist(${item.product_id}, this)" 
                        data-product-id="${item.product_id}" aria-label="Remove from wishlist">
                  <i class="fas fa-heart" style="color:var(--error)"></i>
                </button>
              </div>
              <div class="product-card-body" onclick="Router.navigate('#/product/${item.slug}')">
                <h3 class="product-card-title">${item.name}</h3>
                <div class="product-card-price">
                  <span class="current-price">$${parseFloat(item.price).toFixed(2)}</span>
                  ${item.compare_price ? `<span class="compare-price">$${parseFloat(item.compare_price).toFixed(2)}</span>` : ''}
                </div>
              </div>
              <div class="product-card-footer">
                <button class="add-to-cart-btn" onclick="App.wishlistAddToCart(${item.product_id}, this)">
                  <i class="fas fa-shopping-bag"></i> Add to Cart
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } catch (error) {
      console.error('Wishlist error:', error);
      container.innerHTML = Components.emptyState('😔', 'Failed to load wishlist', error.message);
    }
  }
};
