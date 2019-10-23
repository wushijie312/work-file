import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
const store=createStore(
    reducers,
    applyMiddleware(thunk)//应用上异步中间件
    );
export default store;