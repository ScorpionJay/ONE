import React, { Component } from 'react';
import {
      AppRegistry,
      StyleSheet,
      Text,
      View,
      ToolbarAndroid,
      TextInput,
      TouchableOpacity,
      Alert,ToastAndroid,
      Image,
      TouchableHighlight,
      NetInfo
} from 'react-native';

import ToolBar from '../common/ToolBar'
import Main from '../Main'
import Config from '../Config'

import { connect } from 'react-redux'
import { fetchLogin} from '../actions/login'

class App extends Component {
  constructor(props) {
        super(props);
        this.state = {
          username:this.props.route.params ? this.props.route.params.username : '',
          password:'',
          data:null,
        };
       this.login = this.login.bind(this);
  }

  login(){
      let {username,password} = this.state
      if(username==''||username==undefined){
          ToastAndroid.show('用户名不能为空', ToastAndroid.SHORT);
          return;
      }

      if(password==''||password==undefined){
          ToastAndroid.show('密码不能为空', ToastAndroid.SHORT);
          return;
      }
    // 需要检验
    this.fetchData();
  }

  redirect(){
    this.props.navigator.replace({
          title: '首页',
          id: 'main'
    })
  }

  // 获取数据方法
    fetchData() {

      // 需要判断是否联网 https://facebook.github.io/react-native/docs/netinfo.html
      NetInfo.fetch().done((reach) => {
        console.log('Initial: ' + reach);
        //ToastAndroid.show('使用的网络' + reach, ToastAndroid.SHORT)
        if( reach.toUpperCase() === 'NONE' || reach.toUpperCase === 'UNKNOWN' ){
            ToastAndroid.show('没有网络', ToastAndroid.SHORT)
        }else{
           const { dispatch } = this.props
          dispatch(fetchLogin(this.state.username,this.state.password,()=>this.redirect()))

          // fetch(Config.loginUrl,{
          //     headers: {
          //       'Username': this.state.username,
          //       'Password': this.state.password
          //     },
          //     method: 'POST'
          //   })
          //   .then((response) => {
          //         const authToken = response.headers.get("Auth-Token");
          //         if(authToken){
          //           // Alert.alert('',authToken);
          //           storage.save({
          //             key: 'loginState',  //注意:请不要在key中使用_下划线符号!
          //             rawData: { 
          //               from: 'some other site',
          //               userid: this.state.username,
          //               token: authToken
          //             },
          //             // 如果不指定过期时间，则会使用defaultExpires参数
          //             // 如果设为null，则永不过期
          //             expires: 1000 * 3600
          //           });  

          //           this.props.navigator.replace({
          //                 title: '首页',
          //                 id: 'main'
          //           })

          //         }else{
          //           ToastAndroid.show('帐号或密码错误',ToastAndroid.SHORT);
          //         }
          //   })
          //   .catch(function(ex) {
          //     console.log('parsing failed', ex)
          //     ToastAndroid.show('请求失败'+ex, ToastAndroid.SHORT)
          //   })
        }
      });



      
    }

  render() {
    return (
      <View style={{backgroundColor:'#f4f4f4',flex:1}}>

        <ToolBar navigator={this.props.navigator} route={this.props.route}/>

          <Image
              style={styles.style_image}
              source={require('../../logo.png')}/>

          <View>
          <TextInput  placeholder='用户名' placeholderTextColor="#aaa"
                      style={styles.style_user_input}
                      autoFocus={true}
                      numberOfLines={1}
                      underlineColorAndroid={'transparent'}
                      textAlign='center'
                      value={this.state.username}
                      onChangeText={(username) => this.setState({username})}/>
              <View style={{height:1,backgroundColor:'#f4f4f4'}}/>

              <TextInput placeholder='密码' placeholderTextColor="#aaa"
                             style={styles.style_pwd_input}
                             numberOfLines={1}
                             underlineColorAndroid={'transparent'}
                             secureTextEntry={true}
                             textAlign='center'
                             value={this.state.password}
                             onChangeText={(password) => this.setState({password})}/>


            <View style={{marginTop: 32,marginLeft: 16,marginRight:16,elevation: 4,backgroundColor:'#ff9800'}}>
                <TouchableHighlight
                    onPress={() => this.login()}
                    underlayColor={'#999'}
                    style={{height: 48,alignItems: 'center',justifyContent:'center'}}>
                    <Text style={{fontSize: 16,color: 'white',fontWeight: '300',}}>登        录</Text>
                </TouchableHighlight>
            </View>

          <View style={styles.options}>
              <Text style={styles.unlogin}>没有账号?</Text>
              <TouchableOpacity onPress={()=>{this.props.navigator.push({id:'main', title: '首页',})}}>
                <Text style={styles.unlogin}>体验一下</Text>
              </TouchableOpacity>
              <Text style={styles.newUser} onPress={()=> this.props.navigator.push({id:'register',title:'注册'})}>立即注册</Text>
          </View>

        </View>
        
      </View>
    );
  }
}


function map(state) {
  return {
    token: state.login.login
  }
}

export default connect(map)(App)

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
  },
    style_image:{
        borderRadius:35,
        height:70,
        width:70,
        marginTop:40,
        alignSelf:'center',
    },
    style_user_input:{
        backgroundColor:'#fff',
        marginTop:10,
        height:35,
    },
    style_pwd_input:{
        backgroundColor:'#fff',
        height:35,
        justifyContent:'flex-start',
    },

});


