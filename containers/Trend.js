import {Container, Text, Content, Icon, Footer, FooterTab} from 'native-base';
import React, {Component} from 'react';
import BaseScreen from '../utils/BaseScreen';

export default class Trend extends BaseScreen {

    constructor(props) {
        super(props);
        this.activeMenu = 'Trend';
    }

    static navigationOptions = {
        title: 'Trending',
        tabBarIcon: ({tintColor}) => {
            return <Icon name='flame' style={{color: tintColor}}></Icon>;
        },
    };

    render() {
        return this.show(
            <Container>
                <Content>
                    <Text>
                        This is my Trending Tab
                    </Text>
                </Content>
            </Container>,
        );
    }
}

