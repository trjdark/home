/**
 * desc: 登录表单
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/31
 * Time: 下午6:11
 */

/// <reference path="../../../../.h/user.d.ts" />
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {form} from "../../../component/decorator/form";
import {Form, Icon, Input, Button, Modal, Message} from 'antd';
import {Login} from "../../../../redux-actions/userActions";
import {connect} from "../../../component/decorator/connect";
import {Routes} from "../../../../common/enum/routes";
import {User} from "../../../../common/beans/user";
import {getQrCode} from "../../../../redux-actions/userActions";
import QRCode from "qrcode.react";
import {SSE} from "../../../../service/socket";
import {Storage} from "../../../../common/utils/storage";
import history from "../../../../router/history";
import {CommonUtils} from "../../../../common/utils/commonUtils";
import {Cookie} from "../../../../service/cookie";

const FormItem = Form.Item;

@connect((state:any) => ({...state}), {})
@form()
class LoginForm extends Component<any, any>{
    private form:any;
    private DEFAULT_LOGIN_TYPE:number = 1; // 默认登录方式：0为普通登录，1为强制登录
    private FORCE_LOGIN_TYPE:number = 1;   // 强制登录方式
    private timer:any;
    private VALID_TIME:number = 120;        // 二维码有效时间
    constructor(props:any){
        super(props)
        this.state = {
            errInfo:{
                errorTimes: null
            },
            visible: false,
            errMsg: null,
            modalErrMsg: '',
            forceLoginModal: false,   // 强制登录弹窗
            isPasswordLogin: true,    // 是否密码登录
            isQrCodeExpired: false,   // 二维码失效
            isScanSuccess: false,     // 是否扫码成功
            code: '',                 // 二维码
            count: this.VALID_TIME,
        }
    }
    componentDidMount(){
        // 如果二维码登录，则获取二维码
        const {isPasswordLogin} = this.state;
        if(!isPasswordLogin){
            this.getQrCode();
        }
    }
    /**
     * 登录
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const {validateFields, getFieldValue} = this.props.form;

        validateFields((err:any, values:User) => {
            if (!err) {
                this.setState({
                    username: getFieldValue('username'),
                    password: getFieldValue('password')
                });
                Login(Object.assign({}, values, {type: this.DEFAULT_LOGIN_TYPE})).then((res:any) => {
                    if(res.errorCode === '10004'){
                        this.setErrorConfig(res);
                        return;
                    }
                    // 如果第一次登录
                    if(res.firstLogin){
                        history.push(`${Routes.首次登录修改密码.link}${CommonUtils.stringify({
                            username:res.person.fullUsName,
                            sign: res.sign,
                            isHo: res.hoFlag
                        })}`);
                    }else{
                        Cookie.setCookie('userName', res.person.fullUsName);
                        Storage.multSet({
                            '_token': res.token,
                        });
                        User.user = {
                            userName: res.person.fullUsName,
                            firstName: res.person.firstName,
                            fullName: res.person.fullName,
                            positionName: res.person.positionName,
                            email: res.person.email,
                            employeeCode: res.person.employeeCode,
                            photo: res.person.photo,
                            sex:res.person.sex,
                            token: res.token
                        };
                        history.push(Routes.首页.path);
                    }

                },(err) => {
                    this.setErrorConfig(err.data);
                })
            }
        });

    };

    /**
     * 切换登录状态
     */
    changeLoginType = () => {
        const {isPasswordLogin} = this.state;
        if(isPasswordLogin){
            this.getQrCode();
        }else{
            SSE.close()
        }
        this.setState({
            isPasswordLogin: !isPasswordLogin,
            isQrCodeExpired: false,
            isScanSuccess: false,
            count: this.VALID_TIME
        });
    };
    /**
     * 获取二维码
     */
    getQrCode = () => {
        const {code} = this.state;
        getQrCode({oldQCode: code}).then((res:any) => {
            this.setState({code: res})
            this.startInterval()
            SSE.init(res);
            SSE.message((event:any) => {
                this.dealScanCode(JSON.parse(event.data))
            })
        }, (err:any) => {

        })
    };
    /**
     * 刷新二维码
     */
    refreshCode = () => {
        // todo 调用接口
        this.setState({
            isQrCodeExpired: false,
            count: this.VALID_TIME,
            code: ''
        })
        this.getQrCode();
    };
    /**
     * 开始倒计时
     */
    startInterval = () => {
        const INTERVALS = 1000;
        this.clear();
        this.timer = setInterval(() => {
            if(this.state.count === 0){
                this.clear();
                SSE.close();
                this.setInterval(0);
                this.setState({
                    isQrCodeExpired:true
                })
            }else{
                this.setInterval(this.state.count - 1);
            }
        }, INTERVALS);
    }
    setInterval(count:number){
        this.setState({count});
    }
    clear = () => {
        clearInterval(this.timer);
    }
    /**
     * 处理扫码返回值
     * @param res
     */
    dealScanCode = (res) => {
        const {form} = this.props;
        // 扫码成功
        if(res.data === 1){
            this.setState({isScanSuccess: true})
        }
        // 扫码成功，退出
        if(res.data === -1){
            this.setState({
                isScanSuccess: false,
                isQrCodeExpired: true,
                count: this.VALID_TIME
            });
            SSE.close();
            this.clear();
        }
        // 扫码成功，登录
        if(typeof res.data === 'object' && res.data.data && res.data.data.errorCode === '10004'){
            form.setFieldsValue({
                'username': res.data.data.person.fullUsName,
                'token': res.data.data.token
            });
            this.setState({forceLoginModal: true})
        }
        if(typeof res.data === 'object' && res.data.data && !res.data.data.errorCode){
            SSE.close();
            Storage.multSet({
                '_token': res.data.data.token,
            });
            User.user = {
                userName: res.data.data.person.username,
                firstName: res.data.data.person.firstName,
                fullName: res.data.data.person.fullName,
                positionName: res.data.data.person.positionName,
                email: res.data.data.person.email,
                employeeCode: res.data.data.person.employeeCode,
                photo: res.data.data.person.photo,
                sex: res.data.data.person.sex,
                token: res.data.data.token,
            };
            history.push(Routes.首页.path);
        }
    };
    /**
     * 现实错误信息
     * @param {number} n
     * @returns {any}
     */
    iconView = (n:number) => {
        if(n > 0){
            const Icons:Array<any> = []
            for(let i = 0; i < 5; i++){
                if(i < n){
                    Icons.push(<Icon key={`${i}_icon`} className={`icon`} type="close-circle" theme="outlined" />)
                }else{
                    Icons.push(<Icon key={`${i}_icon`}  className={`icon un`} type="close-circle" theme="outlined" />)
                }
            }
            return Icons;
        }
        return null;
    };

