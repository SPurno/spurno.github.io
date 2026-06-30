// ============================================
// ShopVerse — Checkout Page
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
                <input type="text" id="shipAddress" placeholder="123 Main Street" required>
              </div>
              <div class="form-group">
                <label>City</label>
                <input type="text" id="shipCity" placeholder="New York" required>
              </div>
              <div class="form-group">
                <label>State</label>
                <select id="shipState" style="padding:12px 16px" required>
                  <option value="">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div class="form-group">
                <label>ZIP Code</label>
                <input type="text" id="shipZip" placeholder="10001" required>
              </div>
            </div>
          </div>

          <div class="checkout-section glass">
            <h3><i class="fas fa-credit-card" style="color:var(--accent-1)"></i> Payment Method</h3>
            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px">
              <label style="display:flex;align-items:center;gap:12px;padding:16px;background:var(--bg-input);border-radius:var(--radius-sm);cursor:pointer">
                <input type="radio" name="payment" value="credit_card" checked>
                <i class="fas fa-credit-card" style="font-size:1.2rem;color:var(--accent-1)"></i>
                <span>Credit Card</span>
                <span style="margin-left:auto;display:flex;gap:8px;font-size:1.4rem;color:var(--text-muted)">
                  <i class="fab fa-cc-visa"></i>
                  <i class="fab fa-cc-mastercard"></i>
                  <i class="fab fa-cc-amex"></i>
                </span>
              </label>
              <label style="display:flex;align-items:center;gap:12px;padding:16px;background:var(--bg-input);border-radius:var(--radius-sm);cursor:pointer">
                <input type="radio" name="payment" value="paypal">
                <i class="fab fa-paypal" style="font-size:1.2rem;color:#00457C"></i>
                <span>PayPal</span>
              </label>
              <label style="display:flex;align-items:center;gap:12px;padding:16px;background:var(--bg-input);border-radius:var(--radius-sm);cursor:pointer">
                <input type="radio" name="payment" value="stripe">
                <i class="fab fa-stripe" style="font-size:1.2rem;color:#635bff"></i>
                <span>Stripe</span>
              </label>
            </div>
            <div id="creditCardFields">
              <div class="checkout-grid">
                <div class="form-group full-width">
                  <label>Card Number</label>
                  <input type="text" id="cardNumber" placeholder="4242 4242 4242 4242" maxlength="19">
                </div>
                <div class="form-group">
                  <label>Expiry Date</label>
                  <input type="text" id="cardExpiry" placeholder="MM/YY" maxlength="5">
                </div>
                <div class="form-group">
                  <label>CVC</label>
                  <input type="text" id="cardCvc" placeholder="123" maxlength="4">
                </div>
              </div>
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

      // Payment method toggle
      document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', () => {
          document.getElementById('creditCardFields').style.display = 
            radio.value === 'credit_card' ? 'block' : 'none';
        });
      });
    } catch (error) {
      console.error('Checkout error:', error);
      container.innerHTML = Components.emptyState('😔', 'Failed to load checkout', error.message);
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
      const state = document.getElementById('shipState').value;
      const zip = document.getElementById('shipZip').value;
      const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

      const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
      const shipping = subtotal >= 50 ? 0 : 5.99;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;

      const shippingAddress = `${name}, ${address}, ${city}, ${state} ${zip}`;

      const orderId = await DB.createOrder({
        total,
        subtotal,
        shipping,
        tax,
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        items: cartItems.map(item => ({
          product_id: item.product_id,
          name: item.name,
          image_url: item.image_url,
          quantity: item.quantity,
          price: item.price
        }))
      });

      Components.toast(`Order placed! Order #${orderId}`, 'success');
      
      // Show success page
      const container = document.getElementById('checkoutContent');
      container.innerHTML = `
        <div style="text-align:center;padding:60px 24px" class="page-enter">
          <div style="font-size:5rem;margin-bottom:24px">🎉</div>
          <h2 style="font-size:2rem;font-weight:800;margin-bottom:12px">Order Confirmed!</h2>
          <p style="color:var(--text-muted);font-size:1.1rem;margin-bottom:8px">Thank you for your purchase!</p>
          <p style="color:var(--text-secondary);margin-bottom:32px">Order #${orderId} has been placed successfully.</p>
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
