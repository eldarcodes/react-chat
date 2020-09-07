import React, {useState, useEffect} from 'react'
import {auth, provider} from '../firebase/firebase'
import {useStateValue} from './../StateProvider'
import {actionTypes} from '../reducer'
import CircularProgress from '@material-ui/core/CircularProgress'
import {Link} from 'react-router-dom'

const Login = () => {
  const [_, dispatch] = useStateValue()
  const [isFetching, setIsFetching] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: actionTypes.SET_USER,
          user,
        })
      }
      setIsFetching(false)
    })
  }, [dispatch])

  const signInWithGoogle = (e) => {
    e.preventDefault()
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch((e) => alert(e.message))
  }

  const signInWithPassword = (e) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password).catch((err) => alert(err))
  }

  return (
    <div className="login auth__wrapper">
      {!isFetching ? (
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
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}

export default Login
