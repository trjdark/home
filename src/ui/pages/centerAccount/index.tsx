/**
 * desc: 中心账号申请
 * User: Katarina
 * Date: 2022/1/19
 * Time: 下午3:20
 */
import React from 'react';
import {Switch, Redirect} from "react-router-dom";
import {AuthorizedRoute} from "../../../router/authorizedRoute";
import {Routes} from "../../../common/enum/routes";

class CenterAccount extends React.Component<any, any>{
    render(){
        return(
            <Switch>
                <Redirect to={Routes.账号申请.path} from={Routes.中心账号.path}/>
                <AuthorizedRoute {...Routes.账号管理}/>
                <AuthorizedRoute {...Routes.账号申请}/>
            </Switch>
        )
    }
}

export {CenterAccount}
