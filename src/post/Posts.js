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
  ToastAndroid,
  RefreshControl,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import ToolBar from '../common/ToolBar'

import Config from '../Config'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class Posts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3']),
    };
  }

 _onRefresh() {
    this.setState({refreshing: true});

    this.setState({dataSource:this.state.dataSource.cloneWithRows(['row 4', 'row 5'])})

    this.setState({refreshing: false});


  }

  _more(){
    //Alert.alert('','more');
      this.setState({dataSource:this.state.dataSource.cloneWithRows(['row 12', 'row 23','row 2', 'row 2'])})


     
  }


  render() {
    return (
      <View style={styles.container}>
          <ToolBar navigator={this.props.navigator} route={this.props.route}/>
          
          <ListView 
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                tintColor="#ff0000"
                title="Loading..."
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
              />
            }
            
            dataSource={this.state.dataSource}
            renderRow={(rowData,rowHasChanged) => <Text>{rowData +':'+ rowHasChanged}</Text>}
            onEndReached={()=>this._more()}
            removeClippedSubviews={false}
            onEndReachedThreshold ={10}
            >
           
            
          </ListView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    }
});


