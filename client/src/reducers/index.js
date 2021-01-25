import { combineReducers } from 'redux';
import infoReducer from './infoReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    info: infoReducer,
    error: errorReducer
});