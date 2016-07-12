/**
* setup
*/
import React , { Component } from 'react'
import { Navigator } from 'react-native'

import Splash from './Splash'
import Login from './Login'
import Main from './Main'
import Register from './Register'

import Home from './home/Home'
import NewsList from './home/NewsList'
import Detail from './home/Detail'
import Third from './home/Third'

import Me from './me/Me'
import Account from './me/Account'
import Setting from './me/Setting'
import About from './me/About'

import Posts from './post/Posts'

import Storage from 'react-native-storage'

export default class Setup extends Component {

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
      case 'newsList':
            return <NewsList navigator={navigator} route={route}/>
            break;
      case  'detail':
            return <Detail navigator={navigator} route={route}/>
            break;
      case  'third':
            return <Third navigator={navigator} route={route}/>
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

      case  'posts':
            return <Posts navigator={navigator} route={route}/>
            break;    
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


