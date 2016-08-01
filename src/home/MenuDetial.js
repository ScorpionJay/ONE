/**
 * Created by zhang on 2016/8/1.
 */
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
import ToolBar from '../common/ToolBar'
export default class MenuDetial extends Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            item_data:{
                name:null,
                description:null,
            }
        };
      }


    componentDidMount() {
        //这里获取从FirstPageComponent传递过来的参数: id
        this.setState({
            //item_data: this.state.item_data
            item_data:this.props.route.params
        });
    }

    render() {
        const {name,description} = this.state.item_data

        return (
            <View>
                <ToolBar navigator={this.props.navigator} route={this.props.route}/>
                <TouchableOpacity>
                    <Text>title: {name}</Text>
                    <Text>content: {name}</Text>
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