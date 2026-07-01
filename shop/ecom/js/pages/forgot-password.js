// ============================================
// ShopVerse — Forgot Password Recovery
// Security question-based recovery
// ============================================

const ForgotPasswordPage = {
  step: 1, // 1: email, 2: security question, 3: reset password

  render(params) {
    const content = document.getElementById('pageContent');
    this.step = 1;
    this.email = '';
    this.securityData = null;

    content.innerHTML = this.renderStep1();
  },

  renderStep1(errorMsg = '') {
    return `
      <div class="auth-page page-enter">
        <div class="auth-card glass">
          <div class="auth-header">
            <div style="font-size:2.5rem;margin-bottom:12px">🔐</div>
            <h1>Forgot Password</h1>
            <p>Enter your email to recover your account</p>
          </div>
          ${errorMsg ? `<div style="background:rgba(255,82,82,0.1);color:var(--error);padding:12px 16px;border-radius:var(--radius-sm);margin-bottom:16px;font-size:0.85rem">${errorMsg}</div>` : ''}
          <form class="auth-form" onsubmit="ForgotPasswordPage.submitEmail(event)">
            <div class="form-group">
              <label>Email Address</label>
              <div class="input-with-icon">
                <i class="fas fa-envelope"></i>
                <input type="email" id="fp_email" placeholder="your@email.com" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg">
              <i class="fas fa-arrow-right"></i> Continue
            </button>
          </form>
          <div class="auth-footer">
            Remember your password? <a href="#/login">Sign in</a>
          </div>
        </div>
      </div>
    `;
  },

  async submitEmail(event) {
    event.preventDefault();
    const email = document.getElementById('fp_email').value.trim();
    if (!email) return;

    const content = document.getElementById('pageContent');
    content.innerHTML = `<div style="text-align:center;padding:60px"><div class="loader-spinner"></div><p style="color:var(--text-muted);margin-top:12px">Verifying account...</p></div>`;

    try {
      // Check if user exists
      const user = await DB.getUserByEmail(email);
      if (!user) {
        content.innerHTML = this.renderStep1('No account found with this email address.');
        return;
      }

      this.email = email;
      this.userId = user.id;

      // Check if security question is set
      const security = await DB.getSecurityQuestion(email);
      if (security && security.question) {
        this.securityData = security;
        content.innerHTML = this.renderStep2();
      } else {
        // No security question - generate a recovery code instead
        content.innerHTML = this.renderStep2NoQuestion();
      }
    } catch (error) {
      console.error('Email check error:', error);
      const container = document.getElementById('pageContent');
      container.innerHTML = this.renderStep1('An error occurred. Please try again.');
    }
  },

  renderStep2(errorMsg = '') {
    return `
      <div class="auth-page page-enter">
        <div class="auth-card glass">
          <div class="auth-header">
            <div style="font-size:2.5rem;margin-bottom:12px">❓</div>
            <h1>Security Question</h1>
            <p>Answer your security question to verify your identity</p>
          </div>
          <div style="padding:16px;background:var(--bg-input);border-radius:var(--radius-sm);margin-bottom:20px;text-align:center">
            <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px">Security Question</div>
            <div style="font-weight:600;font-size:1.05rem">${this.securityData.question}</div>
          </div>
          ${errorMsg ? `<div style="background:rgba(255,82,82,0.1);color:var(--error);padding:12px 16px;border-radius:var(--radius-sm);margin-bottom:16px;font-size:0.85rem">${errorMsg}</div>` : ''}
          <form class="auth-form" onsubmit="ForgotPasswordPage.submitAnswer(event)">
            <div class="form-group">
              <label>Your Answer</label>
              <div class="input-with-icon">
                <i class="fas fa-pencil-alt"></i>
                <input type="text" id="fp_answer" placeholder="Enter your answer" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg">
              <i class="fas fa-check"></i> Verify Answer
            </button>
          </form>
          <div class="auth-footer">
            <a href="#/login" style="color:var(--accent-1)">Back to sign in</a>
          </div>
        </div>
      </div>
    `;
  },

  renderStep2NoQuestion() {
    return `
      <div class="auth-page page-enter">
        <div class="auth-card glass">
          <div class="auth-header">
            <div style="font-size:2.5rem;margin-bottom:12px">ℹ️</div>
            <h1>No Security Question Set</h1>
            <p>This account doesn't have a security question configured.</p>
          </div>
          <div style="padding:16px;background:rgba(255,215,64,0.1);color:var(--warning);border-radius:var(--radius-sm);margin-bottom:20px;font-size:0.85rem;text-align:center">
            <i class="fas fa-exclamation-triangle"></i> 
            This account doesn't have a security question configured. Please contact support to reset your password.
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            <a href="#/login" class="btn btn-primary btn-block">
              <i class="fas fa-sign-in-alt"></i> Back to Sign In
            </a>
          </div>
        </div>
      </div>
    `;
  },

  async submitAnswer(event) {
    event.preventDefault();
    const answer = document.getElementById('fp_answer').value.trim().toLowerCase();
    if (!answer) return;

    const content = document.getElementById('pageContent');
    content.innerHTML = `<div style="text-align:center;padding:60px"><div class="loader-spinner"></div><p style="color:var(--text-muted);margin-top:12px">Verifying answer...</p></div>`;

    try {
      // Hash the answer and verify
      const answerHash = AdminSettings.hashAnswer(answer);
      const result = await DB.verifySecurityAnswer(this.email, answerHash);

      if (result) {
        this.step = 3;
        content.innerHTML = this.renderStep3();
      } else {
        content.innerHTML = this.renderStep2('Incorrect answer. Please try again.');
      }
    } catch (error) {
      console.error('Answer verification error:', error);
      content.innerHTML = this.renderStep2('An error occurred. Please try again.');
    }
  },

  renderStep3(errorMsg = '') {
    return `
      <div class="auth-page page-enter">
        <div class="auth-card glass">
          <div class="auth-header">
            <div style="font-size:2.5rem;margin-bottom:12px">🔄</div>
            <h1>Reset Password</h1>
            <p>Choose a new password for your account</p>
          </div>
          ${errorMsg ? `<div style="background:rgba(255,82,82,0.1);color:var(--error);padding:12px 16px;border-radius:var(--radius-sm);margin-bottom:16px;font-size:0.85rem">${errorMsg}</div>` : ''}
          <form class="auth-form" onsubmit="ForgotPasswordPage.resetPassword(event)">
            <div class="form-group">
              <label>New Password</label>
              <div class="input-with-icon">
                <i class="fas fa-key"></i>
                <input type="password" id="fp_new_password" placeholder="Min. 8 characters" minlength="8" required>
              </div>
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <div class="input-with-icon">
                <i class="fas fa-check-circle"></i>
                <input type="password" id="fp_confirm_password" placeholder="Confirm new password" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg">
              <i class="fas fa-save"></i> Reset Password
            </button>
          </form>
          <div class="auth-footer">
            <a href="#/login" style="color:var(--accent-1)">Back to sign in</a>
          </div>
        </div>
      </div>
    `;
  },

  async resetPassword(event) {
    event.preventDefault();
    const newPw = document.getElementById('fp_new_password').value;
    const confirmPw = document.getElementById('fp_confirm_password').value;

    if (newPw !== confirmPw) {
      document.getElementById('pageContent').innerHTML = this.renderStep3('Passwords do not match.');
      return;
    }

    if (newPw.length < 8) {
      document.getElementById('pageContent').innerHTML = this.renderStep3('Password must be at least 8 characters.');
      return;
    }

    const content = document.getElementById('pageContent');
    content.innerHTML = `<div style="text-align:center;padding:60px"><div class="loader-spinner"></div><p style="color:var(--text-muted);margin-top:12px">Resetting password...</p></div>`;

    try {
      // Update password (hashed automatically)
      await DB.updateUserPassword(this.userId, newPw);

      // Show success
      content.innerHTML = `
        <div class="auth-page page-enter">
          <div class="auth-card glass">
            <div class="auth-header">
              <div style="font-size:3rem;margin-bottom:12px">✅</div>
              <h1>Password Reset!</h1>
              <p>Your password has been successfully updated.</p>
            </div>
            <a href="#/login" class="btn btn-primary btn-block btn-lg">
              <i class="fas fa-sign-in-alt"></i> Sign In with New Password
            </a>
          </div>
        </div>
      `;
      Components.toast('Password reset successful!', 'success');
    } catch (error) {
      console.error('Password reset error:', error);
      content.innerHTML = this.renderStep3('Failed to reset password. Please try again.');
    }
  }
};
