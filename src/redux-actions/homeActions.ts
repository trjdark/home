/**
 * desc: 首页view层的事件触发
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/7
 * Time: 上午11:16
 */
import {ServiceActionEnum} from "./serviceActionsEnum";
import {Fetch} from "../service/fetch";
import {Actions} from "../api/actionApi";

/**
 * 获取用户应用列表
 * @returns {{}}
 */
export const fetchUserApps = (params:any) => {
    return {
        type: ServiceActionEnum.获取用户应用列表,
        params: params
    }
};
// /**
//  * 获取版本故事
//  * @returns {{}}
//  */
// export const fetchVersionList = () => {
//     return {
//         type: ServiceActionEnum.获取版本故事列表
//     }
// }

/**
 * 获取当月的有会议日期
 * @returns {{}}
 */
export const fetchCalendarListByMonth = (params:any) => {
    return {
        type: ServiceActionEnum.获取当月会议日期,
        params: params
    }
}
/**
 * 获取当日会议列表
 * @param params
 * @returns {{type: any; params: any}}
 */
export const fetchCalendarListByDay = (params:any):Promise<any> => {
    const body = {
        url: `${Actions.获取当日会议列表}?beginDate=${params.beginDate}`
    };
    return Fetch.get(body)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};

// /**
//  * 获取我的消息
//  * @param params
//  * @returns {Promise<any>}
//  */
// export const getNoticeList = (params:any):Promise<any> => {
//     const data = {
//         url: Actions.我的消息列表,
//         data: params
//     }
//     return Fetch.post(data)
//         .then((res:any) => {
//             return Promise.resolve(res)
//         })
// };

/**
 * 埋点处理
 * @param params
 */
export const record = (params:any) => {
    const body = {
        url: Actions.埋点,
        data: params
    };
    Fetch.post(body)
        .then((res:any) => {console.log(res)})
};
/**
 *
 * @returns {Promise<any>}
 */
export const getEmitNews = () => {
    const body = {
        url: Actions.获取需要弹屏消息,
        data: {}
    };
    return Fetch.post(body);
};
/**
 * 已读信息
 * @param id
 */
export const readNotice = (id) => {
    const body = {
        url: `${Actions.已读消息}/${id}`,
        data: {}
    };
    return Fetch.post(body);
}
/**
 * 获取我的消息
 * @param params
 * @returns {Promise<any>}
 */
export const getNoticeList = (params:any) => {
    return {
        type: ServiceActionEnum.获取有效消息,
        params: params
    }
};