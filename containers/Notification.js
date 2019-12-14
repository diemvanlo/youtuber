import {Container, Text, Content, Icon} from 'native-base';
import React, {Component} from 'react';
import BaseScreen from '../utils/BaseScreen';

export default class Notification extends BaseScreen {
    static navigationOptions = {
        title: 'Notifications',
        tabBarIcon: ({tintColor}) => {
            return <Icon name='notifications' style={{color: tintColor}}></Icon>;
        },
    };

    constructor(props) {
        super(props);
        this.activeMenu = "Notification";
    }

    render() {
        return this.show(
            <Container>
                <Content>
                    <Text>
                        This is my notifications Tab
                    </Text>
                </Content>
            </Container>,
        );
    }
}

