import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'

import Home from './home/Home'
import Me from './me/Me'

import Config from './Config'

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab:Config.initTab
    };
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Home'}
          title="首页"
          renderIcon={() => <Icon name="star-o" size={25} color="#aaa" />}
          renderSelectedIcon={() => <Icon name="star" size={25} color="#238CFE" />}
          onPress={() => this.setState({ selectedTab: 'Home' })}>
          <Home/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Me'}
          title="我"
          renderIcon={() => <Icon name="user" size={25} color="#aaa" />}
          renderSelectedIcon={() => <Icon name="user" size={25} color="#238CFE" />}
          onPress={() => this.setState({ selectedTab: 'Me' })}>
           <Me />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width:30,
    height:30
  }
});

