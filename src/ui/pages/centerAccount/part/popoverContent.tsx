/**
 * desc: 悬浮框
 * User: Katarina
 * Date: 2022/1/19
 * Time: 下午3:20
 */

import React from "react";
import {Icon, message,Popover} from "antd";

class PopoverContent extends React.Component<any, any> {
    state = {
        visible: false
    };

    hide = () => {
        this.setState({visible: false});
    };

    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    // 操作
    handleUnBind = () => {
        const {requestList,handleRequest,params} = this.props
        handleRequest({...params}).then(()=>{
            message.success('操作成功')
            requestList()
            this.hide()
        })
    }
    test = () => {
        const {disabled} = this.props
        if(disabled){
            this.hide()
        }
    }
    render() {
        const {text, disabled} = this.props
        return (
            <div  onClick={this.test} className='fr mr10'>
                <Popover
                    content={
                        <div>
                            <div>
                                <span className='gym-center-account-popover-text'>请确认，是否需要{text}?</span>
                            </div>
                            <div className='gym-center-account-popover-btn'>
                                <button className='gym-button-bind' onClick={this.handleUnBind}>确认</button>
                                <button className='gym-button-unbind' onClick={this.hide}>取消</button>
                            </div>
                        </div>
                    }
                    trigger="click"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                >
                    <span className={disabled?'disable-btn':'detail-btn'}>{text}</span>
                </Popover>
            </div>
        );
    }
}
export {PopoverContent}
