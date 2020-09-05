import React, {useState} from 'react'
import '../scss/Login.scss'
import {Button} from '@material-ui/core'
import {auth, provider} from '../firebase/firebase'
import {useStateValue} from './../StateProvider'
import {actionTypes} from '../reducer'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'

const Login = () => {
  const [_, dispatch] = useStateValue()
  const [isFetching, setIsFetching] = useState(true)

  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: actionTypes.SET_USER,
        user,
      })
    }
    setIsFetching(false)
  })

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch((e) => console.log(e.message))
  }

  return (
    <div className="login">
      {!isFetching ? (
        // <div className="login__container">
        //   <img
        //     src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
        //     alt=""
        //   />

        //   <div className="login__text">
        //     <h1>Войти</h1>
        //   </div>
        //   <form>
        //     <div>
        //       <TextField
        //         id="outlined-basic"
        //         label="Outlined"
        //         variant="outlined"
        //       />
        //     </div>
        //     <div>
        //       <TextField
        //         id="outlined-basic"
        //         label="Outlined"
        //         variant="outlined"
        //       />
        //     </div>
        //   </form>
        //   <div className="google_signin"></div>
        <main>
          <div className="auth-form">
            <div className="auth_image">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
                alt=""
              />
            </div>
            <form action="/">
              <div className="auth-form-header">
                <h1>Sign in to Chat</h1>
              </div>
              <div className="auth-form-body">
                <label> Username or email address </label>
                <input
                  authfocus="autofocus"
                  type="text"
                  className="form-control input-block"
                />
                <label>Password</label>
                <input type="password" className="form-control input-block" />
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="Sign in"
                />
                <div>
                  <button type="submit" className="btn btn-google btn-block">
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt=""
                    />
                    Sign in with google
                  </button>
                </div>
              </div>
            </form>
            <p class="create-account-callout mt-3">
              New to GitHub?
              <a href="#">Create an account</a>.
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
