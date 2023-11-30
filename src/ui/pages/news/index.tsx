/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2022/6/16
 * Time: 下午6:18
 */
import React from 'react';
import {Switch, Redirect} from "react-router-dom";
import {AuthorizedRoute} from "../../../router/authorizedRoute";
import {Routes} from "../../../common/enum/routes";

class News extends React.Component<any, any>{
    render(){
        return(
            <Switch>
                <Redirect to={Routes.账号消息列表.path} from={Routes.消息.path}/>
                <AuthorizedRoute {...Routes.账号消息列表}/>
                <AuthorizedRoute {...Routes.账号消息详情}/>
            </Switch>
        )
    }
}

export {News}