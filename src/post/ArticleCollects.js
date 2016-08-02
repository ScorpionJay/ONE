/**
 * Created by zhang on 2016/8/2.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    Alert,
    Image,
    Styles,ToastAndroid,
    ListView
} from 'react-native';

import ToolBar from '../common/ToolBar'
import {addArticleAction,getArticleListAction} from '../actions/ArticlesAction'
// 禁掉黄色警告
console.disableYellowBox = true;

export default class ArticleCollects extends Component{

    constructor(props) {
        super(props);
        this.state = {
            token:null,
            data:[]
        };
    }

    componentDidMount() {

        storage.load({
            key: 'loginState',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用同步方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true
        }).then(ret => {
            //如果找到数据，则在then方法中返回
            console.log(ret.userid);
            this.setState({username:ret.userid,token:ret.token})
            this._fetch();
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
            //console.warn(err);
        })

        //从数据库中取数据
        let datas = getArticleListAction();
        let list = datas.data;
        if(list){
            this.setState({
                data:list
            });
        }else{
            this.setState({
                data:[]
            });
        }

    }


    _renderItem(rowData) {
            return (
                <View style={{flexDirection:'column'}}>
                    <TouchableHighlight
                        style={customStyles.row}
                        underlayColor='#c8c7cc'
                        onPress={this._onPress.bind(this,rowData)}
                    >
                        <View style={{border:1,flexDirection:'row'}}>
                            <Image
                                source={require('../images/ic_img_loading.png')}
                                style={[styles.thumbnail]}
                            />
                            <View style={[styles.flex]}>
                                <Text style={{fontSize: 10,marginTop:5}}>{rowData.content}</Text>
                            </View>
                        </View>

                    </TouchableHighlight>
                    <View style={{height:1,backgroundColor:'#f4f4f4'}}/>
                </View>
            );
    }


    render() {
        let contentView;
        if (this.state.data) {
            contentView = (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.state.data}
                    renderRow={this._renderItem.bind(this)}
                />
            );
        } else {
            contentView = (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>还没有收藏哦...</Text>
                </View>
            );

        }

        return (
            <View style={screenStyles.container}>
                <ToolBar navigator={this.props.navigator} route={this.props.route}/>
                {contentView}
            </View>
        );
    }
}


var customStyles = {
    separator: {
        height: 1,
        backgroundColor: '#CCC'
    },
    refreshableView: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsLabel: {
        fontSize: 14,
        color: '#AEB1AB',
    },
    paginationView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    defaultView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    row: {
        padding: 10,

    },
    header: {
        backgroundColor: '#007aff',
        padding: 1,
    },
    headerTitle: {
        color: '#fff',
    },
};

var screenStyles = {
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    navBar: {
        height: 64,
        backgroundColor: '#007aff',

        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitle: {
        color: '#fff',
        fontSize: 16,
        marginTop: 12,
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    thumbnail :{
        width: 55,
        height: 55,
        marginRight:5,
        justifyContent: 'center',
        marginTop:7,
    },
    item: {
        marginTop:10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        height:45,
        justifyContent: 'center',
    },
    item1: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft:10,
        alignSelf: 'center',
    },
    flex:{
        flex:1,
    }

});

