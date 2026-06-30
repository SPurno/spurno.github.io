// ============================================
// ShopVerse — Cart Page
// ============================================

const CartPage = {
  async render() {
    const content = document.getElementById('pageContent');

    content.innerHTML = `
      <div class="cart-page page-enter">
        <h1><i class="fas fa-shopping-bag"></i> Shopping Cart</h1>
        <div id="cartContent">
          <div style="text-align:center;padding:40px">
            <div class="loader-spinner"></div>
          </div>
        </div>
      </div>
    `;

    await this.loadCart();
  },

  async loadCart() {
    const container = document.getElementById('cartContent');

    try {
      const cartItems = await DB.getCart();
      const total = await DB.getCartTotal();

      if (cartItems.length === 0) {
        container.innerHTML = Components.emptyState(
          '🛒',
          'Your cart is empty',
          'Looks like you haven\'t added anything yet. Start shopping!',
          'Start Shopping',
          '#/shop'
        );
        return;
      }

      const subtotal = total;
      const shipping = subtotal >= 50 ? 0 : 5.99;
      const tax = subtotal * 0.08;
      const grandTotal = subtotal + shipping + tax;

      container.innerHTML = `
        <div class="cart-content">
          <div class="cart-items">
            ${cartItems.map(item => Components.cartItem(item)).join('')}
          </div>
          <div class="cart-summary glass">
            <h3>Order Summary</h3>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>${shipping === 0 ? '<span style="color:var(--success)">FREE</span>' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div class="summary-row">
              <span>Tax (8%)</span>
              <span>$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Coupon</span>
              <span><button class="btn btn-sm btn-secondary" onclick="CartPage.showCouponInput()">Apply Code</button></span>
            </div>
            <div id="couponSection" style="display:none;padding:12px 0">
              <div style="display:flex;gap:8px">
                <input type="text" id="couponInput" placeholder="Enter coupon code" style="text-transform:uppercase">
                <button class="btn btn-primary btn-sm" onclick="CartPage.applyCoupon()">Apply</button>
              </div>
              <div id="couponMessage" style="font-size:0.8rem;margin-top:4px"></div>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span class="amount" id="cartTotal">$${grandTotal.toFixed(2)}</span>
            </div>
            <a href="#/checkout" class="btn btn-primary btn-block checkout-btn btn-lg">
              <i class="fas fa-lock"></i> Proceed to Checkout
            </a>
            <div style="text-align:center;margin-top:12px">
              <a href="#/shop" class="btn btn-sm btn-secondary">
                <i class="fas fa-arrow-left"></i> Continue Shopping
              </a>
            </div>
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-top:16px;color:var(--text-muted);font-size:0.8rem">
              <i class="fas fa-shield-alt"></i> Secure Checkout
              <i class="fab fa-cc-visa"></i>
              <i class="fab fa-cc-mastercard"></i>
              <i class="fab fa-cc-paypal"></i>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Cart error:', error);
      container.innerHTML = Components.emptyState('😔', 'Failed to load cart', error.message);
    }
  },

  showCouponInput() {
    const section = document.getElementById('couponSection');
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
  },

  async applyCoupon() {
    const code = document.getElementById('couponInput').value.trim();
    const message = document.getElementById('couponMessage');

    if (!code) {
      message.textContent = 'Please enter a coupon code';
      message.style.color = 'var(--error)';
      return;
    }

    try {
      const coupon = await DB.validateCoupon(code);
      if (coupon) {
        message.textContent = `Coupon applied! ${coupon.discount_percent}% off`;
        message.style.color = 'var(--success)';
        // Recalculate with discount
        Components.toast(`Coupon "${coupon.code}" applied! ${coupon.discount_percent}% off`, 'success');
      } else {
        message.textContent = 'Invalid or expired coupon code';
        message.style.color = 'var(--error)';
      }
    } catch (e) {
      message.textContent = 'Error validating coupon';
      message.style.color = 'var(--error)';
    }
  }
};
