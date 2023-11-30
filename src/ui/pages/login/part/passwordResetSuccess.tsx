/**
 * desc:
 * User: colin.lu
 * Date: 2018/8/21
 * Time: 下午午15:08
 */
import React from 'react';
import {Link} from "react-router-dom";
import {form} from "../../../component/decorator/form";
import {Routes} from '../../../../common/enum/routes';
import {Icon} from "antd";
// import {Link} from "react-router-dom";
import history from "../../../../router/history";

@form()
class PasswordResetSuccess extends React.Component<any,any>{
    isSuccess = this.props.isSuccess || false;
    timer:any
    constructor(props:any) {
        super(props);
        this.state={
            count:3,
            _timer:0
        };
    }

    componentDidMount() {
        this.isSuccess && this.countTime()
    }

    countTime() {
        this.timer = setInterval(() => {
            this.setState({count: this.state.count - 1});
            if(this.state.count < 0){
                history.push(Routes.登陆.path);
                this.clearTimer()
            }
        }, 1000);
    }
    clearTimer = () => {
        clearInterval(this.timer)
    }
    componentWillUnmount(){
        this.clearTimer();
    }

    render() {
        const {errMsg, errCode} = this.props;
        return(
            <div className={`gym-password-result`}>
                {
                    this.isSuccess
                    ? [
                        <div className={`gym-password-result-info`} key={`info`}>
                            <span className={`gym-password-result-info-icon success`}>
                                <Icon type="check" theme="outlined"  />
                            </span>
                            <span className={`gym-password-result-info-text`}>恭喜您! 密码找回成功</span>
                        </div>,
                        <div className={`gym-password-result-count`} key={`count`}>
                            <span className={`gym-password-result-count-time`}>
                                {this.state.count}s
                            </span>
                            <span>后</span>
                            <Link to={Routes.登陆.path} className={`gym-password-result-count-link`}>回到登录</Link>
                        </div>
                        ]
                    :[
                        <div className={`gym-password-result-info`} key={`info`}>
                            <span className={`gym-password-result-info-icon error`}>
                                <Icon type="close" theme="outlined"  />
                            </span>
                            <span className={`gym-password-result-info-text`}>重置失败</span>
                        </div>,
                        <div className='gym-password-result-error' key={`err`}>
                            <p>{errMsg}</p>
                            {errCode !== 20004 && <p>请提供报错提示并联系service@gymboglobal.com</p>}
                        </div>,
                        <div className={`gym-password-result-count`} key={`count`}>
                            <span onClick={() => this.props.next(errCode === 20004 ? 1 : 0)} className={`gym-password-result-count-link`}>
                                {errCode === 20004 ? '返回上一界面' : '重新设置密码'}
                            </span>
                        </div>
                    ]

                }


            </div>
        )
    }
}

export {PasswordResetSuccess}