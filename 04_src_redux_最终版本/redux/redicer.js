import { INCERMENT, DELCERMENT } from './action-types';

export default function count(state = 1, action) {
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