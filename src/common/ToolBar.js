import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';


export default class ToolBar extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handle(){
    const { navigator ,route } = this.props
    //Alert.alert('1','1' + route.id);
    if(route.id !== 'main'){
      navigator.pop()
    }
  }

  render() {

    const {route} = this.props



      if( route.id !== 'main'){
        return(
           <View style={styles.container}>
              <TouchableOpacity onPress={this.handle.bind(this)} style= {styles.tabLeft}>
                  <Image source={require('../images/back.png')} style= {styles.img}/>
                  <Text style= {styles.text}>返回</Text>
                 
              </TouchableOpacity>
              <View style= {styles.tabCenter}>
                <Text style= {styles.text}>{route.title}</Text>
              </View>
          </View>
        )
      }else{
        return(
          <View style={styles.container2}>
            <Text  style= {styles.tabCenter2}>{route.title}</Text>
          </View>
        )
      }

  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height:40,
  },
  tabLeft: {
    flex:1,
    flexDirection: 'row',
  },
  img:{
    width:20,
    height:20,
  },
  text: {
    color: '#fff'
  },
  tabCenter:{
    flex:1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  tabRight: {
    flex:1,
    justifyContent: 'center',
  },
  container2: {

    backgroundColor: 'red',
    justifyContent: 'center',
    height:40,
  },
  tabCenter2:{
    alignSelf: 'center',
    color: '#fff',
    justifyContent: 'center',
  },
});

