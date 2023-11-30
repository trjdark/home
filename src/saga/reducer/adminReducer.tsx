/**
 * desc: adminreducer
 * User: Vicky.Yu
 * Date: 2020/2/6
 * Time: 上午09:20
 */
import {handleActions} from 'redux-actions';
import {Events} from "../../events/events";

const actions = handleActions({
    [Events.GET_INFO_LIST](state:any, action:any){
        return {
            ...state,
            [Events.GET_INFO_LIST]:{
                data: action.data
            }
        }
    },
    [Events.GET_TREE](state:any, action:any){
        return {
            ...state,
            [Events.GET_TREE]:{
                data: action.data
            }
        }
    },
    [Events.GET_STAFF_INFO](state:any, action:any){
        return {
            ...state,
            [Events.GET_STAFF_INFO]:{
                data: action.data
            }
        }
    }
},
                              {});

let AdminReducer:any={};

AdminReducer.admin = actions;

export default AdminReducer;
