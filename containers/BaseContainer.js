import {connect, Provider} from 'react-redux';
import {
    addVideosAction,
    fetchVideosAction,
    fetchSucceededAction,
    fetchFailedAction,
    updateItemAction,
    updateItemSuccessAction,
    deleteItemAction,
} from '../actions';
import React, {Component} from 'react';

export const mapStateToProps = (state) => {
    // console.log(state.videoReducers);
    return {
        videos: state.videoReducers,
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onFetchVideos: (page, limit) => {
            dispatch(fetchVideosAction(page, limit));
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
        },
    };
};
