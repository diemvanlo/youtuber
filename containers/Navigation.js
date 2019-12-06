import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import home from './Home';
import Trend from './Trend';
import Library from './Library';
import Notification from './Notification';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Icon, Container, Content, Card, CardItem, Button, Text} from 'native-base';
import {Dimensions} from 'react-native';
import SideBar from '../screens/Sidebar';

const TabNavigator = createBottomTabNavigator({
        Home: {
            screen: home,
            headerTitle: 'ggg',
            title: 'gbbb',
        },
        Trend: {
            screen: Trend,
        },
        Library: {
            screen: Library,
        },
        Notification: {
            screen: Notification,
        },
    },
    {
        navigationOptions: ({navigation}) => {
            const {routeName} = navigation.state.routes[navigation.state.index];
            console.log(navigation.state.routes[navigation.state.index]);
            return {headerTitle: routeName};
        },
    });
const StackNavigator = createStackNavigator({
        HomeTab: TabNavigator,
    }, {
        headerLayoutPreset: 'center',
        defaultNavigationOptions:
            ({navigation}) => {
                return {
                    headerRight: (
                        <Container
                            style={{
                                height: 40,
                                marginTop: -20,
                                padding: 0,
                            }}
                        >
                            <Card transparent style={{
                                padding: 0,
                            }}>
                                <CardItem style={{
                                    padding: 0,
                                }}>
                                    <Icon name="search" style={{paddingLeft: 10}} size={40}/>
                                    <Icon name="contact" style={{paddingLeft: 10}} size={40}
                                          onPress={() => navigation.openDrawer()}/>
                                </CardItem>
                            </Card>
                        </Container>
                    ),
                    headerLeft: <Icon name="logo-youtube" style={{paddingLeft: 30}} size={40}/>,
                };
            },
    },
    )
;
const AppDrawerNavigator = createDrawerNavigator({
        Home: {
            screen: StackNavigator,
            navigationOptions: {
                headerTitle: 'Calendar',
            },
        },
        Trend: {
            screen: Trend,
        },
        Library: {
            screen: Library,
        },
        Notification: {
            screen: Notification,
        },
    },
    {

        drawerWidth: Dimensions.get('window').width * 0.85,
        contentComponent: props => <SideBar {...props} />,
        contentOptions: {
            activeBackgroundColor: 'rgba(212,118,207, 0.2)',
            activeTintColor: '#53115B',
            itemsContainerStyle: {
                marginTop: 16,
                marginHorizontal: 8,
            },
            itemStyle: {
                borderRadius: 4,
            },
        },
    },
);
const Navigation = new createStackNavigator(
    {
        videoContainer: {
            screen: home,
        },
    }, {
        initialRouteName: 'home',
    },
);
export default AppDrawerNavigator;
