import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';

import ToolBar from '../common/ToolBar'
import ListCompontent from '../home/ListCompontent'

export default class Find extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <View style={styles.container}>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          <ScrollView>
            <ListCompontent navigator={this.props.navigator} route={this.props.route}/>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

