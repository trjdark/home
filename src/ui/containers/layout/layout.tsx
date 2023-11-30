/**
 * desc: 基础布局
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/30
 * Time: 下午6:14
 */

import React from 'react';
import {Header} from "./header";
import {Sider} from "./sider"
import {Scrollbars} from 'react-custom-scrollbars';
import {connect} from "../../component/decorator/connect";
import {getBasicInfo} from "../../../redux-actions/userActions";

@connect(() => ({}), {getBasicInfo})
class Layout extends React.Component<any, any>{
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
    }
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
                                <Sider siderHeight={scrollH - 60}/>
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

export {Layout};
