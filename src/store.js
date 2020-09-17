import {createStore, combineReducers} from 'redux'
import authReducer from './reducers/authReducer'

let reducers = combineReducers({
  auth: authReducer,
})

let store = createStore(reducers)

export default store
