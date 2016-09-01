import { combineReducers } from 'redux'
import * as Actions from '../ConstantsAction'

function message(state = {}, action) {
  switch (action.type) {
    case Actions.SHOW_MESSAGE:
      return {value:action.text}
    case Actions.HIDE_MESSAGE:
      return {}
    default:
      return state
  }
}

const Reducers = combineReducers({
  message
})

export default Reducers