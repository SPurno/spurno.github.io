// ============================================
// PixabAnimation — Terms of Use Page
// ============================================

const TermsOfUsePage = {
  render() {
    const content = document.getElementById('pageContent');

    content.innerHTML = `
      <div class="about-page page-enter">
        <div class="about-hero" style="text-align:center;padding:60px 24px;max-width:800px;margin:0 auto">
          <div class="section-label" style="display:inline-block;padding:6px 16px;background:rgba(59,130,246,0.1);color:var(--accent-1);border-radius:var(--radius-full);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px">Terms</div>
          <h1 style="font-size:2.8rem;font-weight:800;font-family:var(--font-display);margin-bottom:16px">
            <span class="text-gradient">Terms</span> of Use
          </h1>
          <p style="color:var(--text-secondary);font-size:1.05rem;line-height:1.8">
            Last updated: July 1, 2026
          </p>
        </div>

        <div style="max-width:800px;margin:0 auto;padding:0 24px 60px">
          <div class="glass" style="padding:40px">
            <div style="display:flex;flex-direction:column;gap:28px">
              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">1. Acceptance of Terms</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  By accessing or using PixabAnimation ("the Service"), you agree to be bound by these Terms of Use. 
                  If you do not agree with any part of these terms, you may not access or use the Service. 
                  We reserve the right to update these terms at any time, and continued use constitutes acceptance of the updated terms.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">2. Account Registration</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  When you create an account, you must provide accurate and complete information. You are responsible for:
                </p>
                <ul style="color:var(--text-secondary);font-size:0.95rem;line-height:2;padding-left:20px;list-style:disc">
                  <li>Maintaining the confidentiality of your login credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Ensuring your email address is up to date for order notifications</li>
                </ul>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">3. License for Digital Products</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  When you purchase a digital asset from PixabAnimation, you receive a <strong>non-exclusive, non-transferable license</strong> to use the asset for:
                </p>
                <ul style="color:var(--text-secondary);font-size:0.95rem;line-height:2;padding-left:20px;list-style:disc">
                  <li>Personal and commercial projects (videos, presentations, websites, advertisements)</li>
                  <li>Client work where the asset is incorporated into a larger project</li>
                  <li>Broadcast and streaming content</li>
                </ul>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8;margin-top:12px">
                  You may <strong>not</strong> resell, redistribute, or sublicense the asset in its original form (e.g., as a stock video clip, template, or standalone file). 
                  The asset must always be part of a larger creative work.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">4. Payment Terms</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  All prices are listed in US Dollars (USD) and are subject to applicable taxes. 
                  Payment is processed through third-party providers (Payoneer or Skrill). 
                  By providing payment information, you represent that you are authorized to use the payment method. 
                  Orders are processed after payment verification. We reserve the right to cancel any order if fraud is suspected.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">5. User Conduct</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">You agree not to:</p>
                <ul style="color:var(--text-secondary);font-size:0.95rem;line-height:2;padding-left:20px;list-style:disc">
                  <li>Use the Service for any unlawful purpose</li>
                  <li>Attempt to bypass security measures or access restricted areas</li>
                  <li>Distribute malware or engage in any activity that disrupts the Service</li>
                  <li>Submit false payment information or commit chargeback fraud</li>
                  <li>Share your download links or account credentials with others</li>
                </ul>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">6. Limitation of Liability</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  PixabAnimation shall not be liable for any indirect, incidental, special, consequential, or punitive damages. 
                  Our total liability for any claim arising from your use of the Service shall not exceed the amount you paid for the specific product giving rise to the claim. 
                  Digital products are provided "as is" without warranty of merchantability or fitness for a particular purpose.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">7. Termination</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  We reserve the right to suspend or terminate your account at any time for violations of these Terms of Use. 
                  Upon termination, your license to use any purchased assets remains valid (as you have already paid for them), 
                  but you may lose access to your account and download history.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">8. Governing Law</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  These Terms of Use shall be governed by and construed in accordance with the laws, without regard to its conflict of law provisions. 
                  Any disputes shall be resolved through binding arbitration.
                </p>
              </div>

              <div>
                <h2 style="font-size:1.3rem;font-weight:700;margin-bottom:12px;color:var(--accent-1)">9. Contact</h2>
                <p style="color:var(--text-secondary);font-size:0.95rem;line-height:1.8">
                  For questions about these Terms of Use, please contact us at:
                  <br><strong>Email:</strong> legal@pixabanimation.com
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
