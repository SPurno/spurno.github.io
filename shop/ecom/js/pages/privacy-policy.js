// ============================================
// PixabAnimation — Privacy Policy Page
// ============================================

const PrivacyPolicyPage = {
  render() {
    const content = document.getElementById('pageContent');

    content.innerHTML = `
      <div class="about-page page-enter">
        <div class="about-hero" style="text-align:center;padding:60px 24px;max-width:800px;margin:0 auto">
          <div class="section-label" style="display:inline-block;padding:6px 16px;background:rgba(46,204,113,0.1);color:var(--accent-1);border-radius:var(--radius-full);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px">Privacy</div>
          <h1 style="font-size:2.8rem;font-weight:800;font-family:var(--font-display);margin-bottom:16px">
            <span class="text-gradient">Privacy</span> Policy
          </h1>
          <p style="color:var(--text-secondary);font-size:1.05rem;line-height:1.8">
            Last updated: July 1, 2026
          </p>
        </div>

        <div style="max-width:800px;margin:0 auto;padding:0 24px 60px">
          <div class="glass" style="padding:40px">
            <div style="display:flex;flex-direction:column;gap:28px">
              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">1. Introduction</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  Welcome to PixabAnimation. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">2. Information We Collect</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">We may collect the following types of information:</p>
                <ul style="color:var(--text-secondary);font-size:0.95rem;line-height:2;padding-left:20px;list-style:disc">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and payment information when you make a purchase or create an account.</li>
                  <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and browsing patterns.</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
                  <li><strong>Communication Data:</strong> Any information you provide when contacting our support team or subscribing to our newsletter.</li>
                </ul>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">3. How We Use Your Information</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">We use your information for the following purposes:</p>
                <ul style="color:var(--text-secondary);font-size:0.95rem;line-height:2;padding-left:20px;list-style:disc">
                  <li>To process and fulfill your orders for digital assets</li>
                  <li>To provide customer support and respond to inquiries</li>
                  <li>To send you download links and order confirmations</li>
                  <li>To send marketing communications (with your consent)</li>
                  <li>To improve our website and user experience</li>
                  <li>To detect and prevent fraudulent transactions</li>
                </ul>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">4. Data Storage and Security</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  We implement appropriate technical and organizational measures to protect your personal data. 
                  Your payment information is processed through secure third-party payment processors (Payoneer, Skrill) and is not stored on our servers. 
                  Passwords are encrypted using SHA-256 hashing before storage. However, no method of transmission over the Internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">5. Third-Party Services</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  We use the following third-party services:
                </p>
                <ul style="color:var(--text-secondary);font-size:0.95rem;line-height:2;padding-left:20px;list-style:disc">
                  <li><strong>Turso (libsql):</strong> Database hosting for our application data</li>
                  <li><strong>Cloudinary:</strong> Media storage and optimization</li>
                  <li><strong>Payoneer & Skrill:</strong> Payment processing</li>
                  <li><strong>Unsplash:</strong> Stock photography for product imagery</li>
                </ul>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">6. Your Rights</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">You have the right to:</p>
                <ul style="color:var(--text-secondary);font-size:0.95rem;line-height:2;padding-left:20px;list-style:disc">
                  <li>Access your personal data held by us</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data (subject to legal obligations)</li>
                  <li>Withdraw consent for marketing communications at any time</li>
                  <li>Request a copy of your data in a portable format</li>
                </ul>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">7. Cookies</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  We use essential cookies for session management and shopping cart functionality. 
                  We do not use tracking cookies or third-party analytics cookies without your consent.
                  You can control cookie settings through your browser preferences.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">8. Contact Us</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  If you have any questions about this privacy policy, please contact us at:
                  <br><strong>Email:</strong> privacy@pixabanimation.com
                  <br><strong>Or visit our</strong> <a href="#/contact" style="color:var(--accent-1)">Contact page</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
