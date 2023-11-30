/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/3
 * Time: 下午2:00
 */
import React from "react";
import {Menu} from "antd";
import {Icon} from "../../component/icon";
import {Link} from "react-router-dom";
import history from "../../../router/history";

class Sider extends React.Component<any, any>{
    constructor(props:any){
        super(props)
        this.state = {
            openKey: ["member"]
        }
    }

    fields = () => {

    };
    // 控制跳转侧边栏高亮
    getSelectedKeys = () => {
        return [history.location.pathname.split('/')[2]];
    };
    render(){
        return(
                <Menu id={'menuWrapper'} mode="inline" selectedKeys={this.getSelectedKeys()} defaultSelectedKeys={['apply']}>
                    <Menu.Item className={'mainMenuWrapper'} key="management">
                        <span>
                            <Icon type="guanli" className={`ant-menu-item-icon`} />
                            <Link className={`mainMenuWrapperHref`} to={"/centerAccount/management"}>中心 Gymbo ID 管理</Link>
                        </span>
                    </Menu.Item>
                    <Menu.Item className={'mainMenuWrapper'} key="apply">
                        <span>
                            <Icon type="ceshishenqing" className={`ant-menu-item-icon`} />
                            <Link className={`mainMenuWrapperHref`} to={"/centerAccount/apply"}>中心 Gymbo ID 申请</Link>
                        </span>
                    </Menu.Item>
                </Menu>
        )
    }
}

export {Sider}
