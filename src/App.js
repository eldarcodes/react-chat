import React from 'react'
import './scss/App.scss'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import {useStateValue} from './StateProvider'
import Error404 from './components/Error404'

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
          <Route component={Error404} />
        </Switch>
      ) : (
        <div className="app__body">
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId" component={Chat} />
            <Route path="/"></Route>
          </Switch>
        </div>
      )}
    </div>
  )
}

export default App
