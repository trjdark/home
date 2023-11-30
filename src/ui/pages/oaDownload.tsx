/**
 * desc: oa 下载页面
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2019/12/30
 * Time: 上午10:38
 */
import React from 'react';

class OADownload extends React.Component<any, any> {
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
            <div id="gym-download" style={{height: scrollH}} className="gym-oa-download">
                <div className={`gym-oa-download-logo`}>
                    <img className={`gym-oa-download-logo-img`} src={require(`../../images/login/watermark.png`)} alt=""/>
                </div>
                <div className={`gym-wrapper gym-oa-download-content`}>
                    <div className={`gym-oa-download-content-phone`}>
                        <img className={``} src={require(`../../images/download_oa.png`)} alt=""/>
                    </div>
                    <div className={`gym-oa-download-content-code`}>
                        <div className="gym-oa-download-content-code-title">
                            <div className="gym-oa-download-content-code-title-logo">
                                <img src={require(`../../images/oa_logo.png`)} alt=""/>
                            </div>
                            <div className="gym-oa-download-content-code-title-text">
                                <p className="lg">E-Mobile7</p>
                                <p className="xs">OA移动化办公管家</p>
                            </div>
                        </div>
                        <div className="gym-oa-download-content-code-content">
                            <div>
                                <img className="gym-oa-download-content-code-content-img" src={require(`../../images/oa_qr_code_ios.png`)} alt=""/>
                                <p className="gym-oa-download-content-code-content-text">IOS下载，扫一扫</p>
                            </div>
                            <div>
                                <img className="gym-oa-download-content-code-content-img" src={require(`../../images/oa_qr_code_android_2.png`)} alt=""/>
                                <p className="gym-oa-download-content-code-content-text">安卓下载，扫一扫</p>
                            </div>
                        </div>
                        <div className="gym-oa-download-content-code-desc">
                            <div className="gym-oa-download-content-code-desc-content">
                                <p>1.手机下载完成后请点击图标</p>
                                <div className="gym-oa-download-content-code-desc-content-logo">
                                    <img src={require(`../../images/oa_logo.png`)} alt=""/>
                                </div>
                            </div>
                            <div  className="gym-oa-download-content-code-desc-content">
                                <div>
                                    <p>2.首次登录时需输入以下服务器地址后方可 </p>
                                    <p>进入登录界面 </p>
                                    <p>https://emobile.gymbomate.com</p>
                                </div>
                            </div>

                        </div>
                        {/*<div className={`gym-download-content-code-box`}>*/}
                            {/*<div className={`gym-download-content-code-title`}>*/}
                                {/*<img className={`gym-download-content-code-title-touch-logo`} src={require(`../../images/touch_logo.png`)} alt=""/>*/}
                                {/*<span>Touch App</span>*/}
                            {/*</div>*/}

                            {/*<p className={`gym-download-content-code-desc`}>iOS下载，扫一扫</p>*/}
                        {/*</div>*/}
                        {/*<p className={`gym-download-content-code-desc sm`}>Touch目前仅支持 iOS</p>*/}
                    </div>

                </div>
            </div>
        )
    }
}

export {OADownload}