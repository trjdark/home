/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/30
 * Time: 上午11:44
 */

import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';
import reducers from './reducer/index';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
let store:any=null;

// if(process.env.NODE_ENV === 'production'){
//     store=createStore(reducers,{},applyMiddleware(sagaMiddleware));
// }else{
//     store=createStore(reducers,{},applyMiddleware(sagaMiddleware, logger));
// }

store=createStore(reducers,{},applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export {store};
