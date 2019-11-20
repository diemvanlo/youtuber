import {combineReducers} from 'redux';
import videoReducers from './videoReducers' ;
const allReducers = combineReducers({
    videoReducers,
})
export default allReducers;
