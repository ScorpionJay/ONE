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

const data = [
    { key: 0, label: '男' },
    { key: 1, label: '女' },
];

export default class Me extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textInputValue: '男',
      promptVisible: false,
      say:''
    };
  }



  render() {
    return (
      <View style={styles.container}>

        <ToolBar navigator={this.props.navigator} route={this.props.route}/>

        <View style={styles.container}>

            <View style={styles.item}>
                <Text style={styles.item1}>头像</Text>
                 <Image
                  source={require("../images/me1.png")}
                  style={[styles.thumbnail]}
                />
            </View>

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


