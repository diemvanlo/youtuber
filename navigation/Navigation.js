import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../containers/Home';
import Trend from '../containers/Trend';
import Library from '../containers/Library';
import Notification from '../containers/Notification';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon, Container, Content, Card, CardItem, Button, Text} from 'native-base';
import {Dimensions, Easing, Animated} from 'react-native';
import SideBar from '../screens/Sidebar';
import Exit from '../containers/Exit';
import {Transition} from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import routes from './Routes';

const TabNavigator = createBottomTabNavigator({
        Home: {
            screen: Home,
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
        Exit: {
            screen: Exit,
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
        Exit: {
            screen: Exit,
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
const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const {layout, position, scene, index, scenes} = sceneProps;
            const thisSceneIndex = scene.index;
            const width = layout.initWidth;
            const height = layout.initHeight;
            const translateY = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [height, 0, 0],
            });
            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0],
            });
            //console.log(scene.route.routeName + ' walo');
            return (scene.route.routeName === 'player') ? {transform: [{translateY}]} : {transform: [{translateX}]};
        },
    };
};

let param = {
    initialRouteName: 'feed',
    headerMode: 'none',
    transitionConfig,
};
const AppStackNavigator = createStackNavigator(
    routes,
    {
        param,
    });

export default AppStackNavigator;
