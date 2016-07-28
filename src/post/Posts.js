import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  Alert,
  Image,
  Styles
} from 'react-native';

var GiftedListView = require('react-native-gifted-listview');
var GiftedSpinner = require('react-native-gifted-spinner');

import ToolBar from '../common/ToolBar2'
import Config from '../Config'
// 禁掉黄色警告
console.disableYellowBox = true;

export default class ListCompontent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      token:null,
      data:{
        time:'',
        id:null,
        userId:null,
        content:null,
        type:null,
        source:null,
        location:null,
      }
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
  }

  /**
   * Will be called when refreshing
   * Should be replaced by your own logic
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
  _onFetch(page = 1, callback, options) {
   
    let url = page ===1 ? Config.postListApi : Config.postListApi + '?date='+this.state.time 
    let token  = null;
    storage.load({
      key: 'loginState',
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
      autoSync: true,
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用同步方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: true
      }).then(ret => {
        token = ret.token

        fetch(url,{
            headers: {
              'Auth-Token':token,
            }
          })
          .then((response) => response.json())
          .then((responseData) => {
                if(responseData.code === 0){
                  let obj = responseData.data

                  if (obj.length === 0) {
                    callback([]);
                    return;
                  };

                  if( obj.length > 0 ){
                    this.setState({time:obj[obj.length - 1].time})
                    if( obj.length  < Config.pageSize -1 ){
                      callback(obj, {allLoaded: true})
                    }else{
                      callback(obj);
                    }
                  }else{
                    callback(obj, {allLoaded: true})
                  }
               }else{
                  console.log('error');
               }
          })
          .done();

      }).catch(err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        //console.warn(err);
      })


   
  }


  /**
   * 点击
   */
  _onPress(id) {
    const {navigator,router} = this.props
    navigator.push({
      title:'详情',
      id:'detail',
      params: {
                id: id
            }
    })
  }

  /**
   * Render a row
   * @param {object} rowData Row data
   */
  _renderRowView(rowData) {
     let souce = null
    if(rowData.source !=null){
       souce = rowData.source[0]
       souce = Config.fileUrl + souce
    }
    
    return (
        <View style={{flexDirection:'column'}}>
          <TouchableHighlight
            style={customStyles.row}
            underlayColor='#c8c7cc'
          >
          <View style={{border:1,flexDirection:'row'}}>
            <Image
                source={{uri:souce}}
                style={[styles.thumbnail]}
            />
            <View style={[styles.flex]}>
              <Text style={{fontSize: 10,marginTop:5}}>{rowData.content}</Text>
              <Text style={{fontSize: 10,marginTop:5}}>{rowData.time}</Text>
            </View>
          </View>

          </TouchableHighlight>
          <View style={{height:1,backgroundColor:'#f4f4f4'}}/>
        </View>

    );
  }



  /**
   * Render the refreshable view when waiting for refresh
   * On Android, the view should be touchable to trigger the refreshCallback
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderRefreshableWaitingView(refreshCallback) {
    if (Platform.OS !== 'android') {
      return (
        <View style={customStyles.refreshableView}>
          <Text style={customStyles.actionsLabel}>
            ↓
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
          style={customStyles.refreshableView}
        >
          <Text style={customStyles.actionsLabel}>
            ↻
          </Text>
        </TouchableHighlight>
      );
    }
  }

  /**
   * Render the refreshable view when the pull to refresh has been activated
   * @platform ios
   */
  _renderRefreshableWillRefreshView() {
    return (
      <View style={customStyles.refreshableView}>
        <Text style={customStyles.actionsLabel}>
          ↻
        </Text>
      </View>
    );
  }

  /**
   * Render the refreshable view when fetching
   */
  _renderRefreshableFetchingView() {
    return (
      <View style={customStyles.refreshableView}>
        <GiftedSpinner />
      </View>
    );
  }

  /**
   * Render the pagination view when waiting for touch
   * @param {function} paginateCallback The function to call to load more rows
   */
  _renderPaginationWaitingView(paginateCallback) {
    return (
      <TouchableHighlight
        underlayColor='#c8c7cc'
        onPress={paginateCallback}
        style={customStyles.paginationView}
      >
        <Text style={[customStyles.actionsLabel, {fontSize: 13}]}>
         加载更多
        </Text>
      </TouchableHighlight>
    );
  }

  /**
   * Render the pagination view when fetching
   */
  _renderPaginationFetchigView() {
    return (
      <View style={customStyles.paginationView}>
        <GiftedSpinner />
      </View>
    );
  }

  /**
   * Render the pagination view when end of list is reached
   */
  _renderPaginationAllLoadedView() {
    return (
      <View style={customStyles.paginationView}>
        <Text style={customStyles.actionsLabel}>
          已全部加载！
        </Text>
      </View>
    );
  }

  /**
   * Render a view when there is no row to display at the first fetch
   * @param {function} refreshCallback The function to call to refresh the listview
   */
  _renderEmptyView(refreshCallback) {
    return (
      <View style={customStyles.defaultView}>
        <Text style={customStyles.defaultViewTitle}>
          没有数据！
        </Text>

        <TouchableHighlight
          underlayColor='#c8c7cc'
          onPress={refreshCallback}
        >
          <Text>
            ↻
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <View style={screenStyles.container}>

        <ToolBar navigator={this.props.navigator} route={this.props.route}/>


        <GiftedListView
          rowView={this._renderRowView.bind(this)}

          onFetch={this._onFetch.bind(this)}
          initialListSize={10} // the maximum number of rows displayable without scrolling (height of the listview / height of row)

          firstLoader={true} // display a loader for the first fetching

          pagination={true} // enable infinite scrolling using touch to load more
          paginationFetchigView={this._renderPaginationFetchigView}
          paginationAllLoadedView={this._renderPaginationAllLoadedView}
          paginationWaitingView={this._renderPaginationWaitingView}

          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          refreshableViewHeight={50} // correct height is mandatory
          refreshableDistance={40} // the distance to trigger the pull-to-refresh - better to have it lower than refreshableViewHeight
          refreshableFetchingView={this._renderRefreshableFetchingView}
          refreshableWillRefreshView={this._renderRefreshableWillRefreshView}
          refreshableWaitingView={this._renderRefreshableWaitingView}

          emptyView={this._renderEmptyView}

          rowHasChanged={(r1,r2)=>{
            r1.id !== r2.id
          }}

        />
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

