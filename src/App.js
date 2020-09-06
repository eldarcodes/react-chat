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
                <h2>Выберите чат</h2>
              </div>
            </Route>
          </Switch>
        </div>
      )}
    </div>
  )
}

export default App
