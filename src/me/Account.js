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
  ScrollView
} from 'react-native';

import Setting from './About'
import ToolBar from '../common/ToolBar'

import ModalPicker from 'react-native-modal-picker'

import Prompt from 'react-native-prompt'

import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome';

import DeviceInfo from 'react-native-device-info'

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
  quality: 0.2, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
};

export default class Me extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '男',
      promptVisible: false,
      say:'',
      avatarSource:require("../images/me1.png")
    };

    Alert.alert('',DeviceInfo.getUniqueID() + DeviceInfo.getSystemName() + DeviceInfo.getSystemVersion() );
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
      this.setState({
        avatarSource: source
      });
    }
  });
  }

  render() {
    return (
      <View style={styles.container}>

        <ToolBar navigator={this.props.navigator} route={this.props.route}/>

        <View style={styles.container}>

            <TouchableOpacity style={styles.item} onPress={this.imageHandler.bind(this)}>
                <Text style={styles.item1}>头像</Text>
                 <Image
                  source={this.state.avatarSource}
                  style={[styles.thumbnail]}
                />
            </TouchableOpacity>

            <View style={styles.item}>
                <Text style={styles.item1}>帐号</Text>
                <Text style={styles.item3}>one123</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.item1}>名字</Text>
                <Text style={styles.item3}>jay</Text>
            </View>

            <TouchableOpacity style={styles.item}  onPress={() => this.setState({ promptVisible: true })}>
                <Text style={styles.item1}>签名</Text>
                <Text style={styles.item3}>{this.state.say}</Text>
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
          title="修改"
          placeholder="Start typing"
          defaultValue="Hello"
          visible={ this.state.promptVisible }
          onCancel={ () => this.setState({
            promptVisible: false,
          }) }
          onSubmit={ (value) => this.setState({
            promptVisible: false,
            say: value
          }) }/>
      

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginTop:10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    height:30,
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
  },
  thumbnail :{
    width: 30,
    height: 30,
    marginRight:10,
  },

});


