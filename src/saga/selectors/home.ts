/**
 * desc: 首页数据选择器
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/13
 * Time: 下午3:50
 */
import {Events} from "../../events/events";

/**
 * 当月日期获取选择
 * @param state
 * @returns {any}
 */
export const selectHasMeetingCalendarList=(state:any)=>{
    const homeCache = state["home"];
    return (homeCache[Events.HAS_MEETING_LIST]||{}).data || [];
};

/**
 * 当月日期获取选择
 * @param state
 * @returns {any}
 */
export const selectHeadApps=(state:any)=>{
    const homeCache = state["home"];
    return (homeCache[Events.GET_USER_HEAD_APPS]||{}).data || [];
};

/**
 * 弹屏信息
 * @param state
 * @returns {any[]}
 */
export const selectEmitNews = (state:any)=>{
    const homeCache = state["home"];
    return (homeCache[Events.NEWS_LIST]||{}).data || [];
};