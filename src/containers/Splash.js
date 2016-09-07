import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native'

import { connect } from 'react-redux'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  hanlder(){
    const {navigator,login} = this.props
    // 判断登录
    if ( login.token !== '' && login.token) {
      navigator.replace({
            title: '首页',
            id: 'main'
          })
    }else{
        navigator.replace({
          id: 'login',
          title: '登录'
        })
    }

    // navigator.replace({
    //         title: '首页',
    //         id: 'main'
    //       })
      
  }

  render() {
    return (
      <TouchableOpacity onPress={this.hanlder.bind(this)} style={styles.container} >
         <Image
          source={require("../images/way.jpg")}
          style={styles.img}
        />

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  img:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});


function map(state) {
  return {
    login: state.login.login
  }
}

export default connect(map)(App)

