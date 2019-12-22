import {
    FETCH_VIDEO,
    FETCH_SUCCEEDED,
    FETCH_FAILED,
    ADD_VIDEO,
    UPDATE_SUCCEEDED,
    UPDATE_VIDEO,
    DELETE_VIDEO,
    DELETE_SUCCEEDED,
    FETCH_COMMENT,
    FETCH_COMMENT_SUCCEEDED,
} from '../actions/actionTypes';
import {put, takeLatest, takeEvery} from 'redux-saga/effects';
import {Api} from './api';

function* fetchVideos(action) {
    let isSreaching;
    isSreaching = action.searchString ? true : false;
    try {
        const receivedVideos = yield Api.getVideosFromApi(action);
        yield put({
            type: FETCH_SUCCEEDED, receivedVideos: receivedVideos, isSreaching,
        });
    } catch (error) {
        yield put({type: FETCH_FAILED, error});
    }
}

export function* watchFetchVideos() {
    yield takeEvery(FETCH_VIDEO, fetchVideos);
}

function* fetchComments(action) {
    console.log(action);
    try {
        const receivedComments = yield Api.getCommentsFromApi(action);
        yield put({
            type: FETCH_COMMENT_SUCCEEDED, receivedComments: receivedComments,
        });
    } catch (error) {
        yield put({type: FETCH_FAILED, error});
    }
}

export function* watchFetchComments() {
    yield takeLatest(FETCH_COMMENT, fetchComments);
}

function* addNewVideo(action) {
    try {
        yield Api.postVideosFromApi(action.newVideo);
        yield put({
            type: FETCH_VIDEO,
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
        yield put({type: UPDATE_SUCCEEDED, updatedVideo: action.updatedVideo});
    } catch (error) {
        console.log('update error');
        console.log(error);
    }
}

export function* watchUpdateVideo() {
    yield takeLatest(UPDATE_VIDEO, updateVideo);
}

function* deleteVideo(action) {
    try {
        yield Api.deleteVideoFromApi(action.deleteVideoID);
        yield put({
            type: FETCH_VIDEO,
        });
    } catch (error) {
        console.log('delete error');
        console.log(error);
    }
}

export function* watchDeleteVideo() {
    yield takeLatest(DELETE_VIDEO, deleteVideo);
}
