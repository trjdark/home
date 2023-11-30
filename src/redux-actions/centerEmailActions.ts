/**
 * desc: 中心邮箱审批
 * User: Katarina.Yuan
 * Date: 2022/1/25
 * Time: 11:20
 */
import {Fetch} from "../service/fetch";
import {centerEmail} from "../api/centerEmailApi";

/**
 * 获取关联中心下所有账号
 * @returns {{}}
 */
export const listAccount = (params:any):Promise<any> => {
    const data = {
        url: centerEmail.获取关联中心下所有账号,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};

/**
 * 邮箱开通申请
 * @returns {{}}
 */
export const emilOpenApply = (params:any):Promise<any> => {
    const data = {
        url: centerEmail.邮箱开通申请+params.employeeId,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};
/**
 * 邮箱关闭申请
 * @returns {{}}
 */
export const emilCloseApply = (params:any):Promise<any> => {
    const data = {
        url: centerEmail.邮箱关闭申请+params.employeeId,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};
/**
 * 将员工调整为离职
 * @returns {{}}
 */
export const makeLeave = (params:any):Promise<any> => {
    const data = {
        url: `${centerEmail.将员工调整为离职}/${params.employeeId}/${params.leaveTimestamp}`,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};
/**
 * 手机号码修改
 * @returns {{}}
 */
export const modifyMobile = (params:any):Promise<any> => {
    const data = {
        url: `${centerEmail.手机号码修改}/${params.employeeId}/${params.newMobile}`,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};

/**
 * 获取某个账号的详情
 * @returns {{}}
 */
export const centerAccManageAccount = (params:any):Promise<any> => {
    const data = {
        url: centerEmail.获取某个账号的详情+params.employeeId,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};

/**
 * 获取岗位列表
 * @returns {{}}
 */
export const listCurrentPositionType = ():Promise<any> => {
    const data = {
        url: centerEmail.获取岗位列表
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        })
};
