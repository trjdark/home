/**
 * desc: post, get 请求
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/1
 * Time: 下午6:32
 */
import {Axios, SyncAxios} from "./axios";
import {message} from'antd';
import {StatusCode} from "../common/enum/statusCode";
import {Storage} from "../common/utils/storage";
import history from "../router/history";
import {CommonUtils} from "../common/utils/commonUtils";
import {Routes} from "../common/enum/routes";
import {Toast} from "../ui/component/notice";
import {Cookie} from "../service/cookie";
import {User} from "../common/beans/user";

message.config({maxCount:1});

declare interface AxiosParams {
    url: string;
    data?: object;
    header?: object;
    slience?: boolean;
    messageErr?:boolean;
    onProgress?: () => void;
    responseType?: string,
}

class Fetch{
    static _key = '_token';
    // 用户token 保存在localstorage
    static get token():any {
        return Storage.exist(this._key) ? { token: Storage.get(this._key) } : null;
    };
    static set token (data:any) {
        Storage.set(this._key, data)
    }
    static get userName():any{
        return User.userName ? {userName:User.userName} : null;
    };
    static get requestURL(){
        return location.protocol + '//' + location.host + '/home';
    }
    static getUrl(url: string){
        // Todo 测试
        if(url.indexOf("http")>=0){
            return `${url}`;
        }
        return `${this.requestURL}${url}`;
    }
    /**
     * 检测version是否改变
     * @param version
     * @returns {any}
     */
    static checkVersion(version: string) {
        if (!version) {
            return
        }
        //
        if(!Cookie.getCookie('flash')){
            Cookie.setCookie("flash", 'true', 2*60);
        }
        const originalVersion = Cookie.getCookie('homeWebVersionControl');
        if (!originalVersion || originalVersion !== version) {
            Cookie.setCookie("homeWebVersionControl", version, 30*60*60*24);
            window.location.reload();
        }
    }

    /**
     * 发送方法
     * @param params
     * @param {string} url
     * @param {boolean} slience
     * @returns {Promise<any>}
     */
    static post(params:AxiosParams, timeout = 0):Promise <any> {
        // Todo 如参过滤
        if(Object.prototype.toString.call(params) === '[object Object]'){
            params.data = CommonUtils.filterParams(params.data);
        }
        const body: AxiosParams = {
            url: this.getUrl(params.url),
            data: params.data || {},
            slience: params.slience,
            header: Object.assign({}, this.token,this.userName, params.header)
        };
        const isMessageErr = params.messageErr === undefined ? true : params.messageErr;
        return Axios.post(body, timeout).then((res:any) => {
            if(res.code === StatusCode.错误){
                if(isMessageErr){
                    message.error(res.msg);
                }
                return Promise.reject(res);
            }
            if(res.code === StatusCode.权限出错){
                if(isMessageErr){
                    message.error(res.msg);
                }
                history.push(Routes.登陆.path)
            }
            if(res.code === StatusCode.被踢出){
                if(isMessageErr){
                    Toast.show()
                }
            }
            if (res.code === StatusCode.成功 && params.responseType === "login") {
                Promise.resolve(res.data);
                return res.data || true;
            }
            if(res.code === StatusCode.成功){
                // Todo 不做message提醒
                this.checkVersion(res.homeWebVersionControl);
                Promise.resolve(res.data);
                return res.data || true;
            }

        }, (err:any) => {
            message.error(err.message);
            return Promise.reject(err);
        })
    }
    /**
     * 发送方法
     * @param params
     * @param {string} url
     * @param {boolean} slience
     * @returns {Promise<any>}
     */
    static adPost(params:AxiosParams):Promise <any> {
        // Todo 如参过滤
        const body: AxiosParams = {
            url: this.getUrl(params.url),
            data: params.data || {},
            slience: params.slience,
            header: Object.assign({}, this.token,this.userName, params.header)
        };
        const isMessageErr = params.messageErr === undefined ? true : params.messageErr;
        return Axios.post(body).then((res:any) => {
            if(res.code === StatusCode.错误){
                if(isMessageErr){
                    message.error(res.msg);
                }
                return Promise.reject(res);
            }
            if(res.code === StatusCode.权限出错){
                history.push(Routes.登陆.path)
            }
            if(res.code === StatusCode.被踢出){
                Toast.show()
            }
            if (res.code === StatusCode.成功 && params.responseType === "login") {
                Promise.resolve(res.data);
                return res.data || true;
            }
            if(res.code === StatusCode.成功){
                // Todo 不做message提醒
                this.checkVersion(res.homeWebVersionControl);
                Promise.resolve(res.data);
                return res.data || true;
            }

        }, (err:any) => {
            message.error(err.message);
            return Promise.reject(err);
        })
    }

