import {createStackNavigator} from "react-navigation-stack";
import videoComponent from "../components/videoComponent";
import videoContainer from './videoContainer'
import Article from '../components/Article'
const Navigation = new createStackNavigator(
    {
        videoContainer: {
            screen: videoContainer
        },
        Article: {
            screen: Article
        },
    }, {
        initialRouteName: 'videoContainer',
    }
)
export default Navigation;
