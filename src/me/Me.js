import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TextInput,
  TouchableOpacity,
  Alert,
  ListView,
  Image,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Setting from './About'
import ToolBar from '../common/ToolBar'

import Config from '../Config'

export default class Me extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username:''
    };
  }

  componentDidMount() {
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
        this.setState({username:ret.userid})
      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        //console.warn(err);
      })
  }

  

    handler() {
      this.props.navigator.push({title:'设置',id:'setting'})
    }

    _favHandler(){
      Alert.alert('','开发中');
    }

    _accountHandler(){
      const { navigator } = this.props;
      navigator.push({title:'个人信息',id:'account'})
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
                            source={require("../images/me1.png")}
                            style={styles.thumbnail}
                          />
                        <View style={styles.item2}>
                            <Text >{this.state.username}</Text>
                        </View>
                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={()=>this._favHandler()}>
                        <View style={styles.item1}>
                          <Icon name="cube" size={20} color="#238CFE" />
                          <Text style={{marginLeft:5}}>收藏</Text>
                        </View>

                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={()=>this.handler()}>
                        <View style={styles.item1}>
                            <Icon name="gear" size={20} color="#238CFE" />
                            <Text style={{marginLeft:5}}>设置</Text>
                        </View>

                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>
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
                            source={require("../images/me1.png")}
                            style={styles.thumbnail}
                          />
                        <View style={styles.item2}>
                            <Text >登录</Text>
                        </View>
                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={()=>this._favHandler()}>
                        <View style={styles.item1}>
                          <Icon name="cube" size={20} color="#238CFE" />
                          <Text style={{marginLeft:5}}>收藏</Text>
                        </View>

                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item} onPress={()=>this.handler()}>
                        <View style={styles.item1}>
                            <Icon name="gear" size={20} color="#238CFE" />
                            <Text style={{marginLeft:5}}>设置</Text>
                        </View>

                        <View style={styles.item3}>
                            <Icon name="angle-right" size={25} color="#aaa" />
                        </View>

                    </TouchableOpacity>

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
    },
    itemHeader: {
        height: 80,
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    item: {
        marginTop:10,
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


