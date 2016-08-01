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
    ScrollView,
    TouchableHighlight,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import ToolBar from '../common/ToolBar'
import Config from '../Config'
export default class DynamicDetial extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            item_data:{
                content:null,
                time:null,
                source:null,
            }
        };
    }


    componentDidMount() {
        //这里获取从FirstPageComponent传递过来的参数: id
        this.setState({
            item_data:this.props.route.params
        });
    }

    render() {
        const {content,time,source} = this.state.item_data;

        if(source==''||source==undefined){
            return (
                <View>
                <ToolBar navigator={this.props.navigator} route={this.props.route}/>
                <View style={{flexDirection:'column'}}>
                    <TouchableHighlight
                        style={styles.row}
                        underlayColor='#c8c7cc'
                    >
                        <View style={{border:1,flexDirection:'row'}}>
                            <Image
                                source={require('../images/ic_img_loading.png')}
                                style={[styles.thumbnail]}
                            />
                            <View style={[styles.flex]}>
                                <Text style={{fontSize: 10,marginTop:5}}>动态内容: {content}</Text>
                                <Text style={{fontSize: 10,marginTop:5}}>时间: {time}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
                </View>
            );

        }else{
            let imageUrl = Config.fileUrl + source;
            return (
                <View>
                    <ToolBar navigator={this.props.navigator} route={this.props.route}/>
                <View style={{flexDirection:'column'}}>
                    <TouchableHighlight
                        style={styles.row}
                        underlayColor='#c8c7cc'
                         >
                        <View style={{border:1,flexDirection:'row'}}>
                            <Image
                                source={{uri:imageUrl}}
                                style={[styles.thumbnail]}
                            />
                            <View style={[styles.flex]}>
                                <Text style={{fontSize: 10,marginTop:5}}>动态内容: {content}</Text>
                                <Text style={{fontSize: 10,marginTop:5}}>时间: {time}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
                </View>
            );
        }



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
    row: {
        padding: 10,
    },
    thumbnail :{
        width: 55,
        height: 55,
        marginRight:5,
        justifyContent: 'center',
        marginTop:7,
    },
    flex:{
        flex:1,
    }
});