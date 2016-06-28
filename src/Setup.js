/**
* setup
*/
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Navigator
} from 'react-native'

import Splash from './Splash'
import Login from './Login'
import Main from './Main'

import Storage from 'react-native-storage'

export default class Setup extends Component {

  _renderScene(route, navigator){
    switch(route.id){
      case 'splash':
            return <Splash navigator={navigator} {...route.params}/>
            break;
      case 'login':
            return <Login navigator={navigator} {...route.params}/>
            break;
      case 'main':
            return <Main navigator={navigator} {...route.params}/>
            break;
    }
  }

  render() {
    return (
        <Navigator
          initialRoute={{ title: '欢迎页', id:'splash'}}
          renderScene={this._renderScene}
        />      
    );
  }
}


