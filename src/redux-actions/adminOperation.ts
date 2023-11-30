/**
 * desc: ad账号管理
 * User: Vicky.Yu
 * Date: 2020/02/18
 * Time: 上午11:30
 */
import {AdminApi} from "../api/adminOperation";
import {ServiceActionEnum} from "./serviceActionsEnum";
import {Fetch} from "../service/fetch";

/**
 * ad列表
 * @returns {{}}
 */
export const getAccountList = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.查询账号列表,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};
/**
 * 刷新邮箱license数据
 * @returns {{}}
 */
export const refurbishData = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.刷新邮箱license数据,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};
/**
 * 新建ad账号
 * @returns {{}}
 */
export const creatAccount = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.新建账号,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};
/**
 * 根据员工类型查询
 * 查询岗位序列、组织树、中心列表、工号
 * @returns {{}}
 */
export const queryPositionInfo = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.根据员工类型查询信息,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};

/**
 * 生成GymboId
 * @returns {{}}
 */
export const achieveGymboId = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.生成gymboID,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};

/**
 * 获取岗位序列、组织树、中心列表、工号commonTypeDef
 * @returns {{}}
 */
export const getStaffInfo = () => {
    return {
        type: ServiceActionEnum.查询身份类型员工类型
    }
};

/**
 * 查看详情
 * @returns {{}}
 */
export const getDetails = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.查看详情,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};
/**
 * 岗位序列 组织树 中心列表 工号
 * @returns {{}}
 */
export const getAllInfoList = () => {
    return {
        type: ServiceActionEnum.获取员工类型相关信息
    }
};
/**
 * 校验手机号
 * @returns {{}}
 */
export const checkMobile = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.校验手机号,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};

/**
 * 校验Mate账号
 * @returns {{}}
 */
export const checkMateUserName = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.校验Mate账号,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};

/**
 * 校验身份证号
 * @returns {{}}
 */
export const checkID = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.校验证件号,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};
/**
 * 校验身份证号
 * @returns {{}}
 */
export const editContent = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.编辑,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};

/**
 * 校验邮箱
 * @returns {{}}
 */
export const checkEmail = (params:any):Promise<any> => {
    const data = {
        url: AdminApi.校验邮箱,
        data: params
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};











