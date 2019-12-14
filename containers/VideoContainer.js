import React from 'react';
import BaseScreen from '../utils/BaseScreen';
import {Icon, Button, Card, CardItem, Text, Body, Left, Right} from 'native-base';
import {connect} from 'react-redux';
import EmptyComponent from '../utils/EmptyComponent';
import {
    addVideosAction,
    fetchVideosAction,
    fetchSucceededAction,
    fetchFailedAction,
    updateItemAction,
    updateItemSuccessAction,
    deleteItemAction,
} from '../actions';
import videoComponent from '../components/VideoComponent';

const mapStateToProps = (state) => {
    return {videos: state.videoReducers};
};

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


const home = connect(mapStateToProps, mapDispatchToProps)(videoComponent);
export default home;
