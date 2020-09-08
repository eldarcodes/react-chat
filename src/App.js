import React from 'react'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import {useStateValue} from './StateProvider'
import Error404 from './components/Error404'
import SignUp from './components/SignUp'

const App = () => {
  const [{user}, dispatch] = useStateValue()

  const menu = () => {
    document.querySelector('.sidebar').classList.toggle('close')
    document.querySelector('.sidebar').classList.toggle('open')
  }

  return (
    <div className="app">
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
