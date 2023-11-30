/**
 * desc: 页面标题组件
 * User: Renjian.Tang/trj8772@aliyun.com
 * Date: 2018/8/11
 * Time: 下午1:42
 */
import React from 'react';
import{Divider} from "antd";
import './index.scss';

declare interface PageTitleProps {
    title:string | React.ReactNode;
    className?:string;
}

class PageTitle extends React.Component<PageTitleProps,any>{
    render(){
        const {title} = this.props;
        return(
            <div className={`gym-page-title ${this.props.className || ''}`}>
                <div className={'gym-page-title-text'}>{title}</div>
                <Divider/>
            </div>
        )
    }
}

export {PageTitle}