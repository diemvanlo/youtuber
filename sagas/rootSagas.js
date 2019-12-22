import {all, call} from 'redux-saga/effects';
import {watchFetchVideos} from './videoSagas';
import {watchAddNewVideo, watchUpdateVideo, watchDeleteVideo, watchFetchComments} from './videoSagas';

export default function* rootSaga() {
    yield all([
        watchAddNewVideo(),
        watchUpdateVideo(),
        watchFetchVideos(),
        watchDeleteVideo(),
        watchFetchComments(),
    ]);
}
