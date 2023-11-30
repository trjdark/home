/**
 * desc: 忘记密码-重置密码
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/10
 * Time: 下午3:06
 */
import React from 'react';
import {Link} from "react-router-dom";
import {form} from "../../../component/decorator/form";
import {Routes} from '../../../../common/enum/routes';
import {Form, Input, Icon, Alert} from "antd";
import {resetPassword} from "../../../../redux-actions/userActions";
const FormItem = Form.Item;

@form()
class PasswordReset extends React.Component<any, any>{
    username = this.props.username;
    sign = this.props.sign;
    constructor(props:any){
        super(props);
        this.state = {
            password:'', //  密码表单值
            conformPassword:'', // 确认密码true
            showValidateBox: false, // 确认密码
            showDangerBar: true, //  密码校验正确
            showSuccessBar: false, // 密码校验错误
            pwdRuleOne: false,   // 密码第一条规则
            pwdRuleTwo: false,   // 密码第二条规则
            pwdRuleThree: false,  // 密码第三条规则
            pwdRuleFour: false,   // 密码第四条规则
            isEqualPwd: false     // 重复密码是否和新密码相同
        };
    }
    /**
     * 重置密码
     * @param username<string>
     * @method post
     * @response 校验有无用户名  res<bool>
     */
    pwdSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err:any,values:any) => {
            if (!err) {
                const {isFirstUnHo, homeCity, educationHistory, graduateSchool, workExperience} = this.props;

                if(isFirstUnHo && (!homeCity || !educationHistory || !workExperience)){
                    this.props.emitShowError();
                    return;
                }
                const postValue = {
                    password:values.password,
                    username: this.username,
                    sign: this.sign,
                    homeCity, educationHistory, graduateSchool, workExperience
                };
                resetPassword(postValue).then((res) => {
                    this.props.jumpToResult(true)
                }, (e) => {
                    this.props.jumpToResult(false, e.data)
                })
            }else{

            }
        });
    };
    /**
     * 校验密码是否合规
     * @param {string} changedFields
     */
    checkPWD = (value:string) => {
        const {getFieldValue} = this.props.form;
        const username = this.username;
        let n = 0;
        // 6-20
        if(value.length > 7 && value.length < 21){
            this.setState({pwdRuleOne:true})
        }else{
            this.setState({pwdRuleOne:false})
        }
        // 只能大小写，数字，标点符号
        if(/^[A-Za-z0-9@#￥%\^&\*\-_!\+=\[\]{}\|\:',\.\?/`~"();]+$/.test(value)){
            this.setState({pwdRuleTwo:true})
        }else{
            this.setState({pwdRuleTwo:false})
        }
        // 大写字母、小写字母、数字和标点符号至少包含3种
        if(/[A-Z]/.test(value)){
            n++;
        }
        if(/[a-z]/.test(value)){
            n++;
        }
        if(/[0-9]/.test(value)){
            n++;
        }
        if(/[,.;~!@#$%^*()\[\]_+\-=/]/.test(value)){
            n++;
        }
        n > 2 ?this.setState({pwdRuleThree:true}) :this.setState({pwdRuleThree:false});
        // 不能包含您用户名中，任意两个连续字符
        if(value){
            for(let i = 0, l = value.length - 1; i < l; i++){
                let str = value.substring(i,i+2);
                if(username.indexOf(str) > -1){
                    this.setState({pwdRuleFour:false});
                    break;
                }else{
                    this.setState({pwdRuleFour:true})
                }
            }
        }else{
            this.setState({pwdRuleFour:false})
        }
        // 校验确认密码
        if(value !== getFieldValue('confirmPassword')){
            this.setState({isEqualPwd: false})
        }else{
            this.setState({isEqualPwd: true})
        }
    };
    /**
     * 启动密码提示信息
     */
    showBox = () => {
        this.setState({
            showValidateBox:true
        });
    };
    /**
     * 隐藏密码提示信息
     */
    hideBox = () => {
        this.setState({
            showValidateBox:false
        });
    };
    verifyPwdIsEqual = (value:any) => {
        const password = this.props.form.getFieldValue('password');
        this.setState({isEqualPwd: password === value.target.value})
    };
    render(){
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const {
            showValidateBox, pwdRuleOne, pwdRuleTwo, pwdRuleThree, pwdRuleFour,
            isEqualPwd,
        } = this.state;
        return(
            <Form onSubmit={this.pwdSubmit} className={`gym-find-password-identify-form`}>
                <FormItem label={'新的Gymbo ID密码'} className={`gym-find-password-identify-form-item`}>
                    {
                        showValidateBox &&
                        <div className={'gym-password-validate-box'}>
                            <div className={``}>
                                <span>安全密码：</span>
                                {
                                    (pwdRuleOne && pwdRuleTwo && pwdRuleThree && pwdRuleFour)
                                        ?
                                        <div className={`gym-password-validate-box-div`}>
                                            <span className={'gym-password-validate-box-primary-bar'}/>
                                            <span className={'gym-password-validate-box-success-bar'}/>
                                        </div>
                                        :
                                        <div className={`gym-password-validate-box-div`}>
                                            <span className={'gym-password-validate-box-danger-bar'}/>
                                            <span className={'gym-password-validate-box-primary-bar'}/>
                                        </div>
                                }
                            </div>
                            <div className={`gym-password-validate-box-desc`}>
                                {
                                    pwdRuleOne
                                        ? <Icon style={{color:'green'}} type="check" theme="outlined" />
                                        : <Icon style={{color:'red'}} type="close" theme="outlined" />
                                }
                                <span>8-20位字符</span>
                            </div>
                            <div className={`gym-password-validate-box-desc`}>
                                {
                                    pwdRuleTwo
                                        ? <Icon style={{color:'green'}} type="check" theme="outlined" />
                                        : <Icon style={{color:'red'}} type="close" theme="outlined" />
                                }
                                <span>只能包含大小写字母、数字以及标点符号</span>
                            </div>
                            <div className={`gym-password-validate-box-desc`}>
                                {
                                    pwdRuleThree
                                        ? <Icon style={{color:'green'}} type="check" theme="outlined" />
                                        : <Icon style={{color:'red'}} type="close" theme="outlined" />
                                }
                                <span>大写字母、小写字母、数字和标点符号至少包含3种</span>
                            </div>
                            <div className={`gym-password-validate-box-desc`}>
                                {
                                    pwdRuleFour
                                        ? <Icon style={{color:'green'}} type="check" theme="outlined" />
                                        : <Icon style={{color:'red'}} type="close" theme="outlined" />
                                }
                                <span>不能包含您用户名中，任意两个连续字符</span>
                            </div>
                        </div>
                    }
                    {getFieldDecorator('password')(
                        <Input
                            type="password"
                            placeholder="新的Gymbo ID密码"
                            className={'gym-password-form'}
                            onFocus={this.showBox}
                            onBlur={this.hideBox}
                            autoComplete="off"
                            onChange={(changedFields) => this.checkPWD(changedFields.target.value)}
                        />


                    )}
                    {
                        getFieldValue('password')
                            ?
                            (pwdRuleOne && pwdRuleTwo && pwdRuleThree && pwdRuleFour)
                                ?
                                    <div className={`gym-find-password-identify-error-code`} >
                                        <Icon className={`success-icon`} type="check-circle" theme="outlined" />
                                    </div>
                                :
                                    <div className={`gym-find-password-identify-error-code`} >
                                        <Icon className={`err-icon`} type="close-circle" theme="outlined" />
                                    </div>
                            :null

                    }

                </FormItem>
                <FormItem label={'确认新的Gymbo ID密码'} className={`gym-find-password-identify-form-item`}>
                    {getFieldDecorator('confirmPassword')(
                        <Input
                            type="password"
                            className={'gym-password-form'}
                            placeholder="确认新的Gymbo ID密码"
                            autoComplete="off"
                            onChange={this.verifyPwdIsEqual}
                        />
                    )}
                    {
                        //
                        getFieldValue('confirmPassword')
                            ?(isEqualPwd)
                                ?
                                    <div className={`gym-find-password-identify-error-code`} >
                                        <Icon className={`success-icon`} type="check-circle" theme="outlined" />
                                    </div>
                                :
                                    <div className={`gym-find-password-identify-error-code`} >
                                        <Icon className={`err-icon`} type="close-circle" theme="outlined" />
                                    </div>
                            : null

                    }
                </FormItem>
                <Alert message="请注意：新密码不能与前两次密码重复！" type="warning" className='mb25'/>
                <FormItem className={`gym-find-password-identify-form-item button-group`}>
                    <button
                        className={
                            `gym-find-password-button ${!(isEqualPwd && pwdRuleOne && pwdRuleTwo && pwdRuleThree && pwdRuleFour)
                                ? 'gym-find-password-button-disabled'
                                : ''
                            }`}
                        type="submit"
                        disabled={!(isEqualPwd && pwdRuleOne && pwdRuleTwo && pwdRuleThree && pwdRuleFour)}
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
        )
    }
}

export {PasswordReset}