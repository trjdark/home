/**
 * desc: 找回密码
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/4
 * Time: 下午7:14
 */

import {Actions} from "./actionApi";
import {Fetch} from "../service/fetch";

/**
 * 发送短信验证码
 * @param data
 * @returns {Promise<any>}
 */
export const sendSecurityCode = (data:any):Promise<any> => {
    const params = {
        url: Actions.发送验证码,
        data: data
    };
    return Fetch.post(params)
            .then((res:any) => {
                return Promise.resolve(res)
            }, (err:any) => {
                return Promise.reject(err)
            })
};
