/**
 * desc: 忘记密码-验证手机
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/10
 * Time: 下午2:33
 */
import React from 'react';
import {Link} from "react-router-dom";
import {form} from "../../../component/decorator/form";
import {Routes} from '../../../../common/enum/routes';
import {Form, Input, Icon, message, Popover} from "antd";
import {Icon as MyIcon} from "../../../component/icon";

const Search = Input.Search;
import {connect} from "../../../component/decorator/connect";
// import {Events} from "../../../../events/events";
import {checkUsername, checkSecurityCode} from "../../../../redux-actions/userActions";
// import history from "../../../../router/history";
import {sendSecurityCode} from "../../../../api/password";
import history from "../../../../router/history";
import {CommonUtils} from "../../../../common/utils/commonUtils";

/*申明值类型*/
// declare interface UserName{
//     userName:string;
// }

const FormItem = Form.Item;
// const error = Modal.error;
@form()
@connect((state:any) => ({...state}),{checkUsername,sendSecurityCode})
class PasswordMobile extends React.Component<any, any>{
    private form;
    private timer:any;
    private  COUNT_DOWN:number = 60;
    constructor(props:any){
        super(props)
        this.state = {
            username:'',
            chineseName:'',
            isErrorUserName: false, // 校验用户名是否错误
            isErrorSecurityCode:false, // 校验短信验证码
            showStepUser:true,  // 默认展示校验用户
            showStepSMS:false,   // 默认不展示短信验证码
            phoneNumber:'',
            count: this.COUNT_DOWN, // 短信验证码倒计时60s
            showGetText:true,  // 短信验证码text
            showSeconds:false,  // 短信验证码text
            verifyCode:'获取验证码',
            isSendCode: true,
            firstLogin:null,
            isHo:false
        }
    }

