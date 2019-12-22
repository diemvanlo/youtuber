import {
    ADD_VIDEO,
    FETCH_VIDEO,
    FETCH_SUCCEEDED,
    FETCH_FAILED,
    UPDATE_VIDEO,
    UPDATE_SUCCEEDED,
    DELETE_VIDEO,
    DELETE_SUCCEEDED,
    FETCH_COMMENT,
    FETCH_COMMENT_SUCCEEDED
} from './actionTypes';

export const fetchVideosAction = (page, limit, searchString) => {
    return {
        type: FETCH_VIDEO,
        page, limit, searchString,
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
    // console.log(receivedVideos);
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

export const fetchCommentsAction = (idVideo) => {
    return {
        type: FETCH_COMMENT,
        idVideo,
    };
};

export const fetchCommentsSucceededAction = (receivedComments) => {
    // console.log(receivedVideos);
    return {
        type: FETCH_COMMENT_SUCCEEDED,
        receivedComments,
    };
};
