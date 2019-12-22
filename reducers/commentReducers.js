import {
    ADD_VIDEO,
    FETCH_VIDEO,
    FETCH_SUCCEEDED,
    FETCH_FAILED,
    UPDATE_VIDEO,
    UPDATE_SUCCEEDED,
    FETCH_COMMENT,
    FETCH_COMMENT_SUCCEEDED,
} from '../actions/actionTypes';

const commentReducers = (comments = [], action) => {
    switch (action.type) {
        case FETCH_FAILED:
            return [];
        case FETCH_COMMENT_SUCCEEDED:
            comments = action.receivedComments;
            console.log(comments);
            return comments;
        default:
            return comments;
    }
};

export default commentReducers;
