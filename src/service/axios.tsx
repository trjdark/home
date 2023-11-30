/**
 * desc: 封装axios
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/1
 * Time: 下午3:30
 */
import axios from 'axios';
import {Loading} from "../ui/component/loading";

declare interface AxiosParams {
    url: string;
    data?: object;
    header?: any;
    slience?: boolean;
    onProgress?: () => void;
}

class Axios {
    static timeout:number = 10000;
    static get = (params:AxiosParams) => {
        const {url, data, header, slience, onProgress} = params;
        if(!slience){
            Loading.add();
        }
        let headers={
            'Content-Type':"application/json"
        };
        return axios.get(url, {
            params:data || {},
            responseType: 'json',
            timeout:Axios.timeout,
            withCredentials:false,
            headers: Object.assign({}, headers, header),
            onUploadProgress:onProgress
        }).then((res:any) => {
            if(!slience){
                Loading.remove();
            }
            return Promise.resolve(res.data)
        },(err:any) => {
            if(!slience){
                Loading.remove();
            }
            return Promise.reject({
                code:err.code,
                message:err.message
            })
        });
    };
    static post = (params:AxiosParams, timeout) => {
        const {url, data, header, slience, onProgress} = params;
        if(!slience){
            Loading.add();
        }
        // Todo 传递文件
        let headers={
            'Content-Type':"application/json"
        };
        // if(data){
        //     if("file" in data){
        //         let formData = new FormData();
        //         for (let key in data){
        //             formData.append(key,data[key]);
        //         }
        //         formData.append(name, data["file"].filename);
        //         data = formData;
        //         headers={
        //             'Content-Type':"application/x-www-form-urlencoded"
        //         }
        //     }
        // }
        return axios.post(url, data || {}, {
            responseType: 'json',
            timeout:timeout || Axios.timeout,
            withCredentials:false,
            headers: Object.assign({}, headers, header),
            onUploadProgress:onProgress
        }).then((res:any) => {
            if(!slience){
                Loading.remove();
            }
            return Promise.resolve(res.data)
        },(err:any) => {
            if(!slience){
                Loading.remove();
            }
            return Promise.reject({
                code:err.code,
                message:err.message
            })
        });
    };
    /**
     * @todo 改进需求
     * 提交formdata
     * @param {AxiosParams} params
     * @returns {Promise<AxiosResponse<any>>}
     */
    static postFormData = (params:AxiosParams) => {
        let {url, data, header, slience, onProgress} = params;
        if(!slience){
            Loading.add();
        }

        let headers={};
        return axios.post(url, data || {}, {
            responseType: 'json',
            timeout:Axios.timeout,
            withCredentials:false,
            headers: Object.assign({}, headers, header),
            onUploadProgress:onProgress,
            transformRequest: [function (data) {
                let ret = '';
                for (let it in data) {
                    ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
                }
                return ret
            }],
        }).then((res:any) => {
            if(!slience){
                Loading.remove();
            }
            return Promise.resolve(res.data)
        },(err:any) => {
            if(!slience){
                Loading.remove();
            }
            return Promise.reject({
                code:err.code,
                message:err.message
            })
        });
    };
}

/**
 * 同步方法
 */
class SyncAxios {
    static get = (params:AxiosParams, callback:(res:any) => void) => {
        const {url, header, slience} = params;
        if(!slience){
            Loading.add();
        }
        let request = new XMLHttpRequest();
        let loadEvent = 'onreadystatechange';
        let xDomain = false;
        // todo ie8 ie9 的特性
        if(typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !url.startsWith(`${location.protocol}//${location.host}`)){
            request = new window.XDomainRequest();
            loadEvent = 'onload';
            xDomain = true;
        }
        request.open("GET", url, false);
        request.setRequestHeader("Content-Type","application/json");
        request.setRequestHeader("Accept","application/json, text/plain, */*");
        request.setRequestHeader("token",header.token);
        request[loadEvent] = function () {
            if(!slience){
                Loading.remove();
            }
            const data=JSON.parse(request.response);
            callback(data);
        };
        request.onerror = function handleError() {
            if(!slience){
                Loading.remove();
            }
            request = null;
        };
        request.send();
    }
}

export {Axios, SyncAxios}
