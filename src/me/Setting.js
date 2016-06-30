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
import Icon from 'react-native-vector-icons/FontAwesome'
import Config from '../Config'

export default class Tab extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

   handler(){
     const { navigator } = this.props;
     navigator.push({title:'关于',id:'about'})
  }


  _logout(){
    // 调用后台
    storage.remove({
        key: 'loginState'
    });
    this.props.navigator.push({id:'main','title':'首页'})
  }

  render() {
    return (
      <View  style={styles.container}>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          <View style={styles.container}>

            <TouchableOpacity style={styles.item} onPress={this.handler.bind(this)}>
              <View style={styles.item1}>
                <Text >关于</Text>
              </View>

              <View style={styles.item3}>
                <Icon name="angle-right" size={25} color="#aaa" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={this._logout.bind(this)}>
              <View style={{alignSelf:'center'}}>
                <Text>退出</Text>
              </View>
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
    height:45,
    justifyContent: 'center',
  },
  item1: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft:10,
  },
  item3: {
    flex: 1,
    alignItems:'flex-end',
    justifyContent: 'center',
    marginRight:10,
  },
  thumbnail :{
    width: 30,
    height: 30,
  },

});

