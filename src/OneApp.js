import React , { Component } from 'react'
import { View,Text,StyleSheet} from 'react-native'
import { connect } from 'react-redux'

import OneNavigator from './OneNavigator'
import Message from './components/Message'

import { hideMessage } from './actions/message'

class App extends Component {

  render() {
    const { dispatch,message } = this.props

    return (
        <View style={styles.container}>
          <OneNavigator />
          <Message style={styles.message} data={message} onHideMessage={()=>dispatch(hideMessage())}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  message: {
    zIndex:100
  }
})

function map(state) {
  return {
    message: state.message.message
  }
}

export default connect(map)(App)

