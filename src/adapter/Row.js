/**
 * Created by zhang on 2016/7/8.
 */
'use strict';
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableWithoutFeedback,
    ToastAndroid,
    View,
} from 'react-native';

export default class Item extends Component {

    _onClick() {
        this.props.onClick(this.props.data);
        ToastAndroid.show("点了 "+this.props.data.clicks+" 下", ToastAndroid.SHORT);

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>this._onClick()} >
                <View style={styles.row}>
                    <Text style={styles.text}>
                        {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5,
    },
    text: {
        alignSelf: 'center',
        color: '#fff',
    },
});

