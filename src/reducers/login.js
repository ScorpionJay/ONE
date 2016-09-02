import { combineReducers } from 'redux'
import {LOGIN} from '../ConstantsAction'

function login(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return {username:action.username,token:action.token}
    default:
      return state
  }
}

const Reducers = combineReducers({
  login
})

export default Reducers