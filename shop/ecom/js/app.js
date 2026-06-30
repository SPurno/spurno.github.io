// ============================================
// ShopVerse — Main Application Controller
// ============================================

const App = {
  async init() {
    console.log('🚀 ShopVerse initializing...');

    // Initialize database client (must run after the Turso module script)
    DB.init();

    // Register routes
    Router.register('/', (p) => HomePage.render(p));
    Router.register('/shop', (p) => ShopPage.render(p));
    Router.register('/product/:slug', (p) => ProductPage.render(p));
    Router.register('/cart', () => CartPage.render());
    Router.register('/checkout', () => CheckoutPage.render());
    Router.register('/login', (p) => AuthPage.render(p));
    Router.register('/register', (p) => AuthPage.render(p));
    Router.register('/profile', () => ProfilePage.render());
    Router.register('/wishlist', () => WishlistPage.render());
    Router.register('/contact', () => ContactPage.render());
    Router.register('/about', () => AboutPage.render());
    Router.register('/admin', () => AdminPage.render());

    // Setup UI
    this.setupNavigation();
    this.setupTheme();
    this.updateAuthUI();
    
    // Update badges
    await this.updateCartBadge();
    await this.updateWishlistBadge();

    // Start router
    Router.start();

    console.log('✅ ShopVerse ready!');
  },

  setupNavigation() {
    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    navToggle?.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close nav on link click
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', () => {
        navToggle?.classList.remove('active');
        navLinks?.classList.remove('active');
      });
    });

    // Search toggle & autocomplete
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const suggestionsEl = document.getElementById('searchSuggestions');

    let searchDebounceTimer = null;
    let searchResults = { products: [], categories: [] };
    this.searchHighlightIndex = -1;
    this.searchRequestId = 0;

    searchToggle?.addEventListener('click', () => {
      searchBar.classList.toggle('active');
      if (searchBar.classList.contains('active')) {
        setTimeout(() => searchInput?.focus(), 100);
        if (searchInput?.value.trim().length >= 1) {
          this.performSearch(searchInput.value.trim());
        }
      } else {
        this.closeSuggestions();
      }
    });

    searchClose?.addEventListener('click', () => {
      searchBar.classList.remove('active');
      this.closeSuggestions();
    });

    // Input handler with debounce
    searchInput?.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      clearTimeout(searchDebounceTimer);
      
      if (query.length < 1) {
        this.closeSuggestions();
        return;
      }
      
      searchDebounceTimer = setTimeout(() => {
        this.performSearch(query);
      }, 250);
    });

    // Keyboard navigation
    searchInput?.addEventListener('keydown', (e) => {
      const items = suggestionsEl?.querySelectorAll('[data-suggestion-index]');
      const totalItems = items?.length || 0;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (totalItems > 0) {
            this.searchHighlightIndex = Math.min(this.searchHighlightIndex + 1, totalItems - 1);
            this.highlightSuggestion(items, this.searchHighlightIndex);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (totalItems > 0) {
            this.searchHighlightIndex = Math.max(this.searchHighlightIndex - 1, -1);
            this.highlightSuggestion(items, this.searchHighlightIndex);
          }
          break;
        case 'Enter':
          e.preventDefault();
          if (this.searchHighlightIndex >= 0 && items?.[this.searchHighlightIndex]) {
            items[this.searchHighlightIndex].click();
          } else if (searchInput.value.trim()) {
            Router.navigate(`#/shop?search=${encodeURIComponent(searchInput.value.trim())}`);
            searchBar.classList.remove('active');
            this.closeSuggestions();
            searchInput.value = '';
          }
          break;
        case 'Escape':
          this.closeSuggestions();
          searchInput?.blur();
          break;
        default:
          this.searchHighlightIndex = -1;
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (searchBar && !searchBar.contains(e.target) && !searchToggle?.contains(e.target)) {
        this.closeSuggestions();
      }
    });

    // Focus handler - reopen suggestions if there's a query
    searchInput?.addEventListener('focus', () => {
      if (searchInput.value.trim().length >= 1) {
        this.performSearch(searchInput.value.trim());
      }
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      const backToTop = document.getElementById('backToTop');
      const currentScroll = window.scrollY;

      navbar?.classList.toggle('scrolled', currentScroll > 50);
      backToTop?.classList.toggle('visible', currentScroll > 400);
      
      lastScroll = currentScroll;
    });

    // Back to top
    document.getElementById('backToTop')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Newsletter form
    document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target.querySelector('input').value;
      if (email) {
        this.subscribeNewsletter();
        e.target.reset();
      }
    });
  },

  setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('shop_theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'dark' 
      ? '<i class="fas fa-moon"></i>' 
      : '<i class="fas fa-sun"></i>';

    themeToggle?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('shop_theme', next);
      themeToggle.innerHTML = next === 'dark' 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
    });
  },

  getUser() {
    const userData = localStorage.getItem('shop_user');
    return userData ? JSON.parse(userData) : null;
  },

  updateAuthUI() {
    const user = this.getUser();
    const loginBtn = document.getElementById('loginBtn');
    const profileBtn = document.getElementById('profileBtn');

    if (user) {
      if (loginBtn) {
        loginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Sign Out';
        loginBtn.href = '#';
        loginBtn.onclick = (e) => {
          e.preventDefault();
          AuthPage.logout();
        };
      }
      if (profileBtn) profileBtn.style.display = 'flex';
    } else {
      if (loginBtn) {
        loginBtn.innerHTML = 'Sign In';
        loginBtn.href = '#/login';
        loginBtn.onclick = null;
      }
      if (profileBtn) profileBtn.style.display = 'none';
    }
  },

  async updateCartBadge() {
    try {
      const count = await DB.getCartCount();
      const badge = document.getElementById('cartBadge');
      if (badge) {
        badge.textContent = count;
        badge.classList.toggle('visible', count > 0);
      }
    } catch (e) {
      console.error('Failed to update cart badge:', e);
    }
  },

  async updateWishlistBadge() {
    try {
      const count = await DB.getWishlistCount();
      const badge = document.getElementById('wishlistBadge');
      if (badge) {
        badge.textContent = count;
        badge.classList.toggle('visible', count > 0);
      }
    } catch (e) {
      console.error('Failed to update wishlist badge:', e);
    }
  },

  async addToCart(productId) {
    try {
      const product = await DB.getProductById(productId);
      if (product) {
        await DB.addToCart(productId);
        Components.toast(`${product.name} added to cart!`, 'success');
        await this.updateCartBadge();
      }
    } catch (error) {
      Components.toast('Failed to add to cart', 'error');
    }
  },

  async updateCartQty(itemId, newQty) {
    try {
      await DB.updateCartItem(itemId, newQty);
      await CartPage.loadCart();
      await this.updateCartBadge();
    } catch (error) {
      Components.toast('Failed to update cart', 'error');
    }
  },

  async removeFromCart(itemId) {
    try {
      await DB.removeFromCart(itemId);
      await CartPage.loadCart();
      await this.updateCartBadge();
      Components.toast('Item removed from cart', 'info');
    } catch (error) {
      Components.toast('Failed to remove item', 'error');
    }
  },

  async toggleWishlist(productId, btn) {
    try {
      const added = await DB.toggleWishlist(productId);
      if (added) {
        Components.toast('Added to wishlist!', 'success');
        if (btn) {
          btn.classList.add('active');
          btn.querySelector('i').style.color = 'var(--error)';
        }
      } else {
        Components.toast('Removed from wishlist', 'info');
        if (btn) {
          btn.classList.remove('active');
          btn.querySelector('i').style.color = '';
        }
        // If on wishlist page, reload
        if (Router.currentRoute === '/wishlist') {
          WishlistPage.loadWishlist();
        }
      }
      await this.updateWishlistBadge();
    } catch (error) {
      Components.toast('Failed to update wishlist', 'error');
    }
  },

  async toggleWishlistById(productId) {
    try {
      const added = await DB.toggleWishlist(productId);
      const btn = document.getElementById('wishlistBtn');
      if (btn) {
        const icon = btn.querySelector('i');
        icon.style.color = added ? 'var(--error)' : '';
      }
      Components.toast(added ? 'Added to wishlist!' : 'Removed from wishlist', added ? 'success' : 'info');
      await this.updateWishlistBadge();
    } catch (error) {
      Components.toast('Failed to update wishlist', 'error');
    }
  },

  async updateWishlistIcons() {
    try {
      const btns = document.querySelectorAll('.product-card-wishlist');
      for (const btn of btns) {
        const productId = parseInt(btn.dataset.productId);
        if (productId) {
          const inWishlist = await DB.isInWishlist(productId);
          if (inWishlist) {
            btn.classList.add('active');
            btn.querySelector('i').style.color = 'var(--error)';
          }
        }
      }
    } catch (e) {
      // Silently fail - wishlist badges are not critical
    }
  },

  async wishlistAddToCart(productId) {
    await this.addToCart(productId);
  },

  // === Search Autocomplete ===
  async performSearch(query) {
    const suggestionsEl = document.getElementById('searchSuggestions');
    if (!suggestionsEl || !query || query.trim().length < 1) return;

    const requestId = ++this.searchRequestId;

    suggestionsEl.innerHTML = `
      <div class="search-suggestion-loading">
        <div class="loader-spinner"></div>
        Searching...
      </div>
    `;
    suggestionsEl.classList.add('active');

    try {
      const [products, categories] = await Promise.all([
        DB.searchSuggestions(query),
        DB.searchCategories(query)
      ]);

      // Ignore stale responses from earlier requests
      if (requestId !== this.searchRequestId) return;

      if (products.length === 0 && categories.length === 0) {
        suggestionsEl.innerHTML = `
          <div class="search-suggestion-empty">
            <i class="fas fa-search" style="font-size:1.5rem;margin-bottom:8px;opacity:0.3;display:block"></i>
            No products found for "${this.escapeHtml(query)}"
          </div>
          <div class="search-suggestion-view-all" onclick="App.onSearchSuggestionClick('viewAll', '${this.escapeHtml(query)}')">
            <i class="fas fa-arrow-right"></i> Search all products for "${this.escapeHtml(query)}"
          </div>
        `;
        return;
      }

      let html = '';
      let index = 0;

      // Categories section
      if (categories.length > 0) {
        html += `<div class="search-suggestions-group">
          <div class="search-suggestions-group-title"><i class="fas fa-folder"></i> Categories</div>
          <div style="display:flex;flex-wrap:wrap;padding:4px 0">`;
        categories.forEach(c => {
          html += `<div class="search-suggestion-category-chip" data-suggestion-index="${index++}"
                    onclick="App.onSearchSuggestionClick('category', '${c.slug}')">
            <i class="fas fa-tag"></i> ${this.escapeHtml(c.name)}
          </div>`;
        });
        html += `</div></div>`;
      }

      // Products section
      if (products.length > 0) {
        html += `<div class="search-suggestions-group">
          <div class="search-suggestions-group-title"><i class="fas fa-box"></i> Products</div>`;
        products.forEach(p => {
          const hasDiscount = p.compare_price && p.compare_price > p.price;
          const inStock = p.stock > 0;
          html += `
            <div class="search-suggestion-item" data-suggestion-index="${index++}"
                 onclick="App.onSearchSuggestionClick('product', '${p.slug}')">
              <img class="search-suggestion-img" src="${p.image_url || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&q=60'}" alt="${this.escapeHtml(p.name)}" loading="lazy">
              <div class="search-suggestion-info">
                <div class="search-suggestion-name">${this.escapeHtml(p.name)}</div>
                <div class="search-suggestion-category">${p.category_name || 'Product'}</div>
              </div>
              <div style="text-align:right">
                <div class="search-suggestion-price">
                  $${parseFloat(p.price).toFixed(2)}
                  ${hasDiscount ? `<span class="search-suggestion-compare">$${parseFloat(p.compare_price).toFixed(2)}</span>` : ''}
                </div>
                <span class="search-suggestion-stock ${inStock ? 'in-stock' : 'out-of-stock'}">
                  ${inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          `;
        });
        html += `</div>`;
      }

      // View all link
      html += `
        <div class="search-suggestion-view-all" onclick="App.onSearchSuggestionClick('viewAll', '${this.escapeHtml(query)}')">
          <i class="fas fa-arrow-right"></i> View all results for "${this.escapeHtml(query)}"
        </div>
      `;

      suggestionsEl.innerHTML = html;
      suggestionsEl.classList.add('active');
    } catch (error) {
      console.error('Search error:', error);
      // Only show error if this is still the latest request
      if (requestId === this.searchRequestId) {
        suggestionsEl.innerHTML = `
          <div class="search-suggestion-empty">
            <i class="fas fa-exclamation-circle" style="font-size:1.2rem;margin-bottom:8px;opacity:0.3;display:block"></i>
            Search unavailable. Please try again.
          </div>
        `;
      }
    }
  },

  closeSuggestions() {
    const suggestionsEl = document.getElementById('searchSuggestions');
    if (suggestionsEl) {
      suggestionsEl.classList.remove('active');
      suggestionsEl.innerHTML = '';
    }
    this.searchHighlightIndex = -1;
  },

  highlightSuggestion(items, index) {
    items?.forEach((el, i) => {
      el.classList.toggle('highlighted', i === index);
      if (i === index) {
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  },

  onSearchSuggestionClick(type, value) {
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    
    this.closeSuggestions();
    searchBar?.classList.remove('active');
    if (searchInput) searchInput.value = '';

    switch (type) {
      case 'product':
        Router.navigate(`#/product/${value}`);
        break;
      case 'category':
        Router.navigate(`#/shop?category=${value}`);
        break;
      case 'viewAll':
        Router.navigate(`#/shop?search=${encodeURIComponent(value)}`);
        break;
    }
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  subscribeNewsletter() {
    Components.toast('Subscribed! Welcome to the community 🎉', 'success');
  }
};

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
