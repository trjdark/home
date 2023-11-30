/**
 * desc: 用户选择器
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/7
 * Time: 下午7:31
 */
import {Events} from "../../events/events";

/**
 * 用户应用列表选择器
 * @param state
 * @returns {any}
 */
export const selectUserApps=(state:any)=>{
    const userCache = state["user"];
    return (userCache[Events.GET_USER_APPS]||{}).data || [];
};
/**
 * 用户个人信息选择器
 * @param state
 * @returns {any[]}
 */
export const selectUserInfo = (state:any) => {
    const userCache = state["user"];
    return (userCache[Events.USER_INFO]||{}).data || {};
};
/**
 * 用户菜单权限选择器
 * @param state
 * @returns {{}}
 */
export const selectUserPermission = (state:any) => {
    const userCache = state["user"];
    return (userCache[Events.USER_PERMISSION]||{}).data || [];
}