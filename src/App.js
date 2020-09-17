import React from 'react'
import Error404 from './components/Error404'
import ChatContainer from './containers/ChatContainer'
import SignUpContainer from './containers/SignUpContainer'
import SidebarContainer from './containers/SidebarContainer'
import LoginContainer from './containers/LoginContainer'
import {Route, Switch, Redirect} from 'react-router-dom'
import {menu} from './utils/common'

import CircularProgress from '@material-ui/core/CircularProgress'

const App = ({user, isFetching}) => {
  return (
    <div className="app">
      {isFetching ? (
        <CircularProgress />
      ) : (
        <>
          {!user ? (
            <Switch>
              <Route path="/" exact>
                <LoginContainer />
              </Route>
              <Route path="/rooms/:roomId">
                <Redirect to="/" />
              </Route>
              <Route path="/join">
                <SignUpContainer />
              </Route>
              <Route component={Error404} />
            </Switch>
          ) : (
            <div className="app__body">
              <SidebarContainer />
              <Switch>
                <Route path="/rooms/:roomId" component={ChatContainer} />
                <Route path="/" exact>
                  <div className="choose__chat">
                    <h2 onClick={menu}>Выберите чат</h2>
                  </div>
                </Route>
                <Route path="*">
                  <Redirect to="/" />
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
