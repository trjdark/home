/**
 * desc: 态势感知
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2019/3/25
 * Time: 下午5:45
 */
import React, {Component} from "react";
import {getSyncCode} from "../../../redux-actions/userActions";
// import {CommonUtils} from "../../../common/utils/commonUtils";


class Aware extends Component<any, any>{
    constructor(props:any){
        super(props)
    }
    componentDidMount(){
        getSyncCode((res:any) => {
            if(res.code){
                // CommonUtils.newWin(`${process.env.AWARE_URL}/?code=${res.code}`, 'aware');
                window.location.href = `${process.env.AWARE_URL}/?code=${res.code}`
            }
        });
    }
    render = () => <div/>
}

export {Aware}