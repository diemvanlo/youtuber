import {Container, Text, Content, Icon} from 'native-base';
import React, {Component} from 'react';

export default class Notification extends Component {
    static navigationOptions = {
        title: 'Notifications',
        tabBarIcon: ({tintColor}) => {
            return <Icon name='notifications' style={{color: tintColor}}></Icon>;
        },
    };

    render() {
        return <Container>
            <Content>
                <Text>
                    This is my notifications Tab
                </Text>
            </Content>
        </Container>;
    }
}

