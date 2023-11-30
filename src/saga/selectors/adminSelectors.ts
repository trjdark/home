/**
 * desc: admin selector
 * User: Vicky.Yu
 * Date: 2020/2/8
 * Time: 15:15
 */

import {Events} from "../../events/events";

/**
 *
 * @param state
 * @returns {{}}
 */
export const selectEmployeeTypeDefist = (state:any) => {
    const contractCache = state.admin;
    return (contractCache[Events.GET_EMPLOYEE_TYPE_DEF] || {}).data || {};
};

export const selectInfoList = (state:any) => {
    const infoCache = state.admin;
    return (infoCache[Events.GET_INFO_LIST] || {}).data || {};
};

export const selectStaffInfo = (state:any) => {
    const staffCache = state.admin;
    return (staffCache[Events.GET_STAFF_INFO] || {}).data || {};
};
