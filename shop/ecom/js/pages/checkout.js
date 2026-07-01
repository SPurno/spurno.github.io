// ============================================
// PixabAnimation — Checkout Page
// ============================================

const CheckoutPage = {
  async render() {
    const content = document.getElementById('pageContent');

    content.innerHTML = `
      <div class="checkout-page page-enter">
        <h1><i class="fas fa-credit-card"></i> Checkout</h1>
        <div id="checkoutContent">
          <div style="text-align:center;padding:40px">
            <div class="loader-spinner"></div>
          </div>
        </div>
      </div>
    `;

    await this.loadCheckout();
  },

  getCountryStatesHtml(countryCode) {
    const states = Countries.getStates(countryCode);
    if (states.length === 0) {
      return `
        <div class="form-group full-width">
          <label>State / Province / Region</label>
          <input type="text" id="shipState" placeholder="Enter your state, province, or region" class="state-input">
        </div>
      `;
    }
    return `
      <div class="form-group full-width">
        <label>State / Province</label>
        <select id="shipState" required>
          <option value="">Select ${Countries.getName(countryCode)} ${countryCode === 'GB' ? 'region' : 'state'}</option>
          ${Countries.renderStateOptions(countryCode)}
        </select>
      </div>
    `;
  },

  async loadCheckout() {
    const container = document.getElementById('checkoutContent');

    try {
      const cartItems = await DB.getCart();
      if (cartItems.length === 0) {
        container.innerHTML = Components.emptyState(
          '🛒', 'Your cart is empty', 'Add some items before checkout.',
          'Start Shopping', '#/shop'
        );
        return;
      }

      const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
      const shipping = subtotal >= 50 ? 0 : 5.99;
      const tax = subtotal * 0.08;
      const grandTotal = subtotal + shipping + tax;

      const defaultCountry = 'US';

      container.innerHTML = `
        <form class="checkout-form" onsubmit="CheckoutPage.placeOrder(event)">
          <div class="checkout-section glass">
            <h3><i class="fas fa-user" style="color:var(--accent-1)"></i> Shipping Information</h3>
            <div class="checkout-grid">
              <div class="form-group full-width">
                <label>Full Name</label>
                <input type="text" id="shipName" placeholder="John Doe" required>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" id="shipEmail" placeholder="john@example.com" required>
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="tel" id="shipPhone" placeholder="+1 (555) 000-0000">
              </div>
              <div class="form-group full-width">
                <label>Address</label>
                <input type="text" id="shipAddress" placeholder="123 Main Street, Apt 4B" required>
              </div>
              <div class="form-group full-width">
                <label>Country</label>
                <div style="position:relative">
                  <select id="shipCountry" onchange="CheckoutPage.onCountryChange()" required style="padding:12px 16px;appearance:auto;-webkit-appearance:auto">
                    <option value="">🌍 Select your country</option>
                    ${Countries.renderOptions(defaultCountry)}
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label>City</label>
                <input type="text" id="shipCity" placeholder="New York" required>
              </div>
              <div class="form-group" id="stateFieldContainer">
                ${this.getCountryStatesHtml(defaultCountry)}
              </div>
              <div class="form-group">
                <label>ZIP / Postal Code</label>
                <input type="text" id="shipZip" placeholder="10001" required>
              </div>
            </div>
          </div>

          <div class="checkout-section glass">
            <h3><i class="fas fa-credit-card" style="color:var(--accent-1)"></i> Payment Method</h3>
            <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:16px">
              Make your payment via <strong>Payoneer</strong> or <strong>Skrill</strong>, then enter the Transaction ID below to complete your order.
            </p>
            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px">
              <label style="display:flex;align-items:center;gap:12px;padding:16px;background:var(--bg-input);border-radius:var(--radius-sm);cursor:pointer;border:2px solid var(--accent-1)">
                <input type="radio" name="payment" value="payoneer" checked>
                <i class="fas fa-university" style="font-size:1.2rem;color:#FF6B35"></i>
                <div style="flex:1">
                  <span style="font-weight:600">Payoneer</span>
                  <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px">
                    Send payment to: <strong style="color:var(--accent-1);background:rgba(46,204,113,0.12);padding:2px 8px;border-radius:4px;font-size:0.85rem">any_dj@live.com</strong>
                  </div>
                </div>
                <span style="font-size:0.75rem;color:var(--text-muted)">Recommended</span>
              </label>
              <label style="display:flex;align-items:center;gap:12px;padding:16px;background:var(--bg-input);border-radius:var(--radius-sm);cursor:pointer">
                <input type="radio" name="payment" value="skrill">
                <i class="fas fa-money-bill-wave" style="font-size:1.2rem;color:#942B8B"></i>
                <div style="flex:1">
                  <span style="font-weight:600">Skrill</span>
                  <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px">
                    Send payment to: <strong style="color:#942B8B;background:rgba(148,43,139,0.12);padding:2px 8px;border-radius:4px;font-size:0.85rem">spurno@icloud.com</strong>
                  </div>
                </div>
              </label>
            </div>

            <div style="padding:16px;background:rgba(46,204,113,0.08);border:1px solid rgba(46,204,113,0.15);border-radius:var(--radius-sm);margin-bottom:16px">
              <div style="font-weight:600;font-size:0.85rem;margin-bottom:8px;color:var(--accent-1)">
                <i class="fas fa-info-circle"></i> How to pay
              </div>
              <ol style="font-size:0.82rem;color:var(--text-secondary);padding-left:16px;display:flex;flex-direction:column;gap:4px">
                <li>Transfer the total amount via <strong>Payoneer</strong> or <strong>Skrill</strong> to our account.</li>
                <li>After payment, copy the <strong>Transaction ID</strong> from your payment receipt.</li>
                <li>Paste the Transaction ID below and submit your order.</li>
                <li>Admin will verify the transaction and send your download link (for digital/video items).</li>
              </ol>
            </div>

            <div class="form-group">
              <label><i class="fas fa-hashtag" style="color:var(--accent-1)"></i> Transaction ID</label>
              <input type="text" id="transactionId" placeholder="Enter your Payoneer or Skrill Transaction ID" required>
              <span style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">
                Enter the Transaction ID from your payment receipt. Your order will be verified by admin.
              </span>
            </div>
          </div>

          <div class="checkout-section glass">
            <h3><i class="fas fa-shopping-bag" style="color:var(--accent-1)"></i> Order Summary</h3>
            <div style="display:flex;flex-direction:column;gap:12px">
              ${cartItems.map(item => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border-light)">
                  <div style="display:flex;align-items:center;gap:12px">
                    <img src="${item.image_url}" alt="${item.name}" style="width:48px;height:48px;border-radius:8px;object-fit:cover">
                    <div>
                      <div style="font-weight:500;font-size:0.9rem">${item.name}</div>
                      <div style="font-size:0.8rem;color:var(--text-muted)">Qty: ${item.quantity}</div>
                    </div>
                  </div>
                  <div style="font-weight:600">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</div>
                </div>
              `).join('')}
            </div>
            <div style="margin-top:16px">
              <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
              <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? '<span style="color:var(--success)">FREE</span>' : `$${shipping.toFixed(2)}`}</span></div>
              <div class="summary-row"><span>Tax (8%)</span><span>$${tax.toFixed(2)}</span></div>
              <div class="summary-row total"><span>Total</span><span class="amount">$${grandTotal.toFixed(2)}</span></div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block btn-lg" style="font-size:1.05rem">
            <i class="fas fa-lock"></i> Place Order — $${grandTotal.toFixed(2)}
          </button>
        </form>
      `;
    } catch (error) {
      console.error('Checkout error:', error);
      container.innerHTML = Components.emptyState('😔', 'Failed to load checkout', error.message);
    }
  },

  onCountryChange() {
    const countryCode = document.getElementById('shipCountry').value;
    const stateContainer = document.getElementById('stateFieldContainer');
    
    if (!countryCode) {
      stateContainer.innerHTML = `
        <div class="form-group full-width">
          <label>State / Province / Region</label>
          <input type="text" id="shipState" placeholder="Enter your state, province, or region">
        </div>
      `;
      return;
    }

    const states = Countries.getStates(countryCode);
    if (states.length === 0) {
      stateContainer.innerHTML = `
        <div class="form-group full-width">
          <label>State / Province / Region</label>
          <input type="text" id="shipState" placeholder="Enter your state, province, or region" class="state-input">
        </div>
      `;
    } else {
      stateContainer.innerHTML = `
        <div class="form-group full-width">
          <label>State / Province</label>
          <select id="shipState" required>
            <option value="">Select ${Countries.getName(countryCode)} ${countryCode === 'GB' ? 'region' : 'state'}</option>
            ${Countries.renderStateOptions(countryCode)}
          </select>
        </div>
      `;
    }
  },

  async placeOrder(event) {
    event.preventDefault();
    const btn = event.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    try {
      const cartItems = await DB.getCart();
      if (cartItems.length === 0) {
        Components.toast('Your cart is empty', 'error');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
        return;
      }

      const name = document.getElementById('shipName').value;
      const email = document.getElementById('shipEmail').value;
      const address = document.getElementById('shipAddress').value;
      const city = document.getElementById('shipCity').value;
      const countryCode = document.getElementById('shipCountry').value;
      const countryName = Countries.getName(countryCode) || countryCode;
      const countryFlag = Countries.getFlag(countryCode) || '';
      const stateEl = document.getElementById('shipState');
      const state = stateEl ? stateEl.value || stateEl.placeholder || '' : '';
      const zip = document.getElementById('shipZip').value;
      const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
      const transactionId = document.getElementById('transactionId').value.trim();

      if (!transactionId) {
        Components.toast('Please enter your Transaction ID from your payment receipt', 'error');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
        return;
      }

      if (!countryCode) {
        Components.toast('Please select your country', 'error');
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
        return;
      }

      const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
      const shipping = subtotal >= 50 ? 0 : 5.99;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;

      const shippingAddress = `${name}, ${address}, ${city}${state ? ', ' + state : ''}, ${countryFlag} ${countryName}, ${zip}`;

      const orderId = await DB.createOrder({
        total,
        subtotal,
        shipping,
        tax,
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        payment_provider: paymentMethod,
        items: cartItems.map(item => ({
          product_id: item.product_id,
          name: item.name,
          image_url: item.image_url,
          quantity: item.quantity,
          price: item.price
        }))
      });

      Components.toast(`Order #${orderId} submitted for verification!`, 'success');
      
      // Show success page
      const container = document.getElementById('checkoutContent');
      container.innerHTML = `
        <div style="text-align:center;padding:60px 24px" class="page-enter">
          <div style="font-size:5rem;margin-bottom:24px">📋</div>
          <h2 style="font-size:2rem;font-weight:800;margin-bottom:12px">Order Submitted!</h2>
          <p style="color:var(--text-muted);font-size:1.1rem;margin-bottom:8px">Order #${orderId} — awaiting verification</p>
          <p style="color:var(--text-secondary);margin-bottom:32px">
            Your payment of <strong>$${total.toFixed(2)}</strong> via <strong>${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}</strong> is being reviewed.
            <br>Transaction ID: <strong>${transactionId}</strong>
            <br>Shipping to: ${countryFlag} ${countryName}${state ? ', ' + state : ''}
            <br>You will receive the download link once admin approves the transaction.
          </p>
          <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap">
            <a href="#/profile" class="btn btn-primary btn-lg">
              <i class="fas fa-user"></i> View Orders
            </a>
            <a href="#/" class="btn btn-secondary btn-lg">
              <i class="fas fa-home"></i> Continue Shopping
            </a>
          </div>
        </div>
      `;

      App.updateCartBadge();
    } catch (error) {
      console.error('Order placement error:', error);
      Components.toast('Failed to place order. Please try again.', 'error');
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
    }
  }
};
