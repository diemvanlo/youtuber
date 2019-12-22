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

const videoReducers = (videos = [], action) => {
    switch (action.type) {
        case FETCH_SUCCEEDED:
            // console.log(action.receivedVideos);
            // console.log('call reducer');
            videos = action.isSreaching ? action.receivedVideos : videos.concat(action.receivedVideos);
            return videos;
        case FETCH_FAILED:
            return [];
        // case ADD_VIDEO:
        // return [...videos, action.newVideo];
        case UPDATE_SUCCEEDED:
            return videos;
        // videos.map(eachVideo => (eachVideo.id.toString() === action.updatedVideo.id) ?
        //     {
        //         ...eachVideo,
        //         name: action.updatedVideo.name,
        //         releaseYear: action.updatedVideo.releaseYear,
        //     } : eachVideo,
        // );
        default:
            return videos;
    }
};

export default videoReducers;
