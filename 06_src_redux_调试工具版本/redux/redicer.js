import { combineReducers } from 'redux'
import { INCERMENT, DELCERMENT } from './action-types';
function count(state = 1, action) {
    console.log('count()', state, action);
    switch (action.type) {
        case INCERMENT:
            return state + action.data;
        case DELCERMENT:
            return state - action.data;
        default:
            return state;
    }
}

const userInit = {};
function user(state = userInit, action) {
    switch (action.type) {
        default:
            return state;
    }
}


export default combineReducers({
    count,
    user
})