    /**
     * 获取方法
     * @param {string} url
     * @param {object} header
     * @param {boolean} slience
     * @returns {Promise<any>}
     */
    static get(params:AxiosParams):Promise <any> {
        const body: AxiosParams = {
            url: this.getUrl(params.url),
            slience: params.slience,
            header: Object.assign({}, Fetch.token, params.header)
        };
        const isMessageErr = params.messageErr === undefined ? true : params.messageErr;
        return Axios.get(body).then((res:any) => {
            if(res.code === StatusCode.错误){
                if(isMessageErr){
                    message.error(res.msg);
                }
                return Promise.reject(res);
            }
            if(res.code === StatusCode.权限出错){
                history.push(Routes.登陆.path)
            }
            if(res.code === StatusCode.被踢出){
                Toast.show()
            }
            if(res.code === StatusCode.成功){
                this.checkVersion(res.homeWebVersionControl);
                Promise.resolve(res.data);
                return res.data || true;
            }

        }, (err:any) => {
            message.error(err.message)
            return Promise.reject(err);
        })
    }

    /**
     * 获取方法, 没有弹框
     * @param {string} url
     * @param {object} header
     * @param {boolean} slience
     * @returns {Promise<any>}
     */
    static postAdd(params:AxiosParams):Promise <any> {
        // Todo 如参过滤
        if(Object.prototype.toString.call(params) === '[object Object]'){
            params.data = CommonUtils.filterParams(params.data);
        }
        const body: AxiosParams = {
            url: this.getUrl(params.url),
            data: params.data || {},
            slience: params.slience,
            header: Object.assign({}, Fetch.token, params.header)
        };
        return Axios.post(body).then((res:any) => {
            if(res.code === StatusCode.错误){
                return Promise.reject(res);
            }
            if(res.code === StatusCode.成功){
                this.checkVersion(res.homeWebVersionControl);
                if(res.msg !== ''){
                    message.success(res.msg);
                }
                return res.data || true;
            }
        }, (err:any) => {
            message.error(err.message)
        })
    }

    /**
     *
     * @param {AxiosParams} params
     * @param callback
     */
    static syncGet(params:AxiosParams, callback:(res:any) => void) {
        const body: AxiosParams = {
            url: this.getUrl(params.url),
            slience: params.slience,
            header: Object.assign({}, Fetch.token, params.header)
        };
        const isMessageErr = params.messageErr === undefined ? true : params.messageErr;

        return SyncAxios.get(body, (res) => {
            if(res.code === StatusCode.错误){
                message.error(res.msg);
                history.push(Routes.登陆.path);
                Promise.reject(res);
            }
            if(res.code === StatusCode.权限出错){
                if(isMessageErr){
                    message.error(res.msg);
                }
                history.push(Routes.登陆.path)
            }
            if(res.code === StatusCode.成功){
                this.checkVersion(res.homeWebVersionControl);
                callback(res.data)
            }
        })
    };
    /**
     * 发送form结构体数据
     * @param {AxiosParams} params
     * @returns {Promise<any>}
     */
    static postFormData(params:AxiosParams):Promise<any> {
        const body: AxiosParams = {
            url: this.getUrl(params.url),
            slience: params.slience,
            data: params.data || {},
            header: Object.assign({}, this.token,this.userName, params.header)
        };

        return Axios.postFormData(body).then((res:any) => {
            if(res.code === StatusCode.错误){
                message.error(res.msg);
                return Promise.reject(res);
            }
            if(res.code === StatusCode.成功){
                this.checkVersion(res.homeWebVersionControl);
                Promise.resolve(res.data);
                return res.data || true;
            }
            if(res.code === StatusCode.权限出错){
                message.warning(res.msg);
                // 跳转到登录页面，地址在环境变量里配置
                history.push(Routes.登陆.path);
            }
        }, (err:any) => {
            message.error(err.message);
            return Promise.reject(err)
        })
    }
}

export {Fetch}
