/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2022/6/16
 * Time: 下午6:12
 */
import React from 'react';
import {Header} from "./header";
import {Menu} from "antd";
import {Icon} from "../../component/icon";
import {Link} from "react-router-dom";

import {Scrollbars} from 'react-custom-scrollbars';
import {connect} from "../../component/decorator/connect";
import {getBasicInfo} from "../../../redux-actions/userActions";
import history from "../../../router/history";

@connect(() => ({}), {getBasicInfo})
class NewsLayout extends React.Component<any, any>{
    state = {
        scrollH: window.innerHeight
    };
    componentDidMount(){
        this.props.getBasicInfo();
        window.addEventListener('resize',this.onResize);
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.onResize);
    }
    onResize = () => {
        this.setState({scrollH: window.innerHeight})
    };
    // 控制跳转侧边栏高亮
    getSelectedKeys = () => {
        return [history.location.pathname.split('/')[2]];
    };
    render(){
        const {scrollH} = this.state;
        return(
            <div id={'gym-main'}>
                <Header/>
                <div id='gym-layout-content'>
                    {
                        this.props.centerAccount &&
                        <div className={'gym-sider'}>
                            <Scrollbars
                                autoHide={true}
                                universal={true}
                                // Todo 高度不能写死
                                autoHeightMin={scrollH - 60}
                                autoHeightMax={scrollH - 60}
                                autoHeight={true}
                            >
                                <Menu id={'menuWrapper'} mode="inline" selectedKeys={this.getSelectedKeys()} defaultSelectedKeys={['apply']}>
                                        <Menu.Item className={'mainMenuWrapper'} key="notice">
                                        <span>
                                            <Icon type="ceshishenqing" className={`ant-menu-item-icon`} />
                                            <Link className={`mainMenuWrapperHref`} to={"/news/notice"}>消息列表</Link>
                                        </span>
                                    </Menu.Item>
                                </Menu>
                            </Scrollbars>
                        </div>
                    }
                    <Scrollbars
                        className={this.props.centerAccount?'':'gym-content'}
                        autoHide={true}
                        universal={true}
                        // Todo 高度不能写死
                        autoHeightMin={scrollH - 60}
                        autoHeightMax={scrollH - 60}
                        autoHeight={true}
                    >

                        <div id={this.props.centerAccount?'':'gym-content'} >
                            {this.props.children}
                        </div>
                    </Scrollbars>
                </div>
            </div>
        )
    }
}

export {NewsLayout};
