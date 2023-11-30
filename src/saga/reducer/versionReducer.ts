/**
 * desc: 版本故事
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/30
 * Time: 下午5:56
 */
import {handleActions} from 'redux-actions';
// import Immutable from 'immutable';
import {Events} from "../../events/events";

const actions = handleActions({
    [Events.VERSION_LIST](state:any, action:any){
        return {
            ...state,
            [Events.VERSION_LIST]:{
                data:action.data
            }
        }
    },

}, {});

let VersionReducer:any={};

VersionReducer["version"] = actions;

export default VersionReducer;