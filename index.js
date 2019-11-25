/**
 * @format
 */
import {AppRegistry} from 'react-native';
import React, {Component} from 'react';
import {name as appName} from './app.json';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from './reducers';
import VideoContainer from './containers/videoContainer';
import Video from './navigation/Video';
import rootSaga from './sagas/rootSagas';
import App from './App';
import Navigation from './containers/Navigation';
import 'react-native-gesture-handler'

const sagaMiddleWare = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleWare));
const Appp = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

sagaMiddleWare.run(rootSaga);
AppRegistry.registerComponent(appName, () => Appp);
