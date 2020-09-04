import React from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import App from './App'
import reducer, {initialState} from './reducer'
import {StateProvider} from './StateProvider'
import {BrowserRouter as Router} from 'react-router-dom'
import Error404 from './components/Error404'

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        
        <App />
      </Router>
    </StateProvider>
  </React.StrictMode>,

  document.getElementById('root')
)
