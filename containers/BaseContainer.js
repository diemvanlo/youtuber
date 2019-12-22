import {connect, Provider} from 'react-redux';
import {
    addVideosAction,
    fetchVideosAction,
    fetchSucceededAction,
    fetchFailedAction,
    updateItemAction,
    updateItemSuccessAction,
    deleteItemAction,
    fetchCommentsAction
} from '../actions';
import React, {Component} from 'react';

export const mapStateToProps = (state) => {
    return {
        videos: state.videoReducers,
        comments: state.commentReducers
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onFetchVideos: (page, limit, searchString) => {
            dispatch(fetchVideosAction(page, limit, searchString));
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
            dispatch(deleteItemAction(deleteVideoID));
        },
        onFetchComments: (idVideo) => {
            dispatch(fetchCommentsAction(idVideo));
        },
    };
};
