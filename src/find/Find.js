'use strict';
import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    RefreshControl,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Row from '../adapter/Row';
export default class Find extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(20)).map(
                (val, i) => ({text: '初始行' + i})
            ),
        };
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // prepend 10 items
            const rowData = Array.from(new Array(10))
                .map((val, i) => ({
                    text: 'Loaded row ' + (+this.state.loaded + i),
                    clicks: 0,
                }))
                .concat(this.state.rowData);

            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,
                rowData: rowData,
            });
        }, 5000);
    }

    _onClick(row) {
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        });
    }

    render() {
        const rows = this.state.rowData.map((row, ii) => {
            return <Row key={ii} data={row} onClick={()=>this._onClick(row)}/>;
        });
        return (
            <ScrollView
                style={styles.scrollview}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={()=>this._onRefresh()}
                    tintColor="#ff0000"
                    title="Loading..."
                    titleColor="#00ff00"
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#ffff00"
                    />
                }>
                {rows}
            </ScrollView>
        );


    }
}

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
    },
});

