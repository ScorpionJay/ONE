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

import Icon from 'react-native-vector-icons/FontAwesome'

import Spinner from 'react-native-loading-spinner-overlay';

export default class ListItemCompontent extends Component{

	handler(item_data){
		const {navigator,router} = this.props
		navigator.push({
			title:'文章',
			id:'detail',
			params: {
               id: this.props.data.id
           }
		})
	}

	render() {
		const item_data= this.props.data
		
		return (
			<View>
				<TouchableOpacity onPress={this.handler.bind(this,item_data)}>
	                <View style={styles.container} >
						<View style={styles.name}>
							<Text style={styles.nameTitle}>{item_data.name}</Text>
						</View>
						<View style={styles.desc}>
							<Text style={styles.descTitle}>
								<Icon name="angle-right" size={25} color="#aaa" />
							</Text>
						</View>
					</View>
	            </TouchableOpacity>
				<View style={{height:1,backgroundColor:'#f4f4f4'}}/>
			</View>
		);
	}

}


const styles = StyleSheet.create({
	container:{
		flexDirection: 'row',
		flex: 1,
		backgroundColor:'#fff',
		padding:5,
		height:45,
	},
	name:{
		alignItems: 'flex-start',
		flex: 1,
		marginTop:2,
	},
	nameTitle:{
		marginTop:2,
		fontSize:15,
	},
	desc:{
		alignItems: 'flex-end',
		flex: 1,
		justifyContent: 'center',
	},
	descTitle:{
		fontSize:25,
	}
})