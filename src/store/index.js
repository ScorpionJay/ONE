// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import createLogger from 'redux-logger';
// import reducers from '../reducers/index'
// var {AsyncStorage} = require('react-native');
// import {persistStore, autoRehydrate} from 'redux-persist'

//  let logger = createLogger();
//   let createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore)

// module.exports = function(onComplete: ?() => void) {
//   const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
//   persistStore(store, {storage: AsyncStorage}, onComplete);
//   return store;
// }


import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';
import reducers from '../reducers/index'
import {AsyncStorage} from 'react-native'
import {persistStore, autoRehydrate} from 'redux-persist'

module.exports = function(onComplete: ?() => void) {
  const logger = createLogger();
  let createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore)
  const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
  persistStore(store, {storage: AsyncStorage}, onComplete);
  return store
}
