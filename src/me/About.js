import React, { Component } from 'react';
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
  WebView
} from 'react-native';

import ToolBar from '../common/ToolBar'

const REQUEST_URL = 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000';


export default class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>

          <ToolBar navigator={this.props.navigator} route={this.props.route}/>

          <WebView source={{uri: 'http://scorpionjay.github.io/about/'}} style={styles.webView}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
   webView: {
    height: 500,
  },


  toolbar: {
    backgroundColor: '#03A9F4',
    height: 56,
    elevation: 5
  },


});


