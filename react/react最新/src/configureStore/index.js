import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/reducer'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}

// import { createStore,applyMiddleware } from "redux";
// // in productrion enviroment, you may need comment logger middleware
// import Logger from "redux-logger";
// import ReduxThunk from "redux-thunk";
// import reducer from "../reducers/reducer"; 

// const store = createStore(
// 	reducer,
// 	applyMiddleware(ReduxThunk,Logger),
// );
// // console.log(store.getState())

// export default store;