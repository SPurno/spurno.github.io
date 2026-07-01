// ============================================
// ShopVerse — Admin Settings
// Password change, security question, account
// ============================================

const AdminSettings = {
  async render() {
    const container = document.getElementById('adminContent');
    const user = App.getUser();

    if (!user) {
      container.innerHTML = Components.emptyState('🔒', 'Not logged in', 'Please sign in to access settings.');
      return;
    }

    container.innerHTML = `
      <div class="admin-settings page-enter">
        <!-- Account Info -->
        <div class="settings-card glass">
          <div class="settings-card-header">
            <i class="fas fa-user-shield"></i>
            <h3>Account Information</h3>
          </div>
          <div class="settings-card-body">
            <div class="settings-info-grid">
              <div class="settings-info-item">
                <div class="settings-info-label">Name</div>
                <div class="settings-info-value">${user.name || '—'}</div>
              </div>
              <div class="settings-info-item">
                <div class="settings-info-label">Email</div>
                <div class="settings-info-value">${user.email || '—'}</div>
              </div>
              <div class="settings-info-item">
                <div class="settings-info-label">Role</div>
                <div class="settings-info-value">
                  <span style="padding:2px 10px;border-radius:var(--radius-full);font-size:0.75rem;font-weight:600;background:rgba(108,99,255,0.15);color:var(--accent-1)">Administrator</span>
                </div>
              </div>
              <div class="settings-info-item">
                <div class="settings-info-label">User ID</div>
                <div class="settings-info-value" style="font-family:monospace;font-size:0.85rem">#${user.id}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Change Password -->
        <div class="settings-card glass">
          <div class="settings-card-header">
            <i class="fas fa-key"></i>
            <h3>Change Password</h3>
          </div>
          <div class="settings-card-body">
            <form onsubmit="AdminSettings.changePassword(event)" style="display:flex;flex-direction:column;gap:14px;max-width:460px">
              <div class="form-group">
                <label>Current Password</label>
                <div class="input-with-icon">
                  <i class="fas fa-lock"></i>
                  <input type="password" id="settings_current_password" placeholder="Enter current password" required>
                </div>
              </div>
              <div class="form-group">
                <label>New Password</label>
                <div class="input-with-icon">
                  <i class="fas fa-key"></i>
                  <input type="password" id="settings_new_password" placeholder="Min. 8 characters" minlength="8" required>
                </div>
              </div>
              <div class="form-group">
                <label>Confirm New Password</label>
                <div class="input-with-icon">
                  <i class="fas fa-check-circle"></i>
                  <input type="password" id="settings_confirm_password" placeholder="Confirm new password" required>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-save"></i> Update Password
              </button>
            </form>
          </div>
        </div>

        <!-- Security Question -->
        <div class="settings-card glass">
          <div class="settings-card-header">
            <i class="fas fa-shield-alt"></i>
            <h3>Security Question</h3>
          </div>
          <div class="settings-card-body">
            <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:16px">
              Set a security question and answer to recover your password if you forget it.
            </p>
            <form onsubmit="AdminSettings.saveSecurityQuestion(event)" style="display:flex;flex-direction:column;gap:14px;max-width:460px">
              <div class="form-group">
                <label>Security Question</label>
                <select id="settings_security_question" style="padding:12px 16px">
                  <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                  <option value="What city were you born in?">What city were you born in?</option>
                  <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                  <option value="What was the name of your first school?">What was the name of your first school?</option>
                  <option value="What is your favorite book?">What is your favorite book?</option>
                  <option value="What was the make of your first car?">What was the make of your first car?</option>
                  <option value="What is the name of your childhood best friend?">What is the name of your childhood best friend?</option>
                </select>
              </div>
              <div class="form-group">
                <label>Your Answer</label>
                <input type="text" id="settings_security_answer" placeholder="Enter your answer" required>
              </div>
              <div class="form-group">
                <label>Recovery Email (optional)</label>
                <input type="email" id="settings_recovery_email" placeholder="email@example.com">
                <span style="font-size:0.75rem;color:var(--text-muted);margin-top:2px">
                  A recovery code can be sent here if you forget your password
                </span>
              </div>
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-save"></i> Save Security Question
              </button>
            </form>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="settings-card glass" style="border-color:rgba(255,82,82,0.2)">
          <div class="settings-card-header" style="color:var(--error)">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Danger Zone</h3>
          </div>
          <div class="settings-card-body">
            <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:16px">
              Sign out from the admin panel. You will need to sign in again.
            </p>
            <button class="btn btn-secondary" style="border-color:var(--error);color:var(--error)" onclick="AdminSettings.logout()">
              <i class="fas fa-sign-out-alt"></i> Sign Out
            </button>
          </div>
        </div>
      </div>
    `;

    // Check if user has existing security question
    await this.checkExistingSecurity(user);
  },

  async checkExistingSecurity(user) {
    try {
      const users = await DB.query('SELECT id FROM admin_security WHERE user_id = ?', [user.id]);
      if (users.length > 0) {
        const info = document.querySelector('.settings-card:nth-child(3) .settings-card-body p');
        if (info) {
          info.innerHTML = '✅ Security question is configured. You can update it below.';
          info.style.color = 'var(--success)';
        }
      }
    } catch (e) {
      // Table might not exist yet
    }
  },

  async changePassword(event) {
    event.preventDefault();
    const currentPw = document.getElementById('settings_current_password').value;
    const newPw = document.getElementById('settings_new_password').value;
    const confirmPw = document.getElementById('settings_confirm_password').value;

    if (newPw !== confirmPw) {
      Components.toast('New passwords do not match', 'error');
      return;
    }

    if (newPw.length < 8) {
      Components.toast('New password must be at least 8 characters', 'error');
      return;
    }

    const user = App.getUser();
    if (!user) {
      Components.toast('You must be logged in', 'error');
      return;
    }

    // Verify current password against stored hash in database
    const userData = await DB.getUserByEmail(user.email);
    if (userData) {
      const hashedCurrent = await DB.hashPassword(currentPw);
      if (userData.password !== hashedCurrent) {
        Components.toast('Current password is incorrect', 'error');
        return;
      }
    }

    try {
      // Update password in the database (hashed automatically)
      await DB.updateUserPassword(user.id, newPw);
      Components.toast('Password changed successfully!', 'success');
      event.target.reset();
    } catch (error) {
      console.error('Password change error:', error);
      Components.toast('Failed to change password: ' + error.message, 'error');
    }
  },

  async saveSecurityQuestion(event) {
    event.preventDefault();
    const question = document.getElementById('settings_security_question').value;
    const answer = document.getElementById('settings_security_answer').value.trim().toLowerCase();
    const recoveryEmail = document.getElementById('settings_recovery_email').value.trim();

    if (!answer) {
      Components.toast('Please enter your answer', 'error');
      return;
    }

    const user = App.getUser();
    if (!user) {
      Components.toast('You must be logged in', 'error');
      return;
    }

    try {
      // Hash the answer (simple hash for demo)
      const answerHash = this.hashAnswer(answer);
      await DB.setSecurityQuestion(user.id, question, answerHash, recoveryEmail || null);
      Components.toast('Security question saved successfully!', 'success');
      
      const info = document.querySelector('.settings-card:nth-child(3) .settings-card-body p');
      if (info) {
        info.innerHTML = '✅ Security question is configured. You can update it below.';
        info.style.color = 'var(--success)';
      }
    } catch (error) {
      console.error('Security question error:', error);
      Components.toast('Failed to save security question: ' + error.message, 'error');
    }
  },

  hashAnswer(answer) {
    // Simple hash for demonstration
    let hash = 0;
    const str = answer.toLowerCase().trim();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return 'hash_' + Math.abs(hash).toString(16);
  },

  logout() {
    AuthPage.logout();
  }
};
