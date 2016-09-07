import { combineReducers } from 'redux'
import {LOGIN} from '../actions/Actions'

function login(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return {...action.user}
    default:
      return state
  }
}

const Reducers = combineReducers({
  login
})

export default Reducers