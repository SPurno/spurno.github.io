// ============================================
// PixabAnimation — Contact Page
// ============================================

const ContactPage = {
  render() {
    const content = document.getElementById('pageContent');

    content.innerHTML = `
      <div class="contact-page page-enter">
        <div class="section-header">
          <div class="section-label">Get in Touch</div>
          <h1 class="section-title">We'd Love to <span class="text-gradient">Hear</span> From You</h1>
          <p class="section-subtitle">Have a question, feedback, or just want to say hello? We're here for you.</p>
        </div>
        
        <div class="contact-grid">
          <div class="contact-info-cards">
            <div class="contact-info-card glass" style="padding:24px">
              <div class="contact-info-icon"><i class="fas fa-map-marker-alt"></i></div>
              <div class="contact-info-text">
                <h4>Visit Us</h4>
                <p>123 Commerce Street, Suite 100<br>San Francisco, CA 94102</p>
              </div>
            </div>
            <div class="contact-info-card glass" style="padding:24px">
              <div class="contact-info-icon"><i class="fas fa-envelope"></i></div>
              <div class="contact-info-text">
                <h4>Email Us</h4>
                <p>hello@pixabanimation.com<br>support@pixabanimation.com</p>
              </div>
            </div>
            <div class="contact-info-card glass" style="padding:24px">
              <div class="contact-info-icon"><i class="fas fa-phone-alt"></i></div>
              <div class="contact-info-text">
                <h4>Call Us</h4>
                <p>+1 (555) 123-4567<br>Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>
            <div class="contact-info-card glass" style="padding:24px">
              <div class="contact-info-icon"><i class="fas fa-clock"></i></div>
              <div class="contact-info-text">
                <h4>Business Hours</h4>
                <p>Monday - Friday: 9AM - 6PM<br>Saturday: 10AM - 4PM<br>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div class="glass" style="padding:32px">
            <h3 style="margin-bottom:20px;font-size:1.2rem">Send us a Message</h3>
            <form class="contact-form" onsubmit="ContactPage.submit(event)">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div class="form-group">
                  <label>Your Name</label>
                  <input type="text" id="contactName" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                  <label>Your Email</label>
                  <input type="email" id="contactEmail" placeholder="john@example.com" required>
                </div>
              </div>
              <div class="form-group">
                <label>Subject</label>
                <input type="text" id="contactSubject" placeholder="How can we help?" required>
              </div>
              <div class="form-group">
                <label>Message</label>
                <textarea id="contactMessage" rows="5" placeholder="Tell us more about your inquiry..." required style="resize:vertical"></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg">
                <i class="fas fa-paper-plane"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  async submit(event) {
    event.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    try {
      await DB.submitContact(name, email, subject, message);
      Components.toast('Message sent! We\'ll get back to you soon.', 'success');
      event.target.reset();
    } catch (error) {
      Components.toast('Failed to send message. Please try again.', 'error');
    }
  }
};
