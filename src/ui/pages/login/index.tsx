/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/30
 * Time: 下午6:15
 */
import React from 'react';
import {Link} from "react-router-dom";
import {Icon} from "../../component/icon";
import {LoginForm} from "./part/loginForm";
import history from "../../../router/history";
import {me} from "../../../redux-actions/userActions";
import {Routes} from "../../../common/enum/routes";

class Login extends React.Component<any, any>{
    state = {
        scrollH: window.innerHeight
    };
    componentDidMount(){
        me().then((res:any) => {
            if(res){
                history.push(Routes.首页.path)
            }
        })
        window.addEventListener('resize',this.onResize);
    };
    componentWillUnmount(){
        window.removeEventListener('resize',this.onResize);
    };
    onResize = () => {
        this.setState({scrollH: window.innerHeight})
    };

    render(){
        const {scrollH} = this.state;
        return(
            <div id={'gym-login'} className={'gym-clearfix gym-login-backgroundImage'}>
                <div className="gym-login-wraper" style={{height:scrollH}} >
                    <div>
                        <LoginForm />
                    </div>
                    <div className={`gym-watermark-div`}>
                        <img className={`gym-watermark-div-img`} src={require(`../../../images/login/watermark.png`)} alt=""/>
                    </div>
                </div>

            </div>
        )
    }
}

export {Login};
