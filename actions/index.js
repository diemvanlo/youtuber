import {
    ADD_VIDEO,
    FETCH_VIDEO,
    FETCH_SUCCEEDED,
    FETCH_FAILED,
    UPDATE_VIDEO,
    UPDATE_SUCCEEDED,
    DELETE_VIDEO,
    DELETE_SUCCEEDED,
} from './actionTypes';

export const fetchVideosAction = () => {
    return {
        type: FETCH_VIDEO,
    };
};
export const addVideosAction = (newVideo) => {
    return {
        type: ADD_VIDEO,
        newVideo,
    };
};
export const fetchFailedAction = (error) => {
    return {
        type: FETCH_FAILED,
        error,
    };
};
export const fetchSucceededAction = (receivedVideos) => {
    return {
        type: FETCH_SUCCEEDED,
        receivedVideos,
    };
};

export const updateItemAction = (updatedVideo) => {
    return {
        type: UPDATE_VIDEO,
        updatedVideo,
    };
};
export const updateItemSuccessAction = (updatedVideo) => {
    return {
        type: UPDATE_SUCCEEDED,
        updatedVideo,
    };
};

export const deleteItemAction = (deleteVideoID) => {
    return {
        type: DELETE_VIDEO,
        deleteVideoID,
    };
};
