import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TextInput,
  TouchableOpacity,
  Alert,
  ListView,
  Image,
  ScrollView,
  ToastAndroid,
  RefreshControl,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import ToolBar from '../common/ToolBar'

import Config from '../Config'

export default class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
     
    };
  }



  render() {
    return (
      <View style={styles.container}>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    }
});


