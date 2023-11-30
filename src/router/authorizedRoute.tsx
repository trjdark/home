/**
 * desc: 合法路由，加入权限控制
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/2
 * Time: 下午6:55
 */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const AuthorizedRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render = {
            props =>
            (typeof rest.authority === 'boolean' && !rest.authority)
                ? (<Redirect to={rest.redirectPath || '/login'}/> )
                : (<Component {...props} />)
            }
    />
);

export {AuthorizedRoute}