import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  hanlder(){
    const {navigator} = this.props


    // 登录过则免登录，直接跳主页 ??? 自动登录
    storage.load({
      key: 'loginState',
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
      autoSync: true,
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用同步方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: true
      }).then(ret => {
        //如果找到数据，则在then方法中返回
        console.log(ret.userid);
        // Alert.alert('',ret.userid);
        this.props.navigator.replace({
                    title: '首页',
                    id: 'main'
                  })
      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        //console.warn(err);

        navigator.replace({
          id: 'login',
          title: '登录'
        })

      })

      
  }

  render() {
    return (
      <TouchableOpacity onPress={this.hanlder.bind(this)} style={styles.container} >
         <Image
          source={require("./images/demo12.jpg")}
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

