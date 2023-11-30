/**
 * desc: 共有状态reducer维护
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/30
 * Time: 下午3:28
 */

import {combineReducers} from 'redux';
import UserReducer from './userReducer';
import VersionReducer from './versionReducer';
import HomeReducer from './homeReducer';
import AdminReducer from "./adminReducer";

let reducerMap:any = {};

const reducerArr = [
    UserReducer, VersionReducer,
    HomeReducer, AdminReducer
];

reducerArr.map((reducer)=>{
    Object.keys(reducer).map(reducerName=>{
        reducerMap[reducerName]=reducer[reducerName]
    });
});

const reducers = combineReducers(reducerMap);

export default reducers;
