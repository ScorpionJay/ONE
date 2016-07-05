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

const REQUEST_URL = 'https://gist.githubusercontent.com/ScorpionJay/de11dc5bacefea9cee5394b73f456688/raw/e86fd421e4bce5c85dd87d29ddc7315ec1d33eed/list.json';

export default class Detail extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      id:null,
      data:{
        id:null,
        name:null,
        description:null
      }
    };
  }

  handler(){
    console.log(this.props)
    // const { navigator } = this.props
    // navigator.push({title:'third',id:'third'}
    // )
  }

  // 获取数据方法
    fetchData() {
      fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          responseData.map(item => {
             if(item.id === this.state.id){
                this.setState({
                  data: item,
                });
                return
              }
          })
        })
        .done();
    }

  componentDidMount() {
    this.setState({id:this.props.route.params.id})
    Alert.alert('',this.props.route.params.id)
    this.fetchData()
  }

  render() {
    const {id,name,description} = this.state.data

    return (
      <View>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          <TouchableOpacity onPress={this.handler.bind(this)}>
            <Text>id: {id}</Text>
            <Text>name: {name}</Text>
            <Text>description: {description}</Text>
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

