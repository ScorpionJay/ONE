/**
 * Created by zhang on 2016/7/13.
 */
import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    TextInput,
    TouchableOpacity,
    Alert,
    ListView,
    Image,
    ScrollView,
    ToastAndroid
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
//创建发布动态的界面
export default class CreateDynamic extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data:null,
        };
      }

    _cancles(){
        const { navigator ,route } = this.props
        if(route.id !== 'main' && route.id !== 'login'){
            navigator.pop()
        }
    }

    _submits(){
        let {data} = this.state
        ToastAndroid.show('发表'+data, ToastAndroid.SHORT);
    }

    _addPic(){
        ToastAndroid.show('添加图片', ToastAndroid.SHORT);
    }



    _renderScene(){
        const {route} = this.props
        return(
        <View  style={styles.container}>
            <View style={{borderColor:'#fff'}}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this._cancles.bind(this)} style= {styles.tabLeft}>
                        <Icon name="angle-left" size={30} color="#fff" />
                        <Text style= {styles.text}>取消</Text>
                    </TouchableOpacity>
                    <View style= {styles.tabCenter}>
                        <Text style= {styles.text}>{route.title}</Text>
                    </View>

                    <TouchableOpacity onPress={this._submits.bind(this)} style= {styles.tabRight}>
                        <View style={{height: 48,flex: 1}}/>
                        <Text style= {styles.text}>发表</Text>
                    </TouchableOpacity>
                </View>


                <View  style={{height: 120, borderColor: 'gray', borderWidth: 0}}>
                    <TextInput
                        onChangeText={(data) => this.setState({data})}
                        value={this.state.data}
                        placeholder='说点什么吧...'
                        underlineColorAndroid = "transparent"  //android需要设置下划线为透明才能去掉下划线
                        textAlignVertical = "top"  //设置垂直位置
                    />
                </View>

                <View style={styles.footers}>
                    <Image
                           style={{width: 50,height: 50,margin: 8}}
                           onPress={this._addPic.bind(this)}
                           source={require('../images/icon_addpic.png')}/>
                    <View style={{height: 48,flex: 1}}/>
                </View>



            </View>

        </View>

        )


    }

    render() {

        return (this._renderScene());
    }

}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor: '#eee',
        },
        header: {
            flexDirection: 'row',
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            height:40,
        },
        tabLeft: {
            flex:1,
            flexDirection: 'row',
            marginLeft:5,
        },
        tabCenter:{
            flex:1,
        },
        tabRight: {
            flex:1,
            flexDirection: 'row',
            marginRight:5,
        },
        text: {
            color: '#fff',
            alignSelf: 'center',
            marginLeft:5,
        },
        footers: {
            flexDirection: 'row',
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignItems: 'center',
            height:80,
        },
    }
);