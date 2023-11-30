/**
 * desc: 版本信息选择器
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/10
 * Time: 上午10:11
 */
import {Events} from "../../events/events";

/**
 *
 * @param state
 * @returns {any}
 */
export const selectVersionInfo=(state:any)=>{
    const userCache = state["version"];
    return (userCache[Events.VERSION_LIST]||{}).data || {};
};