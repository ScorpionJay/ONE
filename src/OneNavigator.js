import React , { Component } from 'react'
import { Navigator,View } from 'react-native'

import Splash from './containers/Splash'
import Login from './containers/Login'
import Main from './Main'
import Register from './Register'

import Home from './containers/home/Home'
import Detail from './containers/home/Detail'

import Me from './me/Me'
import Account from './me/Account'
import Setting from './me/Setting'
import About from './me/About'

import Post from './post/Post'
import Posts from './post/Posts'
import DynamicDetial from './post/DynamicDetial'

import Webview from './common/Webview'

import JPushModule from 'jpush-react-native';

export default class Setup extends Component {


  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentDidMount() {
    JPushModule.initPush();
    JPushModule.addReceiveCustomMsgListener((message) => {
      this.setState({pushMsg: message});
    });
    JPushModule.addReceiveNotificationListener((message) => {
      console.log("receive notification: " + message);
    })
  }

  componentWillUnmount() {
    JPushModule.removeReceiveCustomMsgListener();
    JPushModule.removeReceiveNotificationListener();
  }

  _renderScene(route, navigator){
    switch(route.id){
      case 'splash':
            return <Splash navigator={navigator} route={route}/>
            break;
      case 'login':
            return <Login navigator={navigator} route={route}/>
            break;
      case 'register':
            return <Register navigator={navigator} route={route}/>
            break;
      case 'main':
            return <Main navigator={navigator} route={route}/>
            break;

      // home
      case 'home':
            return <Home navigator={navigator} route={route}/>
            break;
      case  'detail':
            return <Detail navigator={navigator} route={route}/>
            break;

      // me
      case  'me':
            return <Me navigator={navigator} route={route}/>
            break;
      case  'account':
            return <Account navigator={navigator} route={route}/>
            break;
      case  'about':
            return <About navigator={navigator} route={route}/>
            break;
      case  'setting':
            return <Setting navigator={navigator} route={route}/>
            break;

      case  'post':
            return <Post navigator={navigator} route={route}/>
            break;
      case  'posts':
            return <Posts navigator={navigator} route={route}/>
            break;
      case  'CreateDynamic':
            return <CreateDynamic navigator={navigator} route={route}/>
            break
      case 'dynamicDetail':
            return <DynamicDetial navigator={navigator} route={route}/>
            break


      case 'webview':
            return <Webview navigator={navigator} route={route}/>
            break
    }
  }
  render() {
    return (
        <Navigator
            initialRoute={{ title: '欢迎页', id:'splash'}}
            renderScene={this._renderScene}
        />    
    );
  }
}


