import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


import Carousel from 'react-native-looped-carousel'
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');


var carouselTest = React.createClass({
  getInitialState: function() {
    return {
      size: {width: width, height: height/6}
    };
  },
  _onLayoutDidChange: function(e) {
    var layout = e.nativeEvent.layout;
    this.setState({size: {width: layout.width, height: layout.height}});
  },
  render: function() {
    return (
      <View style={{flex: 0.5}} onLayout={this._onLayoutDidChange}>
        <Carousel delay={2000} style={this.state.size}>
            
              <Image source={require('../images/demo11.jpg')} style={this.state.size}/>
            
            
              <Image source={require('../images/demo12.jpg')} style={this.state.size}/>
        
            
              <Image source={require('../images/demo13.jpg')} style={this.state.size}/>
      
        </Carousel>
      </View>
    );
  }
});

export default carouselTest