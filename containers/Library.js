import {Container, Text, Content, Icon} from 'native-base';
import React, {Component} from 'react';

export default class Trend extends Component {
    static navigationOptions = {
        title: 'Library',
        tabBarIcon: ({tintColor}) => {
            return <Icon name='folder' style={{color: tintColor}}></Icon>;
        },
    };

    render() {
        return <Container>
            <Content>
                <Text>
                    This is my Library Tab
                </Text>
            </Content>
        </Container>;
    }
}

