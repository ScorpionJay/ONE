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

//import ImagePicker from 'react-native-image-picker'

export default class Me extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }


  

    handler() {
     // Alert.alert('','123');
      const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
            navigator.push({title:'meSecond',id:'meSecond'})



    }

    _image(){
      // ImagePicker.launchCamera(options, (response)  => {
      //   // Same code as in above section!
      // });
    }


  render() {
    return (
      <View>

       <ToolBar navigator={this.props.navigator} route={this.props.route}/>

        


        <ScrollView style={styles.container}>
          
          <TouchableOpacity style={styles.itemHeader} onPress={this._image}>
            
              <Image
          source={require("../images/me1.png")}
          style={styles.thumbnail}
        />
            
              <View style={styles.item2}>
                  <Text >Jay</Text>
              </View>
              <View style={styles.item3}>
                  <Text >></Text>
              </View>
          </TouchableOpacity>

          <View style={styles.item}>
              <View style={styles.item1}>
                  <Text >收藏</Text>
              </View>

              <View style={styles.item3}>
                  <Text >></Text>
              </View>
          </View>

          <TouchableOpacity style={styles.item} onPress={()=>this.handler()}>
              <View style={styles.item1}>
                  <Text >设置</Text>
              </View>

              <View style={styles.item3}>
                  <Text >></Text>
              </View>
          </TouchableOpacity>
          
          
        
        
      </ScrollView>
      </View>
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
  },
  itemHeader: {
    height: 60,
     marginTop:10,
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
    height:30,
    justifyContent: 'center',
  },
  item1: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft:10,
  },
  item2: {
    flex: 1,
    marginLeft:20,
    justifyContent: 'center',
  },
  item3: {
    flex: 1,
    alignItems:'flex-end',
    justifyContent: 'center',
    marginRight:10,
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


