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

import ImagePicker from 'react-native-image-picker'

const options = {
  title: '选择照片', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '选择照片', // specify null or empty string to remove this button
  // customButtons: {
  //   'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  // },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 800, // photos only
  maxHeight: 800, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  
};


export default class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      token:null,
      content:'',
      picture:'',
      pic:null,
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
      if(content==''||content==undefined){
          ToastAndroid.show('动态内容不能为空...', ToastAndroid.SHORT);
          return;
      }

      var data = new FormData()
      //data.append('file', response.uri)
      if(this.state.picture !== ''){
         data.append('file', {uri: this.state.picture, name: "test", type: 'image/jpg'});
      }
      
      data.append('content', content)

       fetch(Config.postApi2, {
        method: 'POST',
        headers: {
           "Content-Type": " multipart/form-data ",
          'Auth-Token':token,
        },
        body: data
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
        ToastAndroid.show('请求失败'+ex, ToastAndroid.SHORT)
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


  imageHandler(){
    ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      // // You can display the image using either data:
      // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

      // // uri (on iOS)
      // const source = {uri: response.uri.replace('file://', ''), isStatic: true};
      // uri (on android)
      const source = {uri: response.uri, isStatic: true};
      // Alert.alert('pic',response.uri)
      this.setState({
        picture: response.uri,
        pic:source
      });


      // 这里上传？？？
      //var input = document.querySelector('input[type="file"]')

      var data = new FormData()
      //data.append('file', response.uri)
      data.append('file', {uri: response.uri, name: "test", type: 'image/jpg'});
      
     // Alert.alert('',Config.fileUpload + response.uri)
      // fetch(Config.postApiTest, {
      //   method: 'POST',
      //   headers: {
      //       "Content-Type": " multipart/form-data ",
      //       'Auth-Token': this.state.token
      //   },
      //   body: data
      // }).then((data)=> data.json() )
      //   .then((jsonData) =>{
      //     Alert.alert('pic',JSON.stringify(jsonData))
      //     if(jsonData.code === 0){
      //         this.setState({
      //           avatarSource: Config.fileUrl + jsonData.data
      //         });
      //         ToastAndroid.show(jsonData.msg, ToastAndroid.SHORT)
      //     }else if(jsonData.status === 401){
      //         // token过期 重新登录
      //         ToastAndroid.show('帐号过期，重新登录', ToastAndroid.SHORT)
      //         // 删除本地的
      //         this.props.navigator.push({
      //             id:'login',
      //             title:'登录',
      //             params: {
      //               username: username
      //             }
      //           }
      //         )
      //     }
      //     else{
      //       ToastAndroid.show('上传失败', ToastAndroid.SHORT)
      //     }
      //   })

    }
  });
  }


  render() {
    return (
      <View style={styles.container}>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>

          <View style={styles.style_input_m}>
              <TextInput  placeholder='说点什么吧'
                          placeholderTextColor="#aaa"
                          style={styles.style_input}
                          autoFocus={true}
                          numberOfLines={1}
                          underlineColorAndroid={'transparent'}
                          textAlign='center'
                          value={this.state.content}
                          onChangeText={(content) => this.setState({content})}/>
          </View>


          <TouchableOpacity style={styles.item} onPress={this.imageHandler.bind(this)}>
              <Text style={styles.item1}>选择照片</Text>
                 <Image
                   source={{uri: this.state.picture}}
                   style={[styles.thumbnail]}
                />
          </TouchableOpacity>

          <View style={{marginTop: 32,marginLeft: 16,marginRight:16,elevation: 4,backgroundColor:'#ff9800'}}>
              <TouchableHighlight
                  onPress={() => this.post()}
                  underlayColor={'#999'}
                  style={{height: 48,alignItems: 'center',justifyContent:'center'}}>
                  <Text  style={{color: 'white'}}>发  表</Text>
              </TouchableHighlight>
          </View>

      </View>
    )
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
      marginRight:10,
      justifyContent: 'center',
      marginTop:7,
  },
    item: {
    marginTop:10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height:80,
    justifyContent: 'center',
  }, 
   item1: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft:10,
    alignSelf: 'center',
  },
    style_input_m:{
        backgroundColor:'#eee',
        height:200,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        alignItems: 'flex-start',
    },
    style_input:{
        flex: 1,
        backgroundColor:'#eee',
        height:40,
    },

});