    /**
     * 设置错误状态
     * @param config
     */
    setErrorConfig = (config:any) => {
        // 用户名密码不匹配
        if(config.errorCode === "10002" || config.errorCode === "10003"){
            switch (config.errorTimes){
                case 1:
                case 2:
                    this.setState({
                        errInfo:config,
                        errMsg:`Gymbo ID或密码不正确`,
                    });
                    return;
                case 3:
                case 4:
                    this.setState({
                        errInfo:config,
                        errMsg:`Gymbo ID或密码不正确`,
                        visible: true,
                        modalErrMsg: `您输错密码已累计${config.errorTimes}次，继续输错${5 - config.errorTimes}次将冻结您的账户，是否需要找回密码？`
                    });
                    return;
                case 5:
                default:
                    this.setState({
                        errInfo:config,
                        errMsg:`Gymbo ID或密码不正确`,
                        visible: true,
                        modalErrMsg: `您的账户已冻结！10分钟以后再试试~`
                    });
                    return;
            }

        }else if(config.errorCode === "10001"){
            // 用户名不存在
            this.setState({
                errMsg: `Gymbo ID不存在`,
                errInfo:{}
            })
        }
        // else if(config.errorCode === '10004'){
        //     this.setState({forceLoginModal: true})
        // }
        else if(config.errorCode === '10006'){
            this.setState({
                errMsg: `不能早于首次登录日期前登录`,
                errInfo:{}
            })
        }else if(config.errorCode === '10007'){
            Message.error('密码已过有效期90天,请重置密码后登录')
            history.push(Routes.找回密码.path)
        }
    }
    /**
     * 显示错误
     * @param errInfo
     * @returns {any}
     */
    showError =() => {
        const {errMsg, errInfo} = this.state;
        if(errMsg){
            return (
                <div className={`err-div`}>
                    {this.iconView(errInfo.errorTimes)}
                    <span>{this.state.errMsg}</span>
                </div>
            )
        }else{
            return null
        }
    };

    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {modalErrMsg, isPasswordLogin, isQrCodeExpired, isScanSuccess, code} = this.state;
        return(
            <Form className={`gym-login-form`} onSubmit={this.handleSubmit} ref={(ref:any) => this.form = ref}>
                <Modal
                    visible={this.state.visible}
                    closable={false}
                    onCancel={() => this.setState({visible: false})}
                    className={`gym-modal`}
                    footer={
                        <div className={`gym-login-form-modal-buttons`}>
                            <Link to={Routes.找回密码.path}>
                                <button className={`gym-login-form-modal-buttons-link`}>找回密码</button>
                            </Link>
                            <button className={`gym-login-form-modal-buttons-cancel`} onClick={()=>this.setState({visible:false})}>再试试</button>
                    </div>}
                >
                    <p>{modalErrMsg}</p>
                </Modal>

                {/* Todo 扫码登录 */}
                <div className={`gym-login-form-tap`}/>
                {
                    isPasswordLogin
                    ?
                     //  密码登录
                     <div>
                         <FormItem className={`gym-login-form-item`}>
                             <div className={`gym-login-form-item-logo`}>
                                 <img src={require('../../../../images/login/login_form_title2.png')} alt=""/>
                             </div>
                         </FormItem>
                         <div className={`gym-login-form-item-inputs`}>
                             <FormItem className={`gym-login-form-item gym-login-form-item-input username-input`}>
                                 {getFieldDecorator('username')(
                                     <Input
                                         prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                         placeholder="请输入您的Gymbo ID"
                                         autoComplete="off"
                                     />
                                 )}
                             </FormItem>
                             <FormItem className={`gym-login-form-item gym-login-form-item-input password-input`}>
                                 {getFieldDecorator('password')(
                                     <Input
                                         prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                         type="password"
                                         placeholder="请输入您的密码"
                                         autoComplete="off"
                                     />
                                 )}
                             </FormItem>
                         </div>
                         <FormItem className={'gym-login-form-item-link'}>
                             <Link to={Routes.找回密码.path}>重置密码</Link>
                         </FormItem>
                         <div>
                             {this.showError()}
                         </div>
                         <FormItem className={`gym-login-form-item`}>
                             <button
                                 // htmlType="submit"
                                 className={
                                     `gym-login-form-item-button ${(getFieldValue('username') && getFieldValue('password') ? '' : 'grey'}`}
                                 disabled={!(getFieldValue('username') && getFieldValue('password')}
                             >
                                 登录
                             </button>
                         </FormItem>
                     </div>
                    :
                    isScanSuccess
                        ? <div className={`gym-login-form-scan`}>
                            <div className={`gym-login-form-scan-img`}>
                                {/* todo 二维码从后台获取 */}
                                <img className={`gym-login-form-scan-img-img`} src={require('../../../../images/login/mobile.png')} alt=""/>
                                <p className={`gym-login-form-scan-success-text`}>扫描成功！</p>
                                <p className={`gym-login-form-scan-success-text2`}>请在手机上确认登录</p>
                            </div>
                            <FormItem>
                                {getFieldDecorator('username')(<span/>)}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('token')(<span/>)}
                            </FormItem>
                            <FormItem className={'gym-login-form-item-link'}>
                                <a onClick={this.changeLoginType}>密码登录</a>
                            </FormItem>
                        </div>
                        : <div className={`gym-login-form-code`}>
                            <div className={`gym-login-form-code-img`}>
                                {/* todo 二维码从后台获取 */}
                                {
                                    code ? <QRCode value={code}/> : <Icon type="loading" theme="outlined" />
                                }

                            </div>
                            {
                                isQrCodeExpired &&
                                <div className={`gym-login-form-code-err`}>
                                    <span className={`gym-login-form-code-err-text`}>二维码已失效</span>
                                    <button className={`gym-login-form-code-err-button`} onClick={this.refreshCode}>请点击刷新</button>
                                </div>
                            }
                            <div className={`gym-login-form-code-text`}>
                                <Icon type="scan" theme="outlined" />
                                <div>
                                    <p>打开Touch</p>
                                    <p>扫一扫登录</p>
                                </div>
                            </div>
                            <FormItem className={'gym-login-form-item-link'}>
                                <a onClick={this.changeLoginType}>密码登录</a>
                            </FormItem>
                        </div>
                }
            </Form>
        )
    }
}

export {LoginForm}
