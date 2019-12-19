import {connect, Provider} from 'react-redux';
import videoComponent from '../components/VideoComponent';
import {
    addVideosAction,
    fetchVideosAction,
    fetchSucceededAction,
    fetchFailedAction,
    updateItemAction,
    updateItemSuccessAction,
    deleteItemAction
} from '../actions';
import {mapStateToProps, mapDispatchToProps} from '../containers/BaseContainer';
import React, {Component} from 'react';

const home = connect(mapStateToProps, mapDispatchToProps)(videoComponent);
export default home;


