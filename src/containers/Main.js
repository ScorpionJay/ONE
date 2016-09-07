import React, { Component } from 'react'
import {
  StyleSheet,
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'

import Home from './home/Home'
import Find from './Find'
import Attention from './Attention'
import Me from './me/Me'
import Config from '../Config'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Test extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab:Config.initTab
    }
  }

  render() {
    return (
      <TabNavigator>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'Home'}
          title="首页"
          renderIcon={() => <Icon name="star-o" size={25} color="#aaa" />}
          renderSelectedIcon={() => <Icon name="star" size={25} color="#238CFE" />}
          onPress={() => {this.setState({ selectedTab: 'Home' });this.props.route.title='首页'}}>
          <Home navigator={this.props.navigator} route={this.props.route}/>
        </TabNavigator.Item>
        
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Find'}
          title="发现"
          renderIcon={() => <Icon name="dot-circle-o" size={25} color="#aaa" />}
          renderSelectedIcon={() => <Icon name="dot-circle-o" size={25} color="#238CFE" />}
          onPress={() => {this.setState({ selectedTab: 'Find' });this.props.route.title='发现' } }>
          <Find navigator={this.props.navigator} route={this.props.route}/>
        </TabNavigator.Item>
        
        <TabNavigator.Item
          selected={this.state.selectedTab === 'Attention'}
          title="关注"
          renderIcon={() => <Icon name="reorder" size={25} color="#aaa" />}
          renderSelectedIcon={() => <Icon name="reorder" size={25} color="#238CFE" />}
          onPress={() => {this.setState({ selectedTab: 'Attention' });this.props.route.title='关注' } }>
          <Find navigator={this.props.navigator} route={this.props.route}/>
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab === 'Me'}
          title="我"
          renderIcon={() => <Icon name="user" size={25} color="#aaa" />}
          renderSelectedIcon={() => <Icon name="user" size={25} color="#238CFE" />}
          onPress={() => {this.setState({ selectedTab: 'Me' });this.props.route.title='我' } }>
          <Me navigator={this.props.navigator} route={this.props.route}/>
         </TabNavigator.Item>
      
      </TabNavigator>
    )
  }
}

const styles = StyleSheet.create({

})

