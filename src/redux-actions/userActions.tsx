/**
 * desc: view层发起的事件dispatch(action)
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/1
 * Time: 下午2:04
 */
/// <reference path="../.h/user.d.ts" />
import {Actions} from "../api/actionApi";
import {Fetch} from "../service/fetch";
import {Routes} from "../common/enum/routes";
import history from "../router/history";
import {Storage} from "../common/utils/storage";
import {User} from "../common/beans/user";
import {ServiceActionEnum} from "./serviceActionsEnum";

const apiUrl = `${location.protocol}//${location.host}/home`;

/**
 * 用户登录
 * @param {User} params
 * @returns {{type: ServiceActionEnum; params: User}}
 */
export const Login = (data:any):Promise <any> => {
    const params = {
        url: Actions.登录,
        data: data,
        messageErr:false,
        responseType: 'login'
    };
    return Fetch.post(params);
};

/**
 * 注销
 * @returns {Promise<any>}
 */
export const logout = () => {
    const params = {
        url:Actions.注销,
        messageErr: false
    }
    return Fetch.get(params).then((res:any) => {
        Storage.remove('_user');
        Storage.remove('_token');
        history.push(Routes.登陆.path)
    }, (err:any) => {
        return Promise.reject(err)
    })
};
// /**
//  * 获取code令牌
//  * @returns {Promise<any>}
//  */
// export const getCode = () => {
//     const params = {
//         url: Actions.获取code令牌
//     }
//     return Fetch.get(params).then((res:any) => {
//         return Promise.resolve(res)
//     }, (err:any) => {
//         return Promise.reject(err)
//     })
// }
/**
 * 同步获取code令牌
 */
export const getSyncCode = (callback) => {
    const params = {
        url: Actions.获取code令牌
    };

    return Fetch.syncGet(params, callback);

}

// @todo 以后统一封装返回res并需要操作的post请求
/**
 * 检查用户名
 * @param username <string>
 * @returns {{type: ServiceActionEnum;}}
 */
export const checkUsername = (params: any):Promise<any> => {
    const data = {
        url: Actions.检查用户名,
        data: params,
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};

/**
 * 校验验证码
 * @param securityCode <string>
 * @param username <string>
 * @returns {{type: ServiceActionEnum;}}
 */
export const checkSecurityCode = (params):Promise<any> => {
    const data = {
        url: Actions.校验验证码,
        data: params,
        messageErr:false
    };
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};

/**
 * 重置密码
 * @param pwd <string>
 * @returns {{type: ServiceActionEnum;}}
 */
export const resetPassword = (params) => {
    const data = {
        url: `${apiUrl}${Actions.重置密码}`,
        data: params,
        messageErr:false
    };
    return Fetch.post(data, 40000)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};

/**
 * 获取个人资料
 * @returns {{type: ServiceActionEnum}}
 */
export const getUserInfo = () => {
    return {
        type: ServiceActionEnum.获取个人资料
    }
}
/**
 * 获取个人权限
 * @returns {{type: ServiceActionEnum}}
 */
export const getBasicInfo = () => {
    return {
        type: ServiceActionEnum.基本信息
    }
}
/**
 * 验证是否已经登录
 * @returns {Promise<any>}
 */
export const me = ():Promise<any> => {
    const data = {
        url: Actions.验证是否登录,
        messageErr:false,
    }
    return Fetch.post(data)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
};
/**
 * 获取二维码
 * @param params
 * @returns {Promise<any>}
 */
export const getQrCode = (params:any):Promise<any> => {
    const param = {
        url: Actions.获取二维码获取接口,
        data: params
    }
    return Fetch.postFormData(param)
        .then((res:any) => {
            return Promise.resolve(res)
        }, (err:any) => {
            return Promise.reject(err)
        })
}

/**
 * 获取oa系统token
 * @param params
 * @returns {Promise<any>}
 */
export const getOAtoken = (params) => {
    const data = {
        url: Actions.获取oa系统token,
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
 * 获取城市和学历
 */
export const getCityAndEduinfo = () => {
    const data = {
        url: Actions.获取城市学历枚举,
        data: {}
    };
    return Fetch.post(data);
}
/**
 * 修改个人信息
 * @param params
 * @returns {Promise<any>}
 */
export const updateEmployInfo = (params) => {
    const param = {
        url: Actions.修改个人信息,
        data: params
    }
    return Fetch.post(param)
}