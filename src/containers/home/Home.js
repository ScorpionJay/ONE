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

import ToolBar from '../../common/ToolBar'
import CarouselCompont from '../../common/RNCarousel'
import ListCompontent from './ListCompontent'

import { connect } from 'react-redux'
import { fetchList,fetchListItem } from '../../actions/home'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(fetchList())
  }
  
  render() {
    return (
      <View style={styles.container}>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          <CarouselCompont navigator={this.props.navigator} route={this.props.route}/>
          <ScrollView>
            <ListCompontent navigator={this.props.navigator} route={this.props.route} listData={this.props.data}/>
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


function map(state) {
  return {
    data: state.home.fetchList
  }
}

export default connect(map)(App)
