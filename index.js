/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import { name as appName } from './app.json';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from './reducers';
import VideoContainer from './containers/videoContainer';
import rootSaga from './sagas/rootSagas';

const sagaMiddleWare = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleWare));
const App = () => {
    return (
        <Provider store={store}>
            <VideoContainer />
        </Provider>
    )
}
sagaMiddleWare.run(rootSaga);
AppRegistry.registerComponent(appName, () => App);
