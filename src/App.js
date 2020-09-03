import React from 'react'
import './scss/App.scss'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const App = () => {
  return (
    <div className="app">
      <div className="app__body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/" exact>
              {/* <Chat /> */}
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  )
}

export default App
