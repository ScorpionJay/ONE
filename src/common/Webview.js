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

export default class Webview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url:this.props.route.params.url
    };
  }

  render() {
    return (
      <View style={styles.container}>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          <WebView source={{uri: this.state.url}} style={styles.webView}/>

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
   flex: 1,
  },
});


