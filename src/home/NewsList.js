import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  Alert
} from 'react-native';

var GiftedListView = require('react-native-gifted-listview');
var GiftedSpinner = require('react-native-gifted-spinner');

import ToolBar from '../common/ToolBar'
import Config from '../Config'
// 禁掉黄色警告
console.disableYellowBox = true;

export default class ListCompontent extends Component{

  constructor(props) {
    super(props);
  
    this.state = {
      id:null,
      data:{
        time:null
      }
    };
  }



  /**
   * Will be called when refreshing
   * Should be replaced by your own logic
   * @param {number} page Requested page to fetch
   * @param {function} callback Should pass the rows
   * @param {object} options Inform if first load
   */
  _onFetch(page = 1, callback, options) {
   

    if(page === 1 ){
      this.setState({time:null})
    }

    let url = this.state.time ? Config.postsUrl + '?date=' + this.state.time : Config.postsUrl
    Alert.alert('',url)
     fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
            //Alert.alert('',JSON.stringify(responseData));
            if(responseData.code === 0){
              let obj = responseData.data
               Alert.alert('',JSON.stringify(obj))

              if(obj.length > 0){
                this.setState({time:obj[obj.length - 1].createTime})
              }
              

              callback(obj);
           }else{
              console.log('error');
           }
      })
      .done();

    // setTimeout(() => {
    //   var header = 'Header '+page;
    //   var rows = {};
    //   rows[header] = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
    //   callback(rows);
    //   if (page === 3) {
    //     callback(rows, {
    //       allLoaded: true, // the end of the list is reached
    //     });
    //   } else {
    //     callback(rows);
    //   }
    // }, 0); // simulating network fetching
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
    return (
      <TouchableHighlight
        style={customStyles.row}
        underlayColor='#c8c7cc'
        onPress={() => this._onPress(rowData.id)}
      >
        <Text>{rowData.title}</Text>
      </TouchableHighlight>
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
          ~
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
          Sorry, there is no content to display
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
    fontSize: 20,
    color: '#007aff',
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
    height: 50,
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

