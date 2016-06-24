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

export default class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab:'Home'
    };
  }

  render() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Home'}
          title="首页"
          renderIcon={() => <Image source={require('./images/star2.png')} style= {styles.img}/>}
          renderSelectedIcon={() => <Image source={require('./images/star1.png')} style= {styles.img}/>}
          onPress={() => this.setState({ selectedTab: 'Home' })}>
          <Home/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Me'}
          title="我"
          renderIcon={() => <Image source={require('./images/me2.png')} style= {styles.img}/>}
          renderSelectedIcon={() => <Image source={require('./images/me1.png')} style= {styles.img}/>}
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

