import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import ToolBar from '../common/ToolBar'
export default class Tab extends Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  }

   handler(){
    console.log(this.props)
    const { navigator } = this.props
  }

  render() {
    return (
      <View>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          <TouchableOpacity onPress={this.handler.bind(this)}>
            <Text>hello world</Text>
          </TouchableOpacity>
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

