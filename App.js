/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Navigation from './navigation/Navigation';
import React, {Component} from 'react';
import {Root} from 'native-base';

const AppContainer = createAppContainer(Navigation);

class App extends Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        return <Root>
            <Navigation/>
        </Root>;
    }
}

export default () =>
    <Root>
      <AppContainer />
    </Root>;
