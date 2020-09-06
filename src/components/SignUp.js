import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../firebase/firebase'
import {actionTypes} from '../reducer'
import {useStateValue} from './../StateProvider'
import CircularProgress from '@material-ui/core/CircularProgress'

const SignUp = () => {
  const [_, dispatch] = useStateValue()
  const [email, setEmail] = useState('')
  const [isFetching, setIsFetching] = useState(true)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

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

  const signUp = (e) => {
    e.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: res.user,
        })
      )
      .then(() => {
        auth.currentUser
          .updateProfile({
            displayName: username,
            photoURL: '',
          })

          .catch((error) => {
            alert(error)
          })
      })
      .catch((err) => alert(err))
  }
  return (
    <div className="auth__wrapper">
      {!isFetching ? (
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
      ) : (
        <CircularProgress />
      )}
    </div>
  )
}

export default SignUp
