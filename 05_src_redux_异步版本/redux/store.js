import { createStore, applyMiddleware } from "redux";
import reducer from './redicer'; // 用来实现redux异步的redux中间件插件
import thunk from "redux-thunk";

export default createStore(reducer, applyMiddleware(thunk));