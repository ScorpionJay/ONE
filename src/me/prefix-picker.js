import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Picker} from 'react-native-prefix-picker';

import Me from './Me'
import ToolBar from '../common/ToolBar'
export default class Account extends Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  }

  handler(){
    console.log(this.props)
    const { navigator } = this.props
    navigator.push({title:'third',id:'third'}

    )
    //Alert.alert('hi','hi');
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginTop: 80,
          padding: 20,
        }}
      >
        <Picker
          style={{
            width: 80,
            height: 64,
            marginRight: 8,
          }}
          styleLabel={{
            fontSize: 14,
          }}
          styleValue={{
            fontSize: 14,
          }}
          transparent
          onSubmit={(option) => {
            this.setState({
              prefix: option,
            });
          }}
        />
        <Text
          style={{
            fontSize: 40,
            textAlign: 'center',
            margin: 10,
            color: '#f87f1d',
          }}
        >
          TEST
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

