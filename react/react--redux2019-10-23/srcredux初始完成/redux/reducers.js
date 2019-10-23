import { INEREMENT, DEEREMENT } from './action-types'
export function counter(state=0, action) {
    console.log(state,action);
    switch (action.type) {
        case INEREMENT:
            return state + action.data;
        case DEEREMENT:
            return state - action.data;
        default:
        return state;
    }
}