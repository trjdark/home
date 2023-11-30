/**
 * desc: 第一次登录重置密码
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/11
 * Time: 下午6:35
 */
import React from 'react';
import {CommonUtils} from "../../../common/utils/commonUtils";
import { Scrollbars } from 'react-custom-scrollbars';
import {PasswordReset} from "./part/passwordReset";
import {message, Select, Input} from "antd";
import history from '../../../router/history';
import {Routes} from "../../../common/enum/routes";
import {getCityAndEduinfo} from "../../../redux-actions/userActions";

const {Option} = Select;

class FirstPassword extends React.Component<any, any>{
    username:string;
    sign: string;
    isHo: boolean;
    constructor(props:any){
        super(props)
        if(CommonUtils.hasParams(props)){
            this.username = CommonUtils.parse(props).username
            this.sign = CommonUtils.parse(props).sign;
            this.isHo = CommonUtils.parse(props).isHo
        }
        this.state = {
            scrollH:window.innerHeight - 60,
            cityTypeList: [],
            eduTypeList: [],
            showError: false,
            homeCity:null,
            educationHistory:null,
            graduateSchool:null,
            workExperience:null,
        }
    }
    componentDidMount(){
        getCityAndEduinfo().then(res => {
            const {cityTypeList, eduTypeList} = res;
            this.setState({
                cityTypeList: cityTypeList,
                eduTypeList: eduTypeList,
            })
        })
    }
    onReize = () => {
        this.setState({
            scrollH:window.innerHeight - 60
        })
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.onReize)
    }
    jumpResult = (result:boolean) => {
        if(result){
            message.success("重置成功！请用新密码重新登录", 2, () => {history.push(Routes.登陆.path)});
        }else{
            message.error("重置失败！请重新设置新密码")
        }
    };
    handleChange = (value:string | number, key:string) => {
        switch (key) {
            case 'homeCity' :
                this.setState({homeCity: value});
                break;
            case 'educationHistory' :
                this.setState({educationHistory: value});
                break;
            case 'graduateSchool' :
                this.setState({graduateSchool: value,});
                break;
            case 'workExperience' :
                this.setState({workExperience: value,});
                break;
            default:break;
        }

    };
    showError = () => {
        this.setState({showError: true})
    }
    render(){
        const {
            scrollH, cityTypeList, eduTypeList,
            homeCity, educationHistory, graduateSchool, workExperience,
            showError,
        } = this.state;
        return(
            <div id={`gym-first-login`} className={`gym-find-password`}>
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
                    autoHeightMin={scrollH}
                    autoHide={true}
                >
                    <div className="gym-wrapper gym-first-login-password-content">
                        <div>
                            <p className='gym-first-login-password-h1'>欢迎您加入金宝贝大家庭！</p>
                            {
                                !this.isHo &&
                                    <div>
                                        <p className='gym-first-login-password-h2'>请仔细阅读提示，并补充一下履历信息：</p>
                                        <div className='gym-first-login-password-form'>
                                            <div className='gym-first-login-password-form-item'>
                                                <span className='fontW gym-first-login-password-form-item-label'>原籍城市：</span>
                                                <Select
                                                    className='gym-select-input'
                                                    placeholder='原籍城市（必填）'
                                                    showSearch
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    onChange={(e) => this.handleChange(e, 'homeCity')}
                                                >
                                                    {cityTypeList.map((item, index) => <Option key={`city_${index}_${item.mdmId}`} value={item.mdmId}>{item.mdmName}</Option>)}
                                                </Select>
                                                {
                                                    (showError && !homeCity) && <span className='cR ml15'>请填写完整！</span>
                                                }
                                            </div>
                                            <div className='gym-first-login-password-form-item'>
                                                <span className='fontW gym-first-login-password-form-item-label'>学历：</span>
                                                <Select
                                                    className='gym-select-input'
                                                    showSearch
                                                    placeholder='学历（必填）'
                                                    filterOption={(input, option) =>
                                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    onChange={(e) => this.handleChange(e, 'educationHistory')}
                                                >
                                                    {eduTypeList.map((item, index) => <Option key={`edu${index}_${item.mdmId}`} value={item.mdmId}>{item.mdmName}</Option>)}
                                                </Select>
                                                {
                                                    (showError && !educationHistory) && <span className='cR ml15'>请填写完整！</span>
                                                }
                                            </div>
                                            <div className='gym-first-login-password-form-item'>
                                                <span className='fontW gym-first-login-password-form-item-label' >学校：</span>
                                                <Input
                                                    className='gym-input'
                                                    placeholder='学校（非必填）'
                                                    maxLength={40}
                                                    onChange={(e) => this.handleChange(e.target.value, 'graduateSchool')}
                                                />
                                            </div>
                                            <div className='gym-first-login-password-form-item'>
                                                <span className='fontW gym-first-login-password-form-item-label' >曾从事过的职业	：</span>
                                                <Input
                                                    className='gym-input'
                                                    placeholder='曾从事过的职业（必填）'
                                                    maxLength={40}
                                                    onChange={(e) => this.handleChange(e.target.value, 'workExperience')}
                                                />
                                                {
                                                    (showError && !workExperience) && <span className='cR ml15'>请填写完整！</span>
                                                }
                                            </div>
                                        </div>
                                        <span className='fontW' >信息提示：</span><span>我们将获取您的个人信息，用于系统权限配置，在职/离职员工关怀及其他与人力资源管理相关的目的；我们将采取一切可行措施确保个人信息的安全，
                                        避免他人未经授权或意外获得或以其它方式使用本人的个人资料，法定情形除外。您“毕业”时，我们将与金宝贝品牌方共享您的个人履历信息，以提供全国金宝贝职位讯息的优先推送服务；如不需要此服务，您可前往个人中心进行个人信息取消授权或直接联系 CN.Talent@gymboglobal.com。</span>
                                    </div>
                            }
                            <p className='gym-first-login-password-h2 fontW'>系统查询到您是首次登录HOME，为了您的使用安全，</p>
                            <p className='gym-first-login-password-h3'>请重置密码<span className='gym-first-login-password-high-light'>（将同步您的开机及邮箱密码）。</span></p>
                        </div>
                        <PasswordReset
                            jumpToResult={this.jumpResult}
                            username={this.username}
                            sign={this.sign}
                            isFirstUnHo={!this.isHo}
                            emitShowError={this.showError}
                            homeCity={homeCity}
                            educationHistory={educationHistory}
                            graduateSchool={graduateSchool}
                            workExperience={workExperience}
                        />
                    </div>
                </Scrollbars>
            </div>
        )
    }
}

export {FirstPassword}