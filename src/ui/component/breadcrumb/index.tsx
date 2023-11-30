/**
 * desc: 面包屑组件
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/3
 * Time: 上午10:34
 */
import React from 'react';
import {Link} from "react-router-dom";
import { Breadcrumb as AntdBreadCrumb } from 'antd';

declare interface RouteProps {
    name: string,
    path: string,
    id: string,
    link: string
}

declare interface RoutesProps {
    routes: Array<RouteProps>
}

class BreadCrumb extends React.Component<RoutesProps, any>{
    render(){
        return(

            <AntdBreadCrumb separator=">">
                <span>当前位置：</span>
                {
                    (this.props.routes || []).map((route:RouteProps) =>
                        <AntdBreadCrumb.Item key={route.name}>
                            <Link to={route.link}>{route.name}</Link>
                        </AntdBreadCrumb.Item>)
                }
            </AntdBreadCrumb>
        )
    }
}

export {BreadCrumb}