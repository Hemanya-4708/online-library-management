
import { useState } from 'react'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleSignup(e) {
    e.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedName = name.trim()

    if (password.length < 6) {
      alert('Password must contain at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []

    const existingUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    )

    if (existingUser) {
      alert('This email is already registered!')
      return
    }

    const newUser = {
      name: normalizedName,
      email: normalizedEmail,
      password,
      role: 'user'
    }

    users.push(newUser)

    localStorage.setItem('users', JSON.stringify(users))

    alert('Signup successful! You can now login.')

    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
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
            A World
            <br />
            of Knowledge
            <br />
            Awaits You.
          </h2>

          <p>
            Create your account and explore a world
            of books, knowledge and endless learning
            opportunities with LibraX.
          </p>

          <div className="auth-brand-decoration">
            <span>📖</span>
            <span>✨</span>
            <span>📚</span>
          </div>

        </div>

        <div className="auth-brand-footer">
          Every book opens a new possibility.
        </div>
      </div>

      <div className="auth-form-panel">

        <div className="auth-form-card">

          <div className="auth-mobile-logo">
            📚 LibraX
          </div>

          <span className="auth-form-tag">
            GET STARTED
          </span>

          <h2>Create Your Account</h2>

          <p className="auth-description">
            Join LibraX and start your learning journey today.
          </p>

          <form onSubmit={handleSignup}>

            <label htmlFor="signup-name">
              Full Name
            </label>

            <input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />

            <label htmlFor="signup-email">
              Email Address
            </label>

            <input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            <label htmlFor="signup-password">
              Create Password
            </label>

            <div className="auth-password-field">

              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={6}
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

            <label htmlFor="signup-confirm-password">
              Confirm Password
            </label>

            <input
              id="signup-confirm-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <button className="auth-submit-button" type="submit">
              Create Account <span>→</span>
            </button>

          </form>

          <div className="auth-divider">
            <span>LIBRAX LIBRARY</span>
          </div>

          <div className="auth-benefits">
            <p>✓ Access the book collection</p>
            <p>✓ Request your favourite books</p>
            <p>✓ Track your book requests</p>
          </div>

          <p className="auth-switch-text">
            Already have an account?{' '}
            <a href="#login">Login</a>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Signup
