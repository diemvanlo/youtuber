import {createStackNavigator} from 'react-navigation-stack';
import videoContainer from './videoContainer';
import homeContainer from './homeContainer';
import Article from '../components/Article';

const Navigation = new createStackNavigator(
    {
        Article: {
            screen: Article,
        },
        videoContainer: {
            screen: videoContainer,
        },
        homeContainer: {
            screen: homeContainer,
        },
    }, {
        initialRouteName: 'videoContainer',
    },
);
export default Navigation;
