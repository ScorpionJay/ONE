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

export default class ListItemCompontent extends Component{

	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	handler(){
		const {navigator,router} = this.props
		navigator.push({
			title:'Detail',
			id:'second',
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
							<Text style={styles.descTitle}> > </Text>
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
	},
	name:{
		alignItems: 'flex-start',
		flex: 1,
	},
	nameTitle:{
		fontSize:25,
	},
	desc:{
		alignItems: 'flex-end',
		flex: 1,
	},
	descTitle:{
		fontSize:25,
	}
})