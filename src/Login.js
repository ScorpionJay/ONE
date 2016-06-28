import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import Main from './Main'

//const REQUEST_URL = './json/data.json';

  const REQUEST_URL = 'https://gist.githubusercontent.com/ScorpionJay/de11dc5bacefea9cee5394b73f456688/raw/e86fd421e4bce5c85dd87d29ddc7315ec1d33eed/list.json';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      data:null,
    };

     // this.props.navigator.push({
     //          name: '首页',
     //          component: Main
     //        })
  }


        

  login(){
    let {username,password} = this.state
    //Alert.alert("提示", `username: ${username} ,password:${password}`)

    this.fetchData();
  }

  // 获取数据方法
    fetchData() {
      fetch(REQUEST_URL)
        .then((response) => response.json())
         .then((responseData) => {
          this.setState({
            data: responseData,
           });

           Alert.alert('',JSON.stringify(responseData));

          // 判断
          if(true){
            this.props.navigator.push({
              name: '首页',
              id:'main'
            })
          }  

         })
        .done();
    }

  render() {
    return (
      <View>

        <ToolbarAndroid title="Login"
         titleColor="#fff"
         style={styles.toolbar}/>

        <View>
          
          <TextInput placeholder='username' placeholderTextColor="#aaa"
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}/>

          <TextInput placeholder='password' placeholderTextColor="#aaa"
           secureTextEntry={true}
           value={this.state.password}
           onChangeText={(password) => this.setState({password})}/>

          <TouchableOpacity style={styles.btn} onPress={() => this.login()}>
              <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.options}>
              <Text style={styles.unlogin}>Can't login?</Text>
              <Text style={styles.newUser}>Register</Text>
          </View>

        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'red',
    height: 56,
    elevation: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btn: {
    backgroundColor: "#666",
    height: 40,
    borderRadius: 8,
    marginLeft:10,
    marginRight:10,
    marginTop:30,      
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff'
  },
  options: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginTop:30
  },
  unlogin: {
      color: '#63B8FF',
      marginLeft: 10
  },
  newUser: {
      flex: 1,
      alignItems: 'flex-end',
      flexDirection: 'row',
      textAlign: 'right',
      marginRight: 10,
      color: '#63B8FF'
  }
});


