/**
 * desc: form表单装饰器
 * User: Renjian.Tang/trj8772@aliyun.com
 * Date: 2018/8/1
 * Time: 上午10:48
 */
import {Form} from "antd";

function form(options?:any) {
    return function wrapWithConnect(target) {
        return Form.create(options)(target) as any;
    }
}

export {form};