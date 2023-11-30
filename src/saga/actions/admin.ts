/**
 * desc: AD管理
 * User: Vicky.Yu
 * Date: 2020/02/17
 * Time: 上午9:00
 */
import {call, put} from "redux-saga/effects";
import {Fetch} from "../../service/fetch";
import {AdminApi} from "../../api/adminOperation";
import {Events} from "../../events/events";

/**
 * 获取员工类型列表
 * @param action
 * @returns {IterableIterator<any>}
 */
export function* getInfoList(action:any){
    const params = {
        url: AdminApi.根据员工类型查询信息,
        data: action.params
    };
    try{
        const response = yield call(Fetch.post.bind(Fetch), params);
        yield put({
            type: Events.GET_INFO_LIST,
            data: response
        })
    }catch (e) {
        // Todo 报错信息
        console.log(e)
    }
}

/**
 * 查询身份类型和工号
 * @returns {{}}
 */
export function* getStaffInfo(action:any){
    const params = {
        url: `${AdminApi.获取类型和工号}`,
        data: action.params
    };
    try{
        const response = yield call(Fetch.get.bind(Fetch), params);
        yield put({
            type: Events.GET_STAFF_INFO,
            data: response
        })
    }catch (e) {
        // Todo 报错信息
        console.log(e)
    }
}
