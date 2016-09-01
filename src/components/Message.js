import React, {Component} from 'react'
import {
      StyleSheet,
      Text,
      View,
      TouchableOpacity,
      Alert,ToastAndroid
} from 'react-native'

export default class Message extends Component {

	render() {

		if(this.props.data.value){
			return (
				<TouchableOpacity style={styles.show} onPress={()=>this.props.onHideMessage()}>
					<Text>{this.props.data.value}</Text>
				</TouchableOpacity>
			)
		}else{
			return (
				<TouchableOpacity style={styles.hide} onPress={()=>this.props.onHideMessage()}>
					<Text>{this.props.data.value}</Text>
				</TouchableOpacity>
			)
		}
	}	

}

const styles = StyleSheet.create({
	show:{
		height:20,
	},
	hide:{
		height:0
	}
})

