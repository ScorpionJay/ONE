import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import ToolBar from '../../common/ToolBar'
import Config from '../../Config'

import { connect } from 'react-redux'
import { fetchListItemApi } from '../../actions/home'

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {}
  }


  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchListItemApi(this.props.route.params.id))
  }

  render() {
    const {name,description} = this.props.item

    return (
      <View>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          <TouchableOpacity>
            <Text>name: {name}</Text>
            <Text>description: {description}</Text>
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
    backgroundColor: 'red',
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


function map(state) {
  return {
    item: state.home.fetchItem
  }
}

export default connect(map)(App)


