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

import {mapStateToProps, mapDispatchToProps} from '../containers/BaseContainer';

const home = connect(mapStateToProps, mapDispatchToProps)(videoComponent);
export default home;
