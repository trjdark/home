/**
 * desc: 首页
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/13
 * Time: 下午3:48
 */
import {handleActions} from 'redux-actions';
// import Immutable from 'immutable';
import {Events} from "../../events/events";

const actions = handleActions({
    [Events.HAS_MEETING_LIST](state:any, action:any){
        return {
            ...state,
            [Events.HAS_MEETING_LIST]:{
                data:action.data
            }
        }
    },
    [Events.GET_USER_HEAD_APPS](state:any, action:any){
        return {
            ...state,
            [Events.GET_USER_HEAD_APPS]:{
                data:action.data
            }
        }
    },
    [Events.NEWS_LIST](state:any, action:any){
        return {
            ...state,
            [Events.NEWS_LIST]:{
                data:action.data
            }
        }
    }
}, {});

let HomeReducer:any={};

HomeReducer["home"] = actions;

export default HomeReducer;