/**
 * desc: 首页
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/30
 * Time: 下午6:22
 */
import React from 'react';
import {connect} from "../../component/decorator/connect";
import 'moment/locale/zh-cn';
import {selectUserApps} from '../../../saga/selectors/user';
import {MyCalendar} from './part/calendar';
import {MyMessage} from './part/message';
import {MyApp} from "./part/myApp";
import { QRCode } from 'react-qrcode-logo';
import {Icon} from "antd";

@connect((state:any) => ({userApps: selectUserApps(state)}), {} )

class Home extends React.Component<any, any>{
    constructor(props) {
        super(props);
        this.state = {
            // visible: true
        }
    }
    // closeQRCode = () => {
    //     this.setState({visible:false})
    // };
    render(){
        // const {visible} = this.state;
        return(
            <div id={`gym-home`} className={'gym-home gym-wrapper'}>
                <div className={`gym-home-left-content`}>
                    <MyMessage/>
                    <MyCalendar/>
                </div>
                <div className={`gym-home-right-content`}>
                    <MyApp/>
                </div>
                {/* {
                    visible &&
                    <div className={`gym-home-download-qr-code`}>
                        <Icon type="close" className={'gym-home-download-qr-code-close'} onClick={this.closeQRCode}/>
                        <QRCode
                            value={process.env.TOUCH_DOWNLOAD_URL}
                            size={100}
                            logoImage={require('../../../images/touch_download_logo.png')}
                            logoWidth={25}
                            logoHeight={25}
                        />
                        <div>
                            <span className={`gym-home-download-qr-code-text`}>Touch</span>&nbsp;
                            <span className={`gym-home-download-qr-code-text sm`}>iOS下载</span>
                        </div>
                    </div>
                } */}
            </div>
        )
    }
}

export {Home}