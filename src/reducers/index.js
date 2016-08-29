import { combineReducers } from 'redux'
import  home from './home'
import  login from './login'

const reducers = combineReducers({
  home,login
})

export default reducers