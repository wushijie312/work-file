import { combineReducers } from "redux";
import * as types from '../constants/actionTypes';
export function count(state = { value: 0,}, action) {
  switch (action.type) {
    case types.INCREASE:
      // var ss = action;
      state.value = ++state.value;
      return Object.assign({}, state, state);
    case types.DECREASE:
      state.value = --state.value;
      return Object.assign({}, state, state);
   
    case types.INCREASE_ASYNC:
      return Object.assign({}, state, action);
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  counter: count,
});

export default rootReducer;

// import { combineReducers } from 'redux'
// import {
//   SELECT_SUBREDDIT,
//   INVALIDATE_SUBREDDIT,
//   REQUEST_POSTS,
//   RECEIVE_POSTS
// } from '../actions/actions'

// function selectedSubreddit(state = 'reactjs', action) {
//   switch (action.type) {
//   case SELECT_SUBREDDIT:
//     return action.subreddit
//   default:
//     return state
//   }
// }

// function posts(
//   state = {
//     isFetching: false,
//     didInvalidate: false,
//     items: []
//   },
//   action
// ) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//       return Object.assign({}, state, {
//         didInvalidate: true
//       })
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         isFetching: true,
//         didInvalidate: false
//       })
//     case RECEIVE_POSTS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         didInvalidate: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt
//       })
//     default:
//       return state
//   }
// }

// function postsBySubreddit(state = {}, action) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         [action.subreddit]: posts(state[action.subreddit], action)
//       })
//     default:
//       return state
//   }
// }

// const rootReducer = combineReducers({
//   postsBySubreddit,
//   selectedSubreddit
// })

// export default rootReducer