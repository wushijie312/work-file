import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {counter} from './reducers'
const store=createStore(
    counter,
    applyMiddleware(thunk)//应用上异步中间件
    );
export default store;