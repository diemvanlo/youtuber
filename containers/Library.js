import {Container, Text, Content, Icon} from 'native-base';
import React, {Component} from 'react';
import {BackHandler, Alert} from 'react-native';

export default class Library extends Component {
    static navigationOptions = {
        title: 'Library',
        tabBarIcon: ({tintColor}) => {
            return <Icon name='folder' style={{color: tintColor}}></Icon>;
        },
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        Alert.alert(
            'Exit App',
            'Do you want to exit?',
            [
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => BackHandler.exitApp()},
            ],
            { cancelable: false });
        return true;
    }

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

