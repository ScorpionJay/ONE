import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';

import ToolBar from '../common/ToolBar'
export default class Tab extends Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  }

   handler(){
     const { navigator } = this.props;
     navigator.push({title:'关于',id:'about'})
  }

  render() {
    return (
      <View  style={styles.container}>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          <View style={styles.container}>

            <TouchableOpacity style={styles.item} onPress={this.handler.bind(this)}>
                <Text style={styles.item1}>关于</Text>
                <Text style={styles.item3}>></Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={()=>Alert.alert('','开发中')}>
                <Text style={styles.item1}>退出</Text>
                <Text style={styles.item3}>></Text>
            </TouchableOpacity>
             
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

