import React, {useEffect, useState} from 'react'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import {useStateValue} from './StateProvider'
import Error404 from './components/Error404'
import SignUp from './components/SignUp'
import {auth} from './firebase/firebase'
import {actionTypes} from './reducer'
import CircularProgress from '@material-ui/core/CircularProgress'

const App = () => {
  const [{user}, dispatch] = useStateValue()
  const [isFetching, setIsFetching] = useState(true)

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

  const menu = () => {
    document.querySelector('.sidebar').classList.toggle('close')
    document.querySelector('.sidebar').classList.toggle('open')
  }

  return (
    <div className="app">
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          {!user ? (
            <Switch>
              <Route path="/" exact>
                <Login />
              </Route>
              <Route path="/rooms/:roomId">
                <Redirect to="/" />
              </Route>
              <Route path="/join">
                <SignUp />
              </Route>
              <Route component={Error404} />
            </Switch>
          ) : (
            <div className="app__body">
              <Sidebar />
              <Switch>
                <Route path="/join">
                  <Redirect to="/" />
                </Route>
                <Route path="/rooms/:roomId" component={Chat} />
                <Route path="/">
                  <div className="choose__chat">
                    <h2 onClick={menu}>Выберите чат</h2>
                  </div>
                </Route>
              </Switch>
            </div>
          )}
        </>
      )}
      <footer>
        Created by
        <a
          rel="noopener noreferrer"
          href="https://github.com/mirzabekov00"
          target="_blank"
        >
          Eldar Myrzabekov
        </a>
      </footer>
    </div>
  )
}

export default App
