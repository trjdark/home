/**
 * desc: 中心Gymbo ID接口
 * User: katarina
 * Date: 2022/1/13
 * Time: 下午3:00
 */
import { centerAccount } from "../api/centerAccountApi";
import {Fetch} from "../service/fetch";

/**
 * 账号申请记录列表查询
 * @returns {{}}
 */
export const queryCenterAccRecordList = (params:any):Promise<any> => {
    const data = {
        url: centerAccount.账号申请记录列表查询,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};
