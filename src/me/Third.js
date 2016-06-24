import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import ToolBar from '../common/ToolBar'
export default class Tab extends Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  }

   handler(){
    console.log(this.props)
    const { navigator } = this.props
    //navigator.pop()
  }

  render() {
    return (
      <View  style={styles.container}>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          <View  style={styles.container}>
       
            <Text>关于</Text>
        </View>
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
    alignItems: 'center',
  },
  item3: {
    alignItems:'flex-end',
    marginRight:10,
  },
  thumbnail :{
    width: 30,
    height: 30,
  },

});

