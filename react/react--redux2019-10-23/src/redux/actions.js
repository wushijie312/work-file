import { INEREMENT, DEEREMENT } from './action-types'
//增加
export const increment=(number)=>({type:INEREMENT,data:number})
//减少
export const decrement=(number)=>({type:DEEREMENT,data:number})
//异步action
export const incrementAsync=(number)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(increment(number));
        },1000);
    }
}
