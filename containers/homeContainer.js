import {connect, Provider} from 'react-redux';
import HomeComponent from '../components/HomeComponent';
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

const mapStateToProps = (state) => {
    return {
        videos: state.videoReducers
    }
}

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


const homeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
export default homeContainer;


