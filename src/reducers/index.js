import { combineReducers } from 'redux'
import  home from './home'
import  login from './login'
import  message from './message'
import  account from './account'

const reducers = combineReducers({
  home,login,message,account
})

export default reducers