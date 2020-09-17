import React from 'react'
import {Link} from 'react-router-dom'

const SignUp = ({signUp, setUsername, setEmail, setPassword}) => {
  return (
    <div className="auth__wrapper">
      <main>
        <div className="auth-form">
          <div className="auth_image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
              alt=""
            />
          </div>
          <form onSubmit={signUp}>
            <div className="auth-form-header">
              <h1>Create your account</h1>
            </div>
            <div className="auth-form-body">
              <label>Username</label>
              <input
                required
                autoFocus="autofocus"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control input-block"
              />
              <label> Email address </label>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
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
                value="Create account"
              />
            </div>
          </form>
          <p className="create-account-callout mt-3">
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default SignUp
