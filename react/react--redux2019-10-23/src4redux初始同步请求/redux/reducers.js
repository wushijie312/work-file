// import { INEREMENT, DEEREMENT } from './action-types'
import * as types from './action-types'
export function counter(state=0, action) {
    console.log(state,action);
    switch (action.type) {
        case types.INEREMENT:
            return state + action.data;
        case types.DEEREMENT:
            return state - action.data;
        default:
        return state;
    }
}