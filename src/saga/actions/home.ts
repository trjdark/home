/**
 * desc: 首页相互业务
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/7
 * Time: 上午11:21
 */
import {Events} from "../../events/events";
import {Fetch} from "../../service/fetch";
import {call, put} from "redux-saga/effects";
import {Actions} from "../../api/actionApi";

/**
 * 获取用户权限
 * @param {string} token
 * @returns {IterableIterator<any>}
 */
export function* queryUserApps(action:any){
    const params = {
        data: action.params,
        url: Actions.获取用户应用列表,
    }
    try{
        const res = yield call(Fetch.post.bind(Fetch), params);
        yield put({
            type: Events.GET_USER_APPS,
            data: res
        })
    }catch (e) {
        // Todo 报错信息
        console.log(e)
    }
}

// /**
//  * 获取版本故事列表
//  * @param action
//  * @returns {IterableIterator<any>}
//  */
// export function* queryVersionList(action:any){
//     const params = {
//         url: Actions.获取版本故事
//     }
//     try{
//         const res = yield call(Fetch.post.bind(Fetch), params);
//         yield put({
//             type: Events.VERSION_LIST,
//             data: res
//         })
//     }catch (e) {
//         // Todo 报错信息
//         console.log(e)
//     }
// }

/**
 * 获取时间段内有会议的日期
 * @param action
 * @returns {IterableIterator<any>}
 */
// export function* queryCalenderTags(action:any){
//     const params = {
//         url: `${Actions.获取当月会议日期}?beginDate=${action.params.beginDate}&endDate=${action.params.endDate}`
//     }
//     try{
//         const res = yield call(Fetch.get.bind(Fetch), params);
//         yield put({
//             type: Events.HAS_MEETING_LIST,
//             data: res
//         })
//     }catch (e) {
//         // Todo 报错信息
//         console.log(e)
//     }
// }

/**
 * 获取弹屏信息
 * @param action
 * @returns {IterableIterator<any>}
 */
export function* getNews(action:any) {
    const params = {
        url: Actions.我的消息列表
    }
    try{
        const res = yield call(Fetch.post.bind(Fetch), params);
        yield put({
            type: Events.NEWS_LIST,
            data: res
        })
    }catch (e) {
        // Todo 报错信息
        console.log(e)
    }
}