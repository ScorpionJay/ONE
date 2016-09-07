import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TextInput,
  TouchableOpacity,
  Alert,
  ListView,
  Image,
  ScrollView,
  ToastAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Setting from './About'
import ToolBar from '../../common/ToolBar'

import Config from '../../Config'

import { connect } from 'react-redux'
import { fetchAccount } from '../../actions/account'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username:'',
      img:"test",
      token:null,
    };

  }

  componentDidMount() {
    
    const {navigator,login,dispatch,account} = this.props
    
    if ( login.token ) {
      
      dispatch(fetchAccount(login.username,login.token))
      this.setState({username:login.username,token:login.token,img:account.img})
      // this._fetch(login.username,login.token)
    }
    
  
  }

  
  _fetch(username,token){
    Alert.alert('tt',username + token)
    fetch(Config.accountUrl + '/'+username ,{
        headers: {
          'Auth-Token': token,
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
            //Alert.alert('',JSON.stringify(responseData));

           if(responseData.status === 401){
              // token过期 重新登录
              ToastAndroid.show('帐号过期，重新登录', ToastAndroid.SHORT)

              // 删除本地的


              // this.props.navigator.push(
              //   {
              //     id:'login',
              //     title:'登录',
              //     params: {
              //       username: username
              //     }
              //   }
              // )
           }

           if(responseData.code === 0){
              let obj = responseData.data
              // Alert.alert('',JSON.stringify(obj))
              this.setState({
                username: obj.username,
                img: Config.fileUrl + obj.img,
              })

           }else{
              console.log('error');
           }
      })
      .done();
  }

    handler() {
      this.props.navigator.push({
        title:'设置',
        id:'setting',
       
      })
    }

    _posts() {
      this.props.navigator.push({
        title:'动态',
        id:'posts',
      })
    }

     _post() {
      this.props.navigator.push({
        title:'发布',
        id:'post',
      })
    }

    _createDynamic() {
        this.props.navigator.push({
            title: '发表动态',
            id: 'CreateDynamic',
        })
    }

    _favHandler(){
      Alert.alert('','开发中');
    }

    _accountHandler(){
      let _this = this;
      const { navigator } = this.props;
      navigator.push({title:'个人信息',id:'account',
      params: {
              getUser: function(img) {
                  _this.setState({
                      img: img
                  })
              }
        }})
    }

    _login(){
      const { navigator } = this.props;
      navigator.push({title:'登录',id:'login'})
    }

    _renderScene(){
      if(this.state.username !== ''){

        return(
                    <View>

                 <ToolBar navigator={this.props.navigator} route={this.props.route}/>

                  <ScrollView style={styles.container}>
                    
                    <TouchableOpacity style={styles.itemHeader} onPress={()=>this._accountHandler()}>
                      
                        <Image
                            source={{uri: this.state.img}}
                            style={styles.thumbnail}
                          />
                        <View style={styles.item2}>
                            <Text >{this.state.username}</Text>
                        </View>
                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>

                      <View style={{height:1,backgroundColor:'#f4f4f4'}}/>


                    <TouchableOpacity style={styles.item} onPress={()=>this._posts()}>
                        <View style={styles.item1}>
                          <Icon name="picture-o" size={20} color="#238CFE" />
                          <Text style={{marginLeft:5}}>相册</Text>
                        </View>

                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>
                      <View style={{height:1,backgroundColor:'#f4f4f4'}}/>


                    <TouchableOpacity style={styles.item} onPress={()=>this._favHandler()}>
                        <View style={styles.item1}>
                          <Icon name="cube" size={20} color="#238CFE" />
                          <Text style={{marginLeft:5}}>收藏</Text>
                        </View>

                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>
                      <View style={{height:1,backgroundColor:'#f4f4f4'}}/>

                    <TouchableOpacity style={styles.item} onPress={()=>this.handler()}>
                        <View style={styles.item1}>
                            <Icon name="gear" size={20} color="#238CFE" />
                            <Text style={{marginLeft:5}}>设置</Text>
                        </View>

                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>
                      <View style={{height:1,backgroundColor:'#f4f4f4'}}/>
                </ScrollView>
                </View>
      )
      }else{
                  return(
                    <View>

                 <ToolBar navigator={this.props.navigator} route={this.props.route}/>

                  


                  <ScrollView style={styles.container}>
                    
                    <TouchableOpacity style={styles.itemHeader} onPress={this._login.bind(this)}>
                      
                        <Image
                            source={{uri: 'http://192.16.2.65:8888/v1/file/577606bb8cda23ce7a0369ff'}}
                            style={styles.thumbnail}
                          />
                        <View style={styles.item2}>
                            <Text >登录</Text>
                        </View>
                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>
                      <View style={{height:1,backgroundColor:'#f4f4f4'}}/>

                    <TouchableOpacity style={styles.item} onPress={()=>this._favHandler()}>
                        <View style={styles.item1}>
                          <Icon name="cube" size={20} color="#238CFE" />
                          <Text style={{marginLeft:5}}>收藏</Text>
                        </View>

                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>
                      <View style={{height:1,backgroundColor:'#f4f4f4'}}/>

                    <TouchableOpacity style={styles.item} onPress={()=>this.handler()}>
                        <View style={styles.item1}>
                            <Icon name="gear" size={20} color="#238CFE" />
                            <Text style={{marginLeft:5}}>设置</Text>
                        </View>

                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>

                    </TouchableOpacity>
                      <View style={{height:1,backgroundColor:'#f4f4f4'}}/>

                </ScrollView>
                </View>
          )
      }
    }

  render() {
    return (
      this._renderScene()
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    thumbnail :{
        width: 60,
        height: 60,
        marginTop:10,
        marginLeft:10,
    },
    itemHeader: {
        height: 80,
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    item: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        height:45,
        justifyContent: 'center',

    },
    item1: {
        flex: 1,
        alignSelf:'center',
        marginLeft:10,
        flexDirection: 'row',
    },
    item3: {
        flex: 1,
        alignItems:'flex-end',
        justifyContent: 'center',
        marginRight:10,
    },
    item2: {
        flex: 1,
        marginLeft:20,
        justifyContent: 'center',
    },

    toolbar: {
        backgroundColor: '#03A9F4',
        height: 56,
        elevation: 5
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


function map(state) {
  return {
    login: state.login.login,
    account: state.account.account
  }
}

export default connect(map)(App)