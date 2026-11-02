
import { useState } from 'react'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleLogin(e) {
    e.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    // Demo Admin Login
    if (
      normalizedEmail === 'admin@librax.com' &&
      password === 'Admin@123'
    ) {
      onLogin({
        name: 'Admin',
        email: normalizedEmail,
        role: 'admin'
      })
      return
    }

    // Registered User Login
    const users = JSON.parse(localStorage.getItem('users')) || []

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === normalizedEmail &&
        u.password === password
    )

    if (user) {
      onLogin(user)
    } else {
      alert('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-brand-panel">
        <div className="auth-brand-content">
          <div className="auth-logo">
            <span>📚</span>
            <h1>LibraX</h1>
          </div>

          <span className="auth-brand-tag">
            YOUR DIGITAL LIBRARY
          </span>

          <h2>
            Discover.
            <br />
            Learn.
            <br />
            Grow.
          </h2>

          <p>
            Your knowledge journey starts here.
            Explore books, discover ideas and
            build your future with LibraX.
          </p>

          <div className="auth-brand-decoration">
            <span>📖</span>
            <span>✨</span>
            <span>📚</span>
          </div>
        </div>

        <div className="auth-brand-footer">
          Read more. Learn more. Become more.
        </div>
      </div>

      <div className="auth-form-panel">

        <div className="auth-form-card">

          <div className="auth-mobile-logo">
            📚 LibraX
          </div>

          <span className="auth-form-tag">
            WELCOME BACK
          </span>

          <h2>Login to your account</h2>

          <p className="auth-description">
            Enter your details to continue your learning journey.
          </p>

          <form onSubmit={handleLogin}>

            <label htmlFor="login-email">
              Email Address
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />

            <label htmlFor="login-password">
              Password
            </label>

            <div className="auth-password-field">

              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>

            </div>

            <button className="auth-submit-button" type="submit">
              Login to LibraX <span>→</span>
            </button>

          </form>

          <div className="auth-divider">
            <span>LIBRAX LIBRARY</span>
          </div>

          <div className="auth-admin-note">
            <strong>Admin Demo Access</strong>
            <p>Email: admin@librax.com</p>
            <p>Password: Admin@123</p>
          </div>

          <p className="auth-switch-text">
            Don't have an account?{' '}
            <a href="#signup">Sign up</a>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login