    /**
     * 校验中文名
     * @param e
     */
    userNameSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err:any,values:any) => {
            if (!err) {
                checkUsername(values).then((res) => {
                    this.setState({
                        username: this.props.form.getFieldValue('username'),
                        phoneNumber: res.mobile,
                        showStepUser: false,
                        showStepSMS: true,
                        isHo: res.hoFlag,
                        firstLogin: res.firstLogin
                    })
                }, (e:any) => {
                    this.setState({
                        isErrorUserName: true
                    })
                })
            }
        });

    };
    /**
     * 发送短信验证码
     */
    smsSend = () => {
        const {isSendCode} = this.state;
        if(isSendCode){
            this.setState({
                isSendCode: false,
                verifyCode: "请重新获取"
            });
            this.startInterval();
            sendSecurityCode({username: this.state.username})
                .then((res:any)=>{
                    message.success('发送成功')
                }, () => {
                    this.clear();
                    this.setState({
                        verifyCode: "请重新获取",
                        isSendCode: true
                    })
                })
        }
        return;

    };
    // 校验短信验证码 手机号
    smsSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err:any,values:any) => {
            if (!err) {
                const postValue = {
                    securityCode:values.smsCode,
                    username:this.state.username
                };
                checkSecurityCode(postValue).then((res) => {
                    const {isHo , firstLogin, username} = this.state;
                    if(!isHo && firstLogin){
                        history.push(`${Routes.首次登录修改密码.link}${CommonUtils.stringify({
                            username:username,
                            sign: res,
                            isHo: isHo
                        })}`);
                    }else{
                        this.props.jumpResetPassword({
                            username:this.state.username,
                            sign: res
                        })
                    }
                }, () => {
                    this.setState({
                        isErrorSecurityCode: true
                    })
                })
            }else{

            }
        });
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
                this.setInterval(0);
                this.setState({
                    count: this.COUNT_DOWN,
                    verifyCode: "获取验证码",
                    isSendCode: true
                })
            }else{
                this.setInterval(this.state.count - 1);
            }
        }, INTERVALS);
    }
    setInterval(count:number){
        this.setState({count});
    }
    clear(){
        clearInterval(this.timer);
    }
    render(){
        /*借口返回数据绑定界面*/
        /*初始化数据*/
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {isSendCode, verifyCode, count, isErrorUserName, isErrorSecurityCode} = this.state;
        return(
            <div className={`gym-find-password-identify`}>
                {/*先验证Gymbo ID*/}
                {this.state.showStepUser && <div>
                    <Form className={`gym-find-password-identify-form`} onSubmit={this.userNameSubmit} ref={(ref:any) => this.form = ref}>
                        <FormItem label={'Gymbo ID'} className={`gym-find-password-identify-form-item first-item`}>
                            {getFieldDecorator('username')(
                                <Input placeholder="请输入您的Gymbo ID" autoComplete="off"/>,
                            )}
                        </FormItem>

                        <FormItem label={'中文姓名'} className={`gym-find-password-identify-form-item last-item`}>
                            {getFieldDecorator('chineseName')(
                                <Input placeholder="请输入您的中文姓名" autoComplete="off"/>,
                            )}

                        </FormItem>
                        {
                            isErrorUserName &&
                            <div className={`gym-find-password-identify-error-username`} >
                                <Icon className={`err-icon`} type="close-circle" theme="outlined" />
                                <div className={'err-text'}>
                                    <p>您的Gymbo ID，中文姓名不匹配</p>
                                    <p>如忘记，请邮件至service@gymboglobal.com</p>
                                </div>
                            </div>
                        }
                        <FormItem className={`gym-find-password-identify-form-item button-group`}>
                            <button
                                className={`${ (getFieldValue('username') && getFieldValue('chineseName')) ? 'gym-find-password-button' : 'gym-find-password-button-disabled' }`}
                                type="submit"
                                disabled={(getFieldValue('username') && getFieldValue('chineseName')) ? false : true}
                            >
                                确定
                            </button>
                            <Link to={Routes.登陆.path}>
                                <button   className="gym-find-password-button gym-find-password-button-cancel">
                                    关闭
                                </button>
                            </Link>
                        </FormItem>
                    </Form>
                </div>}
                {/*Todo获取短信验证码*/}
                {this.state.showStepSMS && <div>
                    <Form className={`gym-find-password-identify-form`} onSubmit={this.smsSubmit}>
                        <FormItem label={'手机号'} className={`gym-find-password-identify-form-item phone`}>
                            {getFieldDecorator('phoneNumber')(
                            <span>
                              {
                                  this.state.phoneNumber ===  ''
                                      ? '手机号获取失败！请联系HR修改'
                                      :this.state.phoneNumber
                              }
                              {/*<Button type="primary" onClick={this.changePhoneNumber}>更换手机号</Button>*/}
                            </span>
                            )}

                                <Popover
                                    placement="right"
                                    content={<div>
                                        <p>手机号为员工基本信息，暂时不支持修改</p>
                                        <p>建议您尽快联系HR确认个人信息</p>
                                    </div>}
                                >
                                    <span className={`gym-find-password-identify-desc`}>
                                        <MyIcon className={`desc-icon`} type="tishi" />
                                    </span>

                                </Popover>
                        </FormItem>
                        <FormItem label={'验证码'}  className='gym-find-password-identify-form-item send-code'>
                            {getFieldDecorator('smsCode')(
                                <Search
                                    type="smsCode"
                                    placeholder="请输入您收到的验证码"
                                    autoComplete="off"
                                    enterButton={ isSendCode ? verifyCode : `${count}秒后${verifyCode}`}
                                    onChange={(e:any) => {e.target.value || this.setState({isErrorSecurityCode: false})}}
                                    onSearch={this.smsSend}
                                />
                            )}
                            {
                                isErrorSecurityCode &&
                                <div className='gym-find-password-identify-error-code' >
                                    <Icon className={`err-icon`} type="close-circle" theme="outlined" />
                                    <div className={'err-text'}>
                                        <p>验证码错误，请您重试</p>
                                    </div>
                                </div>
                            }
                            <div className={`not-receive`}>
                                <Popover
                                    placement="bottom"
                                    content={<div>
                                        <p>无法收到验证码时，邮件至service@gymboglobal.com</p>
                                        <p>若Gymbo ID和手机号都正确，试试查看短信是否已被拦截</p>
                                    </div>}
                                >
                                    <span>收不到验证码</span>
                                </Popover>
                            </div>

                        </FormItem>

                        <FormItem className={`gym-find-password-identify-form-item button-group`}>
                            <button className="gym-find-password-button">
                                确定
                            </button>
                            <Link to={Routes.登陆.path}>
                                <button  className="gym-find-password-button gym-find-password-button-cancel">
                                    关闭
                                </button>
                            </Link>
                        </FormItem>
                    </Form>
                </div>}
            </div>
        )
    }
}

export {PasswordMobile}