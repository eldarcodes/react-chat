import React from 'react'
import {Link} from 'react-router-dom'

const Login = ({
  signInWithPassword,
  signInWithGoogle,
  setEmail,
  setPassword,
}) => {
  return (
    <div className="login auth__wrapper">
      <main>
        <div className="auth-form">
          <div className="auth_image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
              alt=""
            />
          </div>
          <form onSubmit={signInWithPassword}>
            <div className="auth-form-header">
              <h1>Sign in to Chat</h1>
            </div>
            <div className="auth-form-body">
              <label> Email address </label>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                autoFocus="autofocus"
                type="email"
                className="form-control input-block"
              />
              <label>Password</label>
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control input-block"
              />
              <input
                type="submit"
                className="btn btn-primary btn-block"
                value="Sign in"
              />
              <button
                onClick={signInWithGoogle}
                className="btn btn-google btn-block"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt=""
                />
                Sign in with google
              </button>
            </div>
          </form>
          <p className="create-account-callout mt-3">
            New to Chat?
            <Link to="/join">Create an account</Link>.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Login
