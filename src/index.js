import React from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import App from './App'
import reducer, {initialState} from './reducer'
import {StateProvider} from './StateProvider'

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,

  document.getElementById('root')
)
