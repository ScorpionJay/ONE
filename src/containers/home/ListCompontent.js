import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
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
})