import { combineReducers } from "redux";
import * as types from '../constants/actionTypes';
export function count(state = {
  value: 0,
}, action) {
  switch (action.type) {
    case types.INCREASE:
      // var ss = action;
      state.value = ++state.value;
      return Object.assign({}, state, state);
    case types.DECREASE:
      state.value = --state.value;
      return Object.assign({}, state, state);
    case types.INCREASE_ASYNC:
      state.value = state.value + 2;
      return Object.assign({}, state, state);
    case types.USER_LOGIN:
      return Object.assign({}, state, action);
    default:
      return state;
  }
}
const reducer = combineReducers({
  counter: count,
});

export default reducer;