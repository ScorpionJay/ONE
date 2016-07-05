import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ToolBar extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handle(){
    const { navigator ,route } = this.props
    if(route.id !== 'main' && route.id !== 'login'){
      navigator.pop()
    }
  }

  render() {

    const {route} = this.props
      if( route.id !== 'main' && route.id !== 'login'){
        return(
           <View style={styles.container}>
              <TouchableOpacity onPress={this.handle.bind(this)} style= {styles.tabLeft}>
                  <Icon name="angle-left" size={30} color="#fff" />
                  <Text style= {styles.text}>返回</Text>
              </TouchableOpacity>
              <View style= {styles.tabCenter}>
                <Text style= {styles.text}>{route.title}</Text>
              </View>
              <View style= {styles.tabRight}>
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
    marginLeft:5,
  },
  img:{
    width:20,
    height:20,
  },
  text: {
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

