import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'native-base';

export default class EmptyComponent extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                paddingTop: 150,
            }}>
                <Icon name='fire' type='SimpleLineIcons'
                      style={{alignItems: 'center', fontSize: 40, color: '#FA0052', marginBottom: 15}}/>
                <Text>{this.props.text}></Text>
            </View>
        );
    }

}
