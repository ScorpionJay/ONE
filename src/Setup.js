import React, {Component} from 'react'
import { Provider } from 'react-redux'
import OneApp from './OneApp'
import configureStore from './store'

export default class Setup extends Component {

  constructor() {
    super();
    this.state = {
      store: configureStore()
    }
  }
  
  render() {
     return (
        <Provider store={this.state.store}>
          <OneApp/>
        </Provider>
      )
  }
  
}