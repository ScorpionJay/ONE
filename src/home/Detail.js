import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import ToolBar from '../common/ToolBar'
import Config from '../Config'

const REQUEST_URL = 'https://gist.githubusercontent.com/ScorpionJay/de11dc5bacefea9cee5394b73f456688/raw/e86fd421e4bce5c85dd87d29ddc7315ec1d33eed/list.json';

export default class Detail extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      id:this.props.route.params.id,
      data:{
        id:null,
        title:null,
        content:null,
        auth:null,
        createTime:null
      }
    };
  }

  handler(){
    console.log(this.props)
    // const { navigator } = this.props
    // navigator.push({title:'third',id:'third'}
    // )
  }

  componentDidMount() {
    fetch(Config.postUrl + this.state.id )
        .then((response) => response.json())
        .then((responseData) => {
          if(responseData.code === 0){
              //Alert.alert('',JSON.stringify(responseData))
              this.setState({data:responseData.data})
          }else{
              console.log('error');
          }
        })
        .done();
  }

  render() {
    const {title,content,auth,createTime} = this.state.data

    return (
      <View>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          <TouchableOpacity onPress={this.handler.bind(this)}>
            <Text>title: {title}</Text>
            <Text>content: {content}</Text>
            <Text>auth: {auth}</Text>
            <Text>createTime: {createTime}</Text>
          </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

