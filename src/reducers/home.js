import { combineReducers } from 'redux'
import {FETCH_LIST,FETCH_LIST_ITEM} from '../actions/Actions'

function fetchList(state = [], action) {
  switch (action.type) {
    case FETCH_LIST:
      return action.text
    default:
      return state
  }
}

function fetchItem(state = [], action) {
  switch (action.type) {
    case FETCH_LIST_ITEM:
      return Object.assign({}, action.value)
    default:
      return state
  }
}

const Reducers = combineReducers({
  fetchList,fetchItem
})

export default Reducers