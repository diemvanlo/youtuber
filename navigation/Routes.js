import Trend from '../containers/Trend';
import Library from '../containers/Library';
import Notification from '../containers/Notification';
import Exit from '../containers/Exit';
import Home from '../containers/Home';
import VideoPlayer from '../utils/VideoPlayer';

export default routes = {
    Home: {
        screen: Home,
    },
    Trend: {
        screen: Trend,
    },
    Library: {
        screen: Library,
    },
    Notification: {
        screen: Notification,
    },
    Exit: {
        screen: Exit,
    },
    VideoPlayer: {
        screen: VideoPlayer,
    },
};
