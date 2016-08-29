import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import reducers from '../reducers/index'

module.exports = function(initialState) {
  const logger = createLogger();
  let createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore)
  let store = createStoreWithMiddleware(reducers, initialState)
  return store
}