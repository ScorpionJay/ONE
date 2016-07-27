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
  ScrollView,
  ToastAndroid,
  RefreshControl,
  TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import ToolBar from '../common/ToolBar'

import Config from '../Config'

export default class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token:null,
      content:''
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
        this.setState({token:ret.token})
      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        //console.warn(err);
      })
  }

  post(){

      const {content,token} = this.state
       

       fetch(Config.postApi, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Auth-Token':token,
        },
        body: JSON.stringify({
          content: content
        })
      })
      .then((response) => response.json())
      .then((responseData) =>{
        if(responseData.code === 0){
          this.props.navigator.replace({
            title:'动态',
            id:'posts',
          })
        }else{
           ToastAndroid.show(responseData.msg, ToastAndroid.SHORT)
        }

      })
      .catch(function(ex) {
        console.log('parsing failed', ex)
        ToastAndroid.show('请求失败', ToastAndroid.SHORT)
      })


      // fetch(Config.postUrl,{
      //   method: 'POST',
      //   headers: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   body:`username=${username}&password=${password}`
      // })
      // .then((response) => response.json())
      // .then((responseData) =>{
      //   console.log(responseData)

  }


  render() {
    return (
      <View style={styles.container}>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>

          <TextInput  placeholder='说点什么吧' placeholderTextColor="#aaa"
                      autoFocus={true}
                      numberOfLines={1}
                      underlineColorAndroid={'transparent'}
                      textAlign='center'
                      value={this.state.content}
                      onChangeText={(content) => this.setState({content})}/>

           <TouchableHighlight
                    onPress={() => this.post()}
                    underlayColor={'#999'}
                    style={{height: 48,alignItems: 'center',justifyContent:'center'}}>
                    <Text>发表</Text>
                </TouchableHighlight>           

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    }
});


