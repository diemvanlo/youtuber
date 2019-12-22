import {combineReducers} from 'redux';
import videoReducers from './videoReducers' ;
import commentReducers from './commentReducers';

const allReducers = combineReducers({
    videoReducers: videoReducers,
    commentReducers: commentReducers,
});
export default allReducers;
