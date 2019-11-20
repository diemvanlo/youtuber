import { FETCH_VIDEO, FETCH_SUCCEEDED, FETCH_FAILED, ADD_VIDEO, UPDATE_SUCCEEDED, UPDATE_VIDEO, DELETE_VIDEO, DELETE_SUCCEEDED } from '../actions/actionTypes';
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './api';

function* fetchVideos() {
    try {
        const receivedVideos = yield Api.getVideosFromApi();
        yield put({
            type: FETCH_SUCCEEDED, receivedVideos: receivedVideos
        });
    } catch (error) {
        yield put({ type: FETCH_FAILED, error });
    }
}

export function* watchFetchVideos() {
    yield takeLatest(FETCH_VIDEO, fetchVideos);
}

function* addNewVideo(action) {
    try {
        yield Api.postVideosFromApi(action.newVideo);
        yield put({
            type: FETCH_VIDEO
        });
    } catch (error) {
        console.log(error);
    }
}

export function* watchAddNewVideo() {
    yield takeLatest(ADD_VIDEO, addNewVideo);
}

function* updateVideo(action) {
    try {
        yield Api.updateVideoFromApi(action.updatedVideo);
        yield put({ type: UPDATE_SUCCEEDED, updatedVideo: action.updatedVideo });
    } catch (error) {
        console.log("update error");
        console.log(error);
    }
}
export function* watchUpdateVideo() {
    yield takeLatest(UPDATE_VIDEO, updateVideo)
}

function* deleteVideo(action) {
    try {
        yield Api.deleteVideoFromApi(action.deleteVideoID);
        yield put({
            type: FETCH_VIDEO
        });
    } catch (error) {
        console.log('delete error');
        console.log(error);
    }
}

export function* watchDeleteVideo() {
    yield takeLatest(DELETE_VIDEO, deleteVideo);
}
