import React, {Component} from 'react'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './store'
import JPushModule from 'jpush-react-native'

export default class Setup extends Component {

  constructor() {
    super();
    this.state = {
      store: configureStore()
    }
  }

  componentDidMount() {
    JPushModule.initPush();
    JPushModule.addReceiveCustomMsgListener((message) => {
      this.setState({pushMsg: message});
    });
    JPushModule.addReceiveNotificationListener((message) => {
      console.log("receive notification: " + message);
    })
  }

  componentWillUnmount() {
    JPushModule.removeReceiveCustomMsgListener();
    JPushModule.removeReceiveNotificationListener();
  }
  
  render() {
     return (
        <Provider store={this.state.store}>
          <App/>
        </Provider>
      )
  }
  
}