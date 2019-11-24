import {combineReducers} from 'redux';
import videoReducers from './videoReducers' ;

import { persistStore, persistCombineReducers } from 'redux-persist';

const allReducers = combineReducers({
    videoReducers
})
export default allReducers;
