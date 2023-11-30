/**
 * desc: 自定义步骤条
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/4
 * Time: 下午1:59
 */
import React from 'react';
import {Icon} from "antd";
import './index.scss';

class MySteps extends React.Component<any, any>{
    render(){
        const {done, status, title, number} = this.props;
        return(
            <div
                className={(done && status) ? 'progress-item done' : 'progress-item'}
                style={{ width: this.props.width ? this.props.width + 'px' : ''}}>
                <div className="progress-body">
                    <h3>
                        {
                            done ? status ? <Icon type="check" theme="outlined" />: <Icon type="close" theme="outlined" /> : <span>{number}</span>
                        }
                    </h3>
                    <div className="progress-line"/>
                </div>
                <div className={(done && status) ? 'progress-title done' : 'progress-title'}>
                    {title}
                </div>
            </div>

        )
    }
}

export {MySteps}