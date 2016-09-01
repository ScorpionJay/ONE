import { combineReducers } from 'redux'
import  home from './home'
import  login from './login'
import  message from './message'

const reducers = combineReducers({
  home,login,message
})

export default reducers