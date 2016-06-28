import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import Login from './Login'
import Main from './Main'

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  hanlder(){
    const {navigator} = this.props
    navigator.push({
        id: 'main'
    })
  }

  render() {
    return (
      <TouchableOpacity onPress={this.hanlder.bind(this)} style={styles.container} >
         <Image
          source={require("./images/demo12.jpg")}
          style={styles.img}
        />

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  img:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});

