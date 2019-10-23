// import { INEREMENT, DEEREMENT } from './action-types'
import * as types from './action-types'
import {combineReducers} from 'redux'
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

export function sum(state={kk:2},action){
    switch (action.type) {
        case types.SUM_NUMBER:
            return state + action.data;
        default:
        return state;
    }
}
export default combineReducers({
    counter,
    sum
})
// redux  向外暴露的是什么结构？
// {
//     counter:0
//     sum:{kk:2}
// }
