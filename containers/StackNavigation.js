
import {createStackNavigator} from 'react-navigation-stack';
import React, {Component} from 'react';
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


const StackNavigatorr = createStackNavigator({
        // TabNavigator: TabNavigator,
        Home: {
            screen: home,
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
export default StackNavigatorr;


