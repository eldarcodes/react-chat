import React from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import App from './App'
import reducer, {initialState} from './reducer'
import {StateProvider} from './StateProvider'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
      <App />
    </Router>
  </StateProvider>,

  document.getElementById('root')
)
