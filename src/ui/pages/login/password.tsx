/**
 * desc: 找回密码
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/9
 * Time: 下午8:12
 */
import React from 'react';
import {PasswordMobile} from "./part/passwordMobile";
import {PasswordReset} from "./part/passwordReset";
import {PasswordResetSuccess} from "./part/passwordResetSuccess";
import { Scrollbars } from 'react-custom-scrollbars';
import {MySteps} from "../../component/steps";
import {CommonUtils} from "../../../common/utils/commonUtils";

class Password extends React.Component<any, any>{
    constructor(props:any){
        super(props)
        if(CommonUtils.hasParams(props)){

        }
        this.state = {
            stepIndex: 0,                         // 步骤
            scrollH:window.innerHeight - 60,
            username: '',                         // 用户名
            sign: '',                             // 签名
            isEditedSuccess: null,                // 是否修改成功
            stepsConfig: [
                {
                    name:'验证身份',
                    status: true,
                }, {
                    name: '设置新密码',
                    status: true
                }, {
                    name: '重置成功',
                    status: true
                }
            ],
            errCode: null,                         // 报错编码
            errMsg: '',                            // 报错信息
        }
    }
    goNext = () => {
        this.setState({stepIndex: this.state.stepIndex + 1})
    };
    /**
     *
     */
    goLogin = (step = 0) => {
        this.setState({
            stepIndex: step,
            stepsConfig: [
                {
                    name:'验证身份',
                    status: true,
                }, {
                    name: '验证身份',
                    status: true
                }, {
                    name: '重置成功',
                    status: true
                }
            ]
        });
    };
    componentDidMount(){
        window.addEventListener('resize', this.onReize)
    }
    onReize = () => {
        this.setState({
            scrollH:window.innerHeight - 60
        })
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.onReize)
    }

    /**
     * 跳转重置密码
     * @param params
     */
    jumpReset = (params) => {
        this.setState(params)
        this.goNext();
    }
    /**
     * 跳转到结果
     * @param result
     */
    jumpResult = (result:boolean, err = null) => {
        this.setState({
            isEditedSuccess: result,
            stepsConfig: [
                {
                    name:'验证身份',
                    status: true,
                }, {
                    name: '验证身份',
                    status: true
                }, {
                    name: result ? '重置成功' : '重置失败',
                    status: result
                }
            ],
            errCode: err ? err.code : null,
            errMsg: err ? err.msg : ''
        });
        this.goNext();
    }
    render(){
        const {stepIndex, username, sign, isEditedSuccess, stepsConfig, errMsg, errCode} = this.state;
        return(
            <div id={`gym-find-password`} className={`gym-find-password`}>
                <header className={`gym-find-password-header`}>
                    <div className={`gym-wrapper`}>
                        <div className={`gym-layout-header-logo`}>
                            <img className={`gym-layout-header-logo-img`} src={require('../../../images/home-logo.png')} alt=""/>
                        </div>
                    </div>
                </header>
                <Scrollbars
                    autoHeight={true}
                    universal={true}
                    autoHeightMin={this.state.scrollH}
                    autoHide={true}
                >
                    <div className="gym-wrapper gym-find-password-content">
                        <div className="gym-find-password-steps">
                            {
                                stepsConfig.map((item:any, index:any) =>
                                    <MySteps
                                        key={`steps_${index}`}
                                        title={item.name}
                                        number={index+1}
                                        done={this.state.stepIndex >= index}
                                        status={item.status}
                                    />
                                )
                            }
                        </div>
                        {stepIndex === 0 && <PasswordMobile jumpResetPassword={this.jumpReset} />}
                        {stepIndex === 1 && <PasswordReset jumpToResult={this.jumpResult} username={username} sign={sign} isFirstUnHo={false} />}
                        {stepIndex === 2 && <PasswordResetSuccess next={this.goLogin} isSuccess={isEditedSuccess} errCode={errCode} errMsg={errMsg}/>}
                    </div>
                </Scrollbars>

            </div>
        )
    }
}

export {Password}