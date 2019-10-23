import { INEREMENT, DEEREMENT } from './action-types'
export const increment=(number)=>({type:INEREMENT,data:number})
export const decrement=(number)=>({type:DEEREMENT,data:number})