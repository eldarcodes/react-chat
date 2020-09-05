import React from 'react'
import '../scss/Login.scss'
import {Button} from '@material-ui/core'
import {auth, provider} from '../firebase/firebase'
import {useStateValue} from './../StateProvider'
import {actionTypes} from '../reducer'

const Login = () => {
  const [_, dispatch] = useStateValue()
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result)
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch((e) => console.log(e.message))
  }
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login__text">
          <h1>Войти</h1>
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={signIn}
        >
          Войти через Google
        </Button>
      </div>
    </div>
  )
}

export default Login
