// import fetch from 'cross-fetch'
import * as types from '../constants/actionTypes';
export function increase() {
  return {
    type: types.INCREASE
  }
}
export function decrease() {
  return {
    type: types.DECREASE
  }
}
export function increase_async() {
  
  const URL = types.URL_BASE + types.skuonoroffshelves;
  var post = JSON.stringify({
    username: "admin",
    password: "111111"
  });
  return (dispatch) => {
    fetch(URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: post
    }).then((req) => {
      if (req.ok) {
        return dispatch({
          type: types.INCREASE_ASYNC,
          list: [{name:111},{name:222}],
        });
      } 
    }).catch(e => {
      console.log(e);
    });
  }

}
// export const receiveTasks = (list) => {
//   return ({type: types.INCREASE_ASYNC, list})
// }
// export const REQUEST_POSTS = 'REQUEST_POSTS'
// export const RECEIVE_POSTS = 'RECEIVE_POSTS'
// export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
// export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

// export function selectSubreddit(subreddit) {
//   return {
//     type: SELECT_SUBREDDIT,
//     subreddit
//   }
// }

// export function invalidateSubreddit(subreddit) {
//   return {
//     type: INVALIDATE_SUBREDDIT,
//     subreddit
//   }
// }

// function requestPosts(subreddit) {
//   return {
//     type: REQUEST_POSTS,
//     subreddit
//   }
// }

// function receivePosts(subreddit, json) {
//   return {
//     type: RECEIVE_POSTS,
//     subreddit,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }

// function fetchPosts(subreddit) {
//   return dispatch => {
//     dispatch(requestPosts(subreddit))
//     return fetch(`https://www.reddit.com/r/${subreddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(subreddit, json)))
//   }
// }

// function shouldFetchPosts(state, subreddit) {
//   const posts = state.postsBySubreddit[subreddit]
//   if (!posts) {
//     return true
//   } else if (posts.isFetching) {
//     return false
//   } else {
//     return posts.didInvalidate
//   }
// }

// export function fetchPostsIfNeeded(subreddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), subreddit)) {
//       return dispatch(fetchPosts(subreddit))
//     }
//   }
// }