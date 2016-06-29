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

export default class ListItemCompontent extends Component{

	constructor(props) {
	  super(props);
	  this.state = {};
	}

	handler(){
		const {navigator,router} = this.props
		navigator.push({
			title:'详情',
			id:'detail',
			params: {
                id: this.props.data.id
            }
		})
	}

	render() {
		const {name,description} = this.props.data
		
		return (
				<TouchableOpacity onPress={this.handler.bind(this)}>
	                <View style={styles.container} >
						<View style={styles.name}>
							<Text style={styles.nameTitle}>{name}</Text>
						</View>
						<View style={styles.desc}>
							<Text style={styles.descTitle}>
								<Icon name="angle-right" size={25} color="#aaa" />
							</Text>
						</View>
					</View>
	            </TouchableOpacity>
		);
	}

}


const styles = StyleSheet.create({
	container:{
		flexDirection: 'row',
		flex: 1,
		backgroundColor:'#fff',
		marginTop:10,
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