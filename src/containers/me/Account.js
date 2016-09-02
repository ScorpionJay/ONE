import React, { Component } from 'react';
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
  ToastAndroid
} from 'react-native';

import Setting from './About'
import ToolBar from '../../common/ToolBar'

import ModalPicker from 'react-native-modal-picker'

import Prompt from 'react-native-prompt'

import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome';

import DeviceInfo from 'react-native-device-info'

import Config from '../../Config'
import { connect } from 'react-redux'
import { fetchAccount } from '../../actions/account'

const data = [
    { key: 0, label: '男' },
    { key: 1, label: '女' },
];

const options = {
  title: '选择头像', // specify null or empty string to remove the title
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
  maxWidth: 100, // photos only
  maxHeight: 100, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 1, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '男',
      promptVisible: false,
      sign:'',
      avatarSource:Config.fileUrl + "deafult",
      username:'',
      name:'',
      token:''
    };

    //Alert.alert('',DeviceInfo.getUniqueID() + DeviceInfo.getSystemName() + DeviceInfo.getSystemVersion() );
  }


  componentDidMount() {

    const {navigator,login,dispatch} = this.props
    if ( login.token !== '') {
      this.setState({username:login.username,token:login.token})
      dispatch(fetchAccount(login.username,login.token))
    }
  }

  _fetch(){
    const {username} = this.state
    fetch(Config.accountUrl + '/' +username,{
        headers: {
          'Auth-Token': this.state.token,
        },
      })
      .then((response) => response.json())
      .then((responseData) => {
           // Alert.alert('',JSON.stringify(responseData));

           if(responseData.status === 401){
              // token过期 重新登录
              ToastAndroid.show('帐号过期，重新登录', ToastAndroid.SHORT)

              // 删除本地的


              this.props.navigator.push(
                {
                  id:'login',
                  title:'登录',
                  params: {
                    username: username
                  }
                }
              )
           }

           if(responseData.code === 0){
              let obj = responseData.data
              // Alert.alert('',JSON.stringify(obj))
              this.setState({
                username: obj.username,
                sign: obj.sign,
                avatarSource: Config.fileUrl + obj.img,
                name: obj.name
              })

           }else{
              console.log('error');
           }
      })
      .done();
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
      // this.setState({
      //   avatarSource: source
      // });


      // 这里上传？？？
      //var input = document.querySelector('input[type="file"]')

      var data = new FormData()
      //data.append('file', response.uri)
      data.append('file', {uri: response.uri, name: "test", type: 'image/jpg'});
      
     // Alert.alert('',Config.fileUpload + response.uri)
      fetch(Config.fileUpload, {
        method: 'POST',
        headers: {
            "Content-Type": " multipart/form-data ",
            'Auth-Token': this.state.token
        },
        body: data
      }).then((data)=> data.json() )
        .then((jsonData) =>{
          if(jsonData.code === 0){
              this.setState({
                avatarSource: Config.fileUrl + jsonData.data
              });
              ToastAndroid.show(jsonData.msg, ToastAndroid.SHORT)
          }else if(jsonData.status === 401){
              // token过期 重新登录
              ToastAndroid.show('帐号过期，重新登录', ToastAndroid.SHORT)
              // 删除本地的
              this.props.navigator.push({
                  id:'login',
                  title:'登录',
                  params: {
                    username: username
                  }
                }
              )
          }
          else{
            ToastAndroid.show('上传失败', ToastAndroid.SHORT)
          }
        })

    }
  });
  }


  handle(){
    if(this.props.route.params.getUser) {
      this.props.route.params.getUser(this.state.avatarSource);
    }
    this.props.navigator.pop()
  }

  render() {
    const {route,account} = this.props
    return (
      <View style={styles.container}>

        

          <View style={styles.tabcontainer}>
              <TouchableOpacity onPress={this.handle.bind(this)} style= {styles.tabLeft}>
                  <Icon name="angle-left" size={30} color="#fff" />
                  <Text style= {styles.tabtext}>返回</Text>
              </TouchableOpacity>
              <View style= {styles.tabCenter}>
                <Text style= {styles.tabtext}>{route.title}</Text>
              </View>
              <View style= {styles.tabRight}>
              </View>
          </View>

        <View style={styles.container}>

            <TouchableOpacity style={styles.item} onPress={this.imageHandler.bind(this)}>
                <Text style={styles.item1}>头像</Text>
                 <Image
                   source={{uri: this.state.avatarSource}}
                  style={[styles.thumbnail]}
                />
            </TouchableOpacity>

            <View style={styles.item}>
                <Text style={styles.item1}>帐号</Text>
                <Text style={styles.item3}>{account.username}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.item1}>名字</Text>
                <Text style={styles.item3}>{account.name}</Text>
            </View>

            <TouchableOpacity style={styles.item}  onPress={() => this.setState({ promptVisible: true })}>
                <Text style={styles.item1}>签名</Text>
                <Text style={styles.item3}>{account.sign}</Text>
            </TouchableOpacity>

             <ModalPicker 
                    data={data}
                    initValue="男"
                    onChange={(option)=>{ this.setState({textInputValue:option.label})}}>
                    <View style={styles.item}>
                        <Text style={styles.item1}>性别</Text>
                        <Text style={styles.item3}>{this.state.textInputValue}</Text>
                    </View>
                </ModalPicker>

        </View>

        <Prompt
          title=""
          placeholder="个性签名"
          defaultValue={this.state.sign}
          submitText='确认'
          cancelText='取消' 
          visible={ this.state.promptVisible }
          onCancel={ () => this.setState({promptVisible: false}) }
          onSubmit={ (value) => {
            
              this.setState({
                promptVisible: false,
              })

               // 修改个性签名
              // Alert.alert('',Config.accountSignUrl)
            fetch(Config.accountSignUrl, {
              method: 'PUT',
              headers: {
                  // 'Accept': 'application/json',
                  "Content-Type": "application/x-www-form-urlencoded",
                  'Auth-Token': this.state.token
              },
              body:'sign=' + value
            })
            .then((data)=> data.json() )
            .then((jsonData) =>{
                if(jsonData.code === 0){

                    ToastAndroid.show(jsonData.msg, ToastAndroid.SHORT)

                    this.setState({
                      sign: value
                    })

                }else{
                  ToastAndroid.show('修改失败', ToastAndroid.SHORT)
                }
              }
            )


            } 
          }
        />
      

      </View>
    );
  }
}

const styles = StyleSheet.create({

   tabcontainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height:40,
  },
  tabLeft: {
    flex:1,
    flexDirection: 'row',
    marginLeft:5,
  },
  tabimg:{
    width:20,
    height:20,
  },
  tabtext: {
    color: '#fff',
    alignSelf: 'center',
    marginLeft:5,
  },
  tabCenter:{
    flex:1,
  },
  tabRight: {
    flex:1,
    justifyContent: 'center',
  },
  
 



  container: {
    flex: 1,
  },
  item: {
    marginTop:10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height:45,
    justifyContent: 'center',
  },
  item1: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft:10,
    alignSelf: 'center',
  },
  item3: {
      alignItems:'flex-end',
      marginRight:10,
      justifyContent: 'center',
      marginTop:10,

  },
  thumbnail :{
      width: 40,
      height: 40,
      marginRight:10,
      justifyContent: 'center',
      marginTop:7,
  },

});


function map(state) {
  return {
    login: state.login.login,
    account: state.account.account
  }
}

export default connect(map)(App)
