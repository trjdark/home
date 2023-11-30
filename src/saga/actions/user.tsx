/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/1
 * Time: 下午7:43
 */
import {call, put, fork} from "redux-saga/effects";
import {Fetch} from "../../service/fetch";
import {Actions} from "../../api/actionApi";
import {Storage} from "../../common/utils/storage";
import history from "../../router/history";
import {Routes} from "../../common/enum/routes";
import {Events} from "../../events/events";

/**
 * 登录
 * @param action
 * @returns {IterableIterator<CallEffect>}
 */
export function* userLogin(action:any) {
    const params = {
        url: Actions.登录,
        data: action.params
    };
    try{
        const response = yield call(Fetch.post.bind(Fetch),params);
        // const userInfo = yield getUserInfo(response.token);
        Storage.multSet({
            '_token': response.token,
            '_expire': response.expire
            // '_user': Object.assign({}, userInfo)
        });
        history.push(Routes.首页.path);
    }catch(err){
        console.log(err)
    }
}

/**
 * 页面初始化,获取基本信息
 * @param action
 * @returns {IterableIterator<any>}
 */
export function* fetchBasicInit(action:any){
    // 获取用户权限
    yield fork(queryUserPermission);
    // 获取用户信息
    yield fork(queryUserInfo);
    // 获取用户导航栏选项
    yield fork (getHeadApp);
}

/**
 * 检查用户名
 * @param action
 * @returns {IterableIterator<CallEffect>}
 */
export function* checkUsername(action:any) {
    const params = {
        url: Actions.检查用户名,
        data: action.params
    };
    try{
        const response = yield call(Fetch.postAdd.bind(Fetch),params);
        yield put({
            type: Events.CHECK_USER_NAME,
            data: response
        })
        // 在页面跳转
    }catch(err){
        // 提示不正确的应户名
    }
}

/**
 * 获取用户信息
 * @param {string} token
 * @returns {IterableIterator<any>}
 */
export function* queryUserInfo(){
    const params = {
        url: Actions.获取用户信息,
    };
    try{
        const response = yield call(Fetch.post.bind(Fetch), params);
        yield put({
            type: Events.USER_INFO,
            data: response
        })
    }catch(err){

    }
}

/**
 * 获取用户权限
 * @returns {IterableIterator<any>}
 */
export function* queryUserPermission() {
    const params = {
        url: Actions.获取用户权限,
    };
    try{
        const response = yield call(Fetch.get.bind(Fetch), params);
        yield put({
            type: Events.USER_PERMISSION,
            data: response
        })
    }catch(err){

    }
}

/**
 * 导航权限
 * @returns {IterableIterator<any>}
 */
function* getHeadApp() {
    const params = {
        url: Actions.获取用户应用列表,
        data: {showAddress: 2}
    };
    try{
        const response = yield call(Fetch.post.bind(Fetch), params);
        yield put({
            type: Events.GET_USER_HEAD_APPS,
            data: response
        })
    }catch(err){

    }
}