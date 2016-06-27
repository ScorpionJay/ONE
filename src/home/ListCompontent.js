import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

import Item from './ListItemCompontent'



// 定义url常量
const REQUEST_URL = 'https://gist.githubusercontent.com/ScorpionJay/de11dc5bacefea9cee5394b73f456688/raw/e86fd421e4bce5c85dd87d29ddc7315ec1d33eed/list.json';

export default class ListCompontent extends Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
		data:[]
	  };
	}


	// 获取数据方法
	  fetchData() {
	    fetch(REQUEST_URL)
	      .then((response) => response.json())
	      .then((responseData) => {
	        this.setState({
	          data: responseData,
	        });
	      })
	      .done();
	  }

	  // 组件挂载完成时执行
	  componentDidMount() {
	    this.fetchData();
	  }

	render() {


		return (
			<ScrollView style={styles.container}>
				{
					this.state.data.map( item => <Item data={item} navigator={this.props.navigator} route={this.props.route}/> )
				}
			</ScrollView>
		);
	}

}


const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

});