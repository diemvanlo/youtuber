import {createStackNavigator} from 'react-navigation-stack';
import React, {useState, Component} from 'react';
import videoContainer from '../containers/videoContainer';
import VideoComponent from '../components/videoComponent';
import { createAppContainer } from 'react-navigation';
import {ScrollView} from "react-native";
export const Navigator = createStackNavigator(
    {
        VideoContainer: {
            screen: videoContainer
        },
    },
    {
        initialRouteName: "videoContainer",
    },
);

const mapStateToProps = state => ({
    navigation: state.navigation,
})
export default createAppContainer(Navigator);
