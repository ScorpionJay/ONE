import { combineReducers } from 'redux'
import { LOGIN,LOGIN_ERROR } from '../actions/login'

function login(state = '', action) {
  switch (action.type) {
    case LOGIN:
      return action.token
    case LOGIN_ERROR:
      return action.text
    default:
      return state
  }
}

const Reducers = combineReducers({
  login
})

export default Reducers