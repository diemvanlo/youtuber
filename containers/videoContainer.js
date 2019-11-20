import { connect } from 'react-redux';
import VideoComponent from '../components/videoComponent';
import { addVideosAction, fetchVideosAction, fetchSucceededAction, fetchFailedAction, updateItemAction, updateItemSuccessAction, deleteItemAction } from '../actions';

const mapStateToProps = (state) => {
    // console.log(`Tai container parse :${JSON.stringify(state)}`);
    return {
        videos: state.videoReducers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchVideos: () => {
            dispatch(fetchVideosAction());
        },
        onAddVideo: (newVideo) => {
            dispatch(addVideosAction(newVideo));
        },
        onUpdateItemAction: (updatedVideo) => {
            dispatch(updateItemAction(updatedVideo));
        },
        onUpdateItemSuccessAction: (updatedVideo) => {
            dispatch(updateItemSuccessAction(updatedVideo));
        },
        onUpDeleteItemAction: (deleteVideoID) => {
            console.log(deleteVideoID);

            dispatch(deleteItemAction(deleteVideoID));
        }
    };
}

const VideoContainer = connect(mapStateToProps, mapDispatchToProps)(VideoComponent);
export default VideoContainer;
