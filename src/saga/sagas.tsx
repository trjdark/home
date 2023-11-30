/**
 * desc: 事件汇总
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/30
 * Time: 下午3:38
 */

import {takeLatest} from 'redux-saga/effects';
import {ServiceActionEnum} from "../redux-actions/serviceActionsEnum";
import {
    userLogin, checkUsername,
    queryUserInfo, fetchBasicInit
} from "./actions/user";
import {
    queryUserApps,
    // queryVersionList, queryCalenderTags,
    getNews
} from "./actions/home";
import {getStaffInfo, getInfoList} from './actions/admin';

export default function* runSaga(){
    yield [
        takeLatest(ServiceActionEnum.登录, userLogin),
        takeLatest(ServiceActionEnum.检查用户名, checkUsername),
        takeLatest(ServiceActionEnum.获取用户应用列表, queryUserApps),
        // takeLatest(ServiceActionEnum.获取版本故事列表, queryVersionList),
        // takeLatest(ServiceActionEnum.获取当月会议日期, queryCalenderTags),
        takeLatest(ServiceActionEnum.获取个人资料, queryUserInfo),
        takeLatest(ServiceActionEnum.基本信息, fetchBasicInit),
        takeLatest(ServiceActionEnum.查询身份类型员工类型,getStaffInfo),
        takeLatest(ServiceActionEnum.获取员工类型相关信息, getInfoList),
        takeLatest(ServiceActionEnum.获取有效消息, getNews)
    ];
}
