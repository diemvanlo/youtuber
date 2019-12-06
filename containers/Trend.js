import {Container, Text, Content, Icon} from 'native-base';
import React, {Component} from 'react';

export default class Trend extends Component {
    static navigationOptions = {
        title: 'Trending',
        tabBarIcon: ({tintColor}) => {
            return <Icon name='flame' style={{color: tintColor}}></Icon>;
        },
    };

    render() {
        return <Container>
            <Content>
                <Text>
                    This is my Trending Tab
                </Text>
            </Content>
        </Container>;
    }
}

