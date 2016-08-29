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



import Spinner from 'react-native-loading-spinner-overlay'

export default class ListCompontent extends Component{

	constructor(props) {
	  super(props);
	  this.state = {
		visible:true
	  };

	}

	
	  // 组件挂载完成时执行
	  componentDidMount() {
	   // this.setState({data:this.props.listData})

	  }

	render() {
		//<Spinner visible={this.state.visible} /> 
		return (
			<ScrollView style={styles.container}>
			
				{
					this.props.listData.map( item => <Item data={item} key={item.id} navigator={this.props.navigator} route={this.props.route}/> )
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