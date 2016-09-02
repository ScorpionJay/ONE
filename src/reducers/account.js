import { combineReducers } from 'redux'
import {FETCH_USER} from '../ConstantsAction'

function account(state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.data
    default:
      return state
  }
}

const Reducers = combineReducers({
  account
})

export default Reducers