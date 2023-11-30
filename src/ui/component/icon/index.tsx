/**
 * desc: 自定义icon
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/7
 * Time: 下午3:30
 */
import React,{EventHandler} from 'react';
import './font/iconfont.css';

declare interface IconProps {
    type:string;
    className?:string;
    onClick?:EventHandler<any>
}

class Icon extends React.Component<IconProps, any>{
    render(){
        return(
            <i onClick={this.props.onClick} className={`iconfont ${this.props.className||""}  icon-${this.props.type}`} />
        )
    }
}

export {Icon}
