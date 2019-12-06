import {Container, Text, Content, Icon} from 'native-base';
import React, {Component} from 'react';
import {BackHandler, Alert} from 'react-native';

export default class Exit extends Component {
    static navigationOptions = {
        title: 'Exit',
        tabBarIcon: ({tintColor}) => {
            return <Icon name='exit' style={{color: tintColor}}></Icon>;
        },
    };

    constructor() {
        super();
        // this.backPressed();
    }

    componentWillMount() {
        // BackHandler.addEventListener('hardwareBackPress', this.backPressed);
        this.props.navigation.addListener('didFocus', () => this.backPressed());
    }

    backPressed = () => {
        Alert.alert(
            'Exit App',
            'Do you want to exit?',
            [
                {text: 'No', onPress: () => this.props.navigation.navigate('Home')},
                {text: 'Yes', onPress: () => BackHandler.exitApp()},
            ],
            {cancelable: false});
        return true;
    };

    render() {
        // this.backPressed();
        return <Container>
            <Content>
                <Text>
                    This is my Library Tab
                </Text>
            </Content>
        </Container>;
    }
}

