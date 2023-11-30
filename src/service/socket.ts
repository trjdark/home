/**
 * desc: server sent Event 试试推送
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/11/7
 * Time: 上午10:32
 */
import {Actions} from "../api/actionApi";

class SSE {
    static _sse:any;

    static init(option:any){
        if (!('EventSource' in window)) {
            console.log('不支持sse')
            return;
        }
        this._sse = new EventSource(`${process.env.API_URL}${Actions.二维码状态异步通知}${option}`);
    }

    static message(callback){
        this._sse.addEventListener('message', (event) => {
            callback(event)
        })
    }

    static close() {
        this._sse.close();
    }

    static getSSE () {
        return this._sse;
    }
}

export {SSE}