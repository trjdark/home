/**
 * desc: 下载app
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/11/7
 * Time: 上午11:34
 */
import React from 'react';
// import QRCode from "qrcode.react";
import { QRCode } from 'react-qrcode-logo';

class Download extends React.Component<any, any> {
    state = {
        scrollH: window.innerHeight
    };
    componentDidMount(){
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
            <div id={`gym-download`} style={{height: scrollH}} className={`gym-download`}>
                <div className={`gym-download-logo`}>
                    <img className={`gym-download-logo-img`} src={require(`../../images/login/watermark.png`)} alt=""/>
                </div>
                <div className={`gym-wrapper gym-download-content`}>
                    <div className={`gym-download-content-phone`}>
                        <img className={``} src={require(`../../images/download_phone.png`)} alt=""/>
                    </div>
                    <div className={`gym-download-content-code`}>
                        <div className={`gym-download-content-code-box`}>
                            <div className={`gym-download-content-code-title`}>
                                <img className={`gym-download-content-code-title-touch-logo`} src={require(`../../images/touch_logo.png`)} alt=""/>
                                <span>Touch App</span>
                            </div>
                            <QRCode
                                value={process.env.TOUCH_DOWNLOAD_URL}
                                size={120}
                                logoImage={require('../../images/touch_download_logo.png')}
                                logoWidth={30}
                                logoHeight={30}
                            />
                            <p className={`gym-download-content-code-desc`}>iOS下载，扫一扫</p>
                        </div>
                        <p className={`gym-download-content-code-desc sm`}>Touch目前仅支持 iOS</p>
                    </div>

                </div>
            </div>
        )
    }
}

export {Download}