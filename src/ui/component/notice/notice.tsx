/**
 * desc: 底层组件
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/15
 * Time: 下午4:13
 */
import React from 'react';
import {Routes} from "../../../common/enum/routes";
import {Modal} from "antd";
import history from '../../../router/history';
import {Toast} from "./index";

class Notice extends React.Component<any, any>{
    goHome = () => {
        // @todo
        Toast.hide();
        history.push(Routes.登陆.path)
    }
    render(){
        return(
            <div className={`gym-shadow-box`}>
                <Modal
                    visible={true}
                    closable={false}
                    onCancel={() => this.setState({visible: false})}
                    className={`gym-modal`}
                    footer={
                        <div className={`gym-shadow-box-buttons`}>
                            <span className={`gym-shadow-box-buttons-button`} onClick={this.goHome}>知道了</span>
                        </div>}
                >
                    <p>您的Gymbo ID账户已在其他地址登录，即将回到登录页。如非本人操作请及时修改密码。</p>
                </Modal>
            </div>
        )
    }
}

export {Notice}