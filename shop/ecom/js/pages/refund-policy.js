// ============================================
// PixabAnimation — Refund Policy Page
// ============================================

const RefundPolicyPage = {
  render() {
    const content = document.getElementById('pageContent');

    content.innerHTML = `
      <div class="about-page page-enter">
        <div class="about-hero" style="text-align:center;padding:60px 24px;max-width:800px;margin:0 auto">
          <div class="section-label" style="display:inline-block;padding:6px 16px;background:rgba(59,130,246,0.1);color:var(--accent-1);border-radius:var(--radius-full);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px">Refund Policy</div>
          <h1 style="font-size:2.8rem;font-weight:800;font-family:var(--font-display);margin-bottom:16px">
            <span class="text-gradient">Refund</span> Policy
          </h1>
          <p style="color:var(--text-secondary);font-size:1.05rem;line-height:1.8">
            Last updated: July 1, 2026
          </p>
        </div>

        <div style="max-width:800px;margin:0 auto;padding:0 24px 60px">
          <div class="glass" style="padding:40px">
            <div style="display:flex;flex-direction:column;gap:28px">
              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">1. Digital Products — 14-Day Satisfaction Guarantee</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  Because our products are digital files that can be instantly downloaded, we offer a <strong>14-day satisfaction guarantee</strong> 
                  from the date of purchase. If you are not satisfied with your purchase for any reason, contact our support team and we will work with you to resolve the issue.
                </p>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8;margin-top:12px">
                  Refunds for digital products are granted on a case-by-case basis and typically require that you have not already downloaded the full-resolution file. 
                  Previews and watermarked versions are provided so you can evaluate the quality before downloading.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">2. When Refunds Are Granted</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">We may grant a refund in the following situations:</p>
                <ul style="color:var(--text-secondary);font-size:0.95rem;line-height:2;padding-left:20px;list-style:disc">
                  <li>The digital file is corrupted or unplayable and we cannot provide a working replacement</li>
                  <li>You accidentally purchased the wrong item and <strong>have not downloaded</strong> the full-resolution file</li>
                  <li>The product description was materially inaccurate (e.g., wrong resolution, wrong format)</li>
                  <li>Duplicate purchase due to technical error</li>
                </ul>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">3. When Refunds Are Not Granted</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">Refunds will not be granted in the following situations:</p>
                <ul style="color:var(--text-secondary);font-size:0.95rem;line-height:2;padding-left:20px;list-style:disc">
                  <li>You have already downloaded the full-resolution file (the preview is there for evaluation)</li>
                  <li>More than 14 days have passed since the purchase</li>
                  <li>You changed your mind after downloading the full file</li>
                  <li>The issue is due to incompatible software on your end (check system requirements before purchasing)</li>
                </ul>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">4. Physical Products</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  For physical products (if applicable), we accept returns within <strong>30 days</strong> of delivery. 
                  Items must be unused and in their original packaging. Return shipping costs are the responsibility of the customer 
                  unless the item arrived damaged or defective.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">5. How to Request a Refund</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  To request a refund, please contact our support team with:
                </p>
                <ul style="color:var(--text-secondary);font-size:0.95rem;line-height:2;padding-left:20px;list-style:disc">
                  <li>Your order number</li>
                  <li>The reason for your refund request</li>
                  <li>Any relevant screenshots or details about the issue</li>
                </ul>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8;margin-top:12px">
                  Email us at: <strong>support@pixabanimation.com</strong> or visit our <a href="#/contact" style="color:var(--accent-1)">Contact page</a>.
                  We aim to respond within 24-48 hours.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">6. Payment Disputes</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  Before filing a dispute with your payment provider, please contact us directly. 
                  Many issues can be resolved quickly through our support team. Filing an unnecessary dispute may result in account suspension.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
