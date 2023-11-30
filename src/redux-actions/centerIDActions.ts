/**
 * desc: 中心账号审批
 * User: Katarina.Yuan
 * Date: 2022/1/25
 * Time: 11:20
 */
import { centerID } from "../api/centerIDApi";
import {Fetch} from "../service/fetch";

/**
 * 查询绑定结果
 * @returns {{}}
 */
export const allCenterAccRecordList = (params:any):Promise<any> => {
    const data = {
        url: centerID.账号申请列表,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};

/**
 * 账号申请撤销
 * @returns {{}}
 */
export const recallCenterAccRecord = (params:any):Promise<any> => {
    const data = {
        url: centerID.账号申请撤销,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};

/**
 * 账号申请记录查看
 * @returns {{}}
 */
export const getRecordDetail = (params:any):Promise<any> => {
    const data = {
        url: centerID.账号申请记录查看,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};

/**
 * 账号申请重新申请获取信息
 * @returns {{}}
 */
export const updateCenterAccRecord = (params:any):Promise<any> => {
    const data = {
        url: centerID.账号申请重新申请,
        data: params
    };
    return Fetch.adPost(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};

/**
 * 账号申请插入
 * @returns {{}}
 */
export const applyCenterAccount = (params:any):Promise<any> => {
    const data = {
        url: centerID.账号申请插入,
        data: params
    };
    return Fetch.adPost(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};

/**
 * 校验证件号
 * @returns {{}}
 */
export const idNoCheck = (params:any):Promise<any> => {
    const data = {
        url: centerID.校验证件号,
        data: params
    };
    return Fetch.adPost(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};

/**
 * 校验手机号
 * @returns {{}}
 */
export const mobileCheck = (params:any):Promise<any> => {
    const data = {
        url: centerID.校验手机号,
        data: params
    };
    return Fetch.adPost(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};
