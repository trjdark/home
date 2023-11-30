/**
 * desc: 中心消息提醒
 * User: lele.hao
 * Date: 2022/05/27
 * Time: 上午10:10
 */
import {Fetch} from "../service/fetch";
import {centerNotice} from "../api/centerNoticeApi";

/**
 * 获取消息详情
 * @returns {{}}
 */
export const getNoticeDetail = (params:any):Promise<any> => {
    const data = {
        url: centerNotice.消息详情+'/'+params.id,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};

/**
 * 用户所有历史消息列表
 * @returns {{}}
 */
export const getHistoryNoticeList = (params:any):Promise<any> => {
    const data = {
        url: centerNotice.历史消息列表,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};
