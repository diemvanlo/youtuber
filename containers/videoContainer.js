import {connect, Provider} from 'react-redux';
import videoComponent from '../components/videoComponent';
import {
    addVideosAction,
    fetchVideosAction,
    fetchSucceededAction,
    fetchFailedAction,
    updateItemAction,
    updateItemSuccessAction,
    deleteItemAction
} from '../actions';
import React, {Component} from 'react';
import {createStackNavigator} from "react-navigation-stack";

const mapStateToProps = (state) => {
    // console.log(`Tai container parse :${JSON.stringify(state)}`);
    return {
        videos: state.videoReducers
    }
}

export const Navigator = new createStackNavigator(
    {
        videoComponent: {
            screen: videoComponent
        },
    }, {
        initialRouteName: 'videoComponent',
    }
)
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchVideos: () => {
            dispatch(fetchVideosAction());
        },
        onAddVideo: (newVideo) => {
            dispatch(addVideosAction(newVideo));
        },
        onUpdateItemAction: (updatedVideo) => {
            dispatch(updateItemAction(updatedVideo));
        },
        onUpdateItemSuccessAction: (updatedVideo) => {
            dispatch(updateItemSuccessAction(updatedVideo));
        },
        onUpDeleteItemAction: (deleteVideoID) => {
            console.log(deleteVideoID);

            dispatch(deleteItemAction(deleteVideoID));
        }
    };
};


const videoContainer = connect(mapStateToProps, mapDispatchToProps)(videoComponent);
export default videoContainer;


