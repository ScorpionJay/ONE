/**
 * Created by zhang on 2016/8/1.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    ScrollView,
    Text,
    PixelRatio,
    View
} from 'react-native';

export default  class demo extends Component {
    render() {
        let defaultName='List';
        let defaultComponent=List;
        return (
            <Navigator
                initialRoute={{ name: defaultName, component: defaultComponent }}
                //配置场景
                configureScene={
                    (route) => {
                        //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js
                        return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                      }
                  }

                renderScene={
                    (route, navigator) =>
                     {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                      }
          } />


        );
    }
}

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _pressButton() {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if(navigator) {
            navigator.push({
                name: 'Detail',
                component: Detail,
            })
        }
    }

    render(){
        return (
            <ScrollView style={styles.flex}>
                <Text style={styles.list_item} onPress={this._pressButton.bind(this)} >☆ 豪华邮轮济州岛3日游</Text>
                <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>☆ 豪华邮轮台湾3日游</Text>
                <Text style={styles.list_item} onPress={this._pressButton.bind(this)}>☆ 豪华邮轮地中海8日游</Text>
            </ScrollView>
        );
    }


}

class Detail extends Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:List了
            navigator.pop();
        }
    }

    render(){
        return(

            <ScrollView>
                <Text style={styles.list_item} onPress={this._pressButton.bind(this)} >点击我可以跳回去</Text>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({

    flex:{
        flex:1,

    },
    list_item:{
        height:40,
        marginLeft:10,
        marginRight:10,
        marginTop: 30,
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        justifyContent:'center',
    },
});
