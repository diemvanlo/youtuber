import {
    ADD_VIDEO,
    FETCH_VIDEO,
    FETCH_SUCCEEDED,
    FETCH_FAILED,
    UPDATE_VIDEO,
    UPDATE_SUCCEEDED,
} from '../actions/actionTypes';

const videoReducers = (videos = [], action) => {
    switch (action.type) {
        case FETCH_SUCCEEDED:
            // console.log(`videos in reducers:   ${action.receivedVideos}`);
            videos =  videos.concat(action.receivedVideos);
            // console.log(videos);
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
