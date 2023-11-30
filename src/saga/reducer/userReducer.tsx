/**
 * desc: 用户reducer
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/30
 * Time: 下午5:56
 */
import {handleActions} from 'redux-actions';
// import Immutable from 'immutable';
import {Events} from "../../events/events";

const actions = handleActions({
    [Events.GET_USER_APPS](state:any, action:any){
        return {
            ...state,
            [Events.GET_USER_APPS]:{
                data:action.data
            }
        }
    },
    [Events.USER_INFO](state:any, action:any){
        const data = Object.assign({}, action.data, {level: (action.data.list || []).map((item:any) => item.unitName)})
        return {
            ...state,
            [Events.USER_INFO]:{
                data: data
            }
        }
    },
    [Events.USER_PERMISSION](state:any, action:any){
        return {
            ...state,
            [Events.USER_PERMISSION]:{
                data:action.data
            }
        }
    },
}, {});

let UserReducer:any={};

UserReducer["user"] = actions;

export default UserReducer;