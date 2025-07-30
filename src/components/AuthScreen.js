export class AuthScreen {
  constructor(onAuthSuccess) {
    this.onAuthSuccess = onAuthSuccess
    this.isSignUp = false
  }

  render() {
    return `
      <div class="auth-overlay">
        <div class="auth-container">
          <div class="auth-header">
            <div class="auth-logo">
              <div class="logo-icon">💬</div>
              <h1>BabaPiroChat2</h1>
            </div>
            <p class="auth-subtitle">Connect with friends and chat in real-time</p>
          </div>
          
          <div class="auth-form-container">
            <div class="auth-tabs">
              <button class="auth-tab ${!this.isSignUp ? 'active' : ''}" data-tab="signin">
                Sign In
              </button>
              <button class="auth-tab ${this.isSignUp ? 'active' : ''}" data-tab="signup">
                Sign Up
              </button>
            </div>
            
            <form class="auth-form" id="authForm">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required placeholder="Enter your email">
              </div>
              
              ${this.isSignUp ? `
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" id="username" required placeholder="Choose a username">
                </div>
              ` : ''}
              
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" required placeholder="Enter your password">
              </div>
              
              ${this.isSignUp ? `
                <div class="form-group">
                  <label for="confirmPassword">Confirm Password</label>
                  <input type="password" id="confirmPassword" required placeholder="Confirm your password">
                </div>
              ` : ''}
              
              <button type="submit" class="auth-submit-btn">
                ${this.isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>
            
            <div class="auth-divider">
              <span>or</span>
            </div>
            
            <div class="social-auth">
              <button class="social-btn google-btn">
                <span class="social-icon">🔍</span>
                Continue with Google
              </button>
              <button class="social-btn github-btn">
                <span class="social-icon">⚡</span>
                Continue with GitHub
              </button>
            </div>
            
            <div class="auth-footer">
              <p>
                ${this.isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button class="auth-switch-btn" id="authSwitchBtn">
                  ${this.isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabType = e.target.dataset.tab
        this.isSignUp = tabType === 'signup'
        this.updateForm()
      })
    })

    // Form submission
    document.getElementById('authForm').addEventListener('submit', (e) => {
      e.preventDefault()
      this.handleAuth()
    })

    // Switch between sign in/up
    document.getElementById('authSwitchBtn').addEventListener('click', () => {
      this.isSignUp = !this.isSignUp
      this.updateForm()
    })

    // Social auth buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.handleSocialAuth(btn.classList.contains('google-btn') ? 'google' : 'github')
      })
    })
  }

  updateForm() {
    const container = document.querySelector('.auth-form-container')
    const formHTML = this.render().match(/<div class="auth-form-container">([\s\S]*?)<\/div>$/)[1]
    container.innerHTML = formHTML
    this.bindEvents()
  }

  handleAuth() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const username = this.isSignUp ? document.getElementById('username').value : null
    const confirmPassword = this.isSignUp ? document.getElementById('confirmPassword').value : null

    // Basic validation
    if (this.isSignUp && password !== confirmPassword) {
      this.showError('Passwords do not match!')
      return
    }

    if (password.length < 6) {
      this.showError('Password must be at least 6 characters long!')
      return
    }

    // Simulate authentication
    this.showLoading()
    
    setTimeout(() => {
      const userData = {
        email,
        username: username || email.split('@')[0],
        avatar: this.getRandomAvatar()
      }
      
      localStorage.setItem('babapiro_user', JSON.stringify(userData))
      this.onAuthSuccess(userData)
    }, 1500)
  }

  handleSocialAuth(provider) {
    this.showLoading()
    
    setTimeout(() => {
      const userData = {
        email: `user@${provider}.com`,
        username: `${provider}_user_${Math.floor(Math.random() * 1000)}`,
        avatar: this.getRandomAvatar()
      }
      
      localStorage.setItem('babapiro_user', JSON.stringify(userData))
      this.onAuthSuccess(userData)
    }, 1000)
  }

  showError(message) {
    // Remove existing error
    const existingError = document.querySelector('.auth-error')
    if (existingError) existingError.remove()

    const errorDiv = document.createElement('div')
    errorDiv.className = 'auth-error'
    errorDiv.textContent = message
    
    const form = document.getElementById('authForm')
    form.insertBefore(errorDiv, form.firstChild)
    
    setTimeout(() => errorDiv.remove(), 5000)
  }

  showLoading() {
    const submitBtn = document.querySelector('.auth-submit-btn')
    submitBtn.disabled = true
    submitBtn.innerHTML = `
      <div class="loading-spinner"></div>
      ${this.isSignUp ? 'Creating Account...' : 'Signing In...'}
    `
  }

  getRandomAvatar() {
    const avatars = ['👤', '👨‍💻', '👩‍💻', '🧑‍🎓', '👨‍🔬', '👩‍🔬', '🧑‍🎨', '👨‍🎨', '👩‍🎨', '🧑‍💼']
    return avatars[Math.floor(Math.random() * avatars.length)]
  }
}