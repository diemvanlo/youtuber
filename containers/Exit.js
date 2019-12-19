import {Container, Text, Content, Icon} from 'native-base';
import React, {Component} from 'react';
import {BackHandler, Alert} from 'react-native';
import BaseScreen from '../utils/BaseScreen';

export default class Exit extends BaseScreen {
    static navigationOptions = {
        title: 'Exit',
        tabBarIcon: ({tintColor}) => {
            return <Icon name='exit' style={{color: tintColor}}></Icon>;
        },
    };

    constructor(props) {
        super(props);
        this.activeMenu = 'Exit';
    }

    render() {
        // this.backPressed();
        return this.show(
            <Container>
                <Content>
                    <Text>
                        This is my Library Tab
                    </Text>
                </Content>
            </Container>,
        );
    }
}

