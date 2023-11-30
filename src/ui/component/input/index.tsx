/**
 * desc: 输入框，限制输入长度,复制粘贴自动截取
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/10/15
 * Time: 下午5:06
 */
import React from 'react';

class Input extends React.Component<any, any>{
    handleChange = (e:any) => {
        const value =e.target.value || "";
        this.props.onChange(value);
    };
    render(){
        return(
            <input onChange={this.handleChange} {...this.props}/>
        )
    }
}

export {Input}