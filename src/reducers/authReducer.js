import {SET_USER_DATA} from './../types'

let initialState = {
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {...state, user: action.payload}

    default:
      return state
  }
}

export const setUserData = (user) => ({
  type: SET_USER_DATA,
  payload: user,
})

export default authReducer
