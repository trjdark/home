/**
 * desc: 工具
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/15
 * Time: 上午10:04
 */
import { Base64Util } from "./crypto";

class CommonUtils {
    /**
     * 路由参数加密
     * @param {object} params
     * @returns {string}
     */
    static stringify(params:object){
        return Base64Util.stringify(JSON.stringify(params));
    }

    /**
     * 是否有路由参数
     * @param props
     * @returns {any}
     */
    static hasParams(props:any){
        return props.match && props.match.params && props.match.params.params;
    }

    /**
     * 路由参数解密
     * @param props
     * @returns {any}
     */
    static parse(props:any){
        const params=Base64Util.parse(props.match.params.params);
        return JSON.parse(params);
    }

    /**
     * 过滤请求参数
     * @param {object} params
     * @returns {{}}
     */
    static filterParams(params:object){
        let filterObj = {};
        for (let key in params){
            const val = params[key];

            if(val || val === 0 || val === false){
                if(typeof val === 'object'){
                    filterObj[key] = CommonUtils.filterParams(val);
                }else if(typeof val === 'string'){
                    filterObj[key] = val.trim();
                }else{
                    filterObj[key] = val;
                }
            }
        }
        return filterObj;
    }

    /**
     * 重写 window.open
     * @param {string} url
     */
    static newWin(url:string, id:string){
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('target','_blank');
        a.setAttribute('id', id);
        // 防止反复添加
        if(!document.getElementById(id)) {
            document.body.appendChild(a);
        }
        a.click();
    }
}

export {CommonUtils}
