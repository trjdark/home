/**
 * desc: 我的百宝箱
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/6
 * Time: 下午8:32
 */
import React from 'react';
import {connect} from "../../../component/decorator/connect";
import {fetchUserApps} from "../../../../redux-actions/homeActions";
import {Icon} from "../../../component/icon";
import {selectUserApps} from "../../../../saga/selectors/user";
import {getSyncCode,getOAtoken} from "../../../../redux-actions/userActions";
import {record} from "../../../../redux-actions/homeActions";
import {CommonUtils} from "../../../../common/utils/commonUtils";
import Scrollbars from 'react-custom-scrollbars';
import {User} from "../../../../common/beans/user";
import history from "../../../../router/history";
import {Routes} from "../../../../common/enum/routes";


@connect((state:any) => ({
    appList: selectUserApps(state)
}), {fetchUserApps})
class MyApp extends React.Component<any, any>{
    componentDidMount(){
        this.props.fetchUserApps({showAddress :1});
    }
    handleLinkOA = (app:any) => {
        const params = {
            token: User.token
        }
        getOAtoken(params).then((res:any) => {
            if(app.returnUrl.indexOf("?") !== -1){
                app.returnUrl = app.returnUrl.split("?")[0];
                CommonUtils.newWin(`${app.returnUrl}?ssoToken=${res.token}#/main`, 'OA')
            }else{
                CommonUtils.newWin(`${app.returnUrl}?ssoToken=${res.token}#/main`, 'OA')
            }
            // ? CommonUtils.newWin(`${app.returnUrl}&ssoToken=${res.token}`, 'OA')
            // : CommonUtils.newWin(`${app.returnUrl}?ssoToken=${res.token}`, 'OA')
        })
    };
    handleLink = (app:any) => {
        // todo 埋点
        record({
            type: app.displayName,
            source:"百宝箱",
            personCount:1,
            operateCount:1
        });
        getSyncCode((res:any) => {
            if(process.env.NODE_ENV === 'develop'){
                CommonUtils.newWin(`http://localhost:5003/login/middleware?code=${res.code}&homeUserName=${res.homeUserName}`, 'bpm');
                // CommonUtils.newWin(`http://localhost:5008?code=${res.code}`, 'bpm');
            }else{

                app.returnUrl.indexOf('?') !== -1
                    ? CommonUtils.newWin(`${app.returnUrl}&code=${res.code}&homeUserName=${res.homeUserName}`, 'bpm')
                    : CommonUtils.newWin(`${app.returnUrl}?code=${res.code}&homeUserName=${res.homeUserName}`, 'bpm')
            }
        });
    }
    handleChoiceLink = (item:any) => {
        if (item.displayName === 'OA' || item.displayName ==='New BDS') {
            this.handleLinkOA(item)
        }else if(item.displayName === '账号管理'){
            history.push(Routes.中心账号.path)
        }else{
            this.handleLink(item)
        }
    }

    render(){
        const {appList} = this.props;
        return(
            <div className={`gym-home-app`}>
                <div className={`gym-home-wrap-title`}>
                    <Icon className={`gym-home-wrap-title-icon`} type="baibaoxiang"/>
                    <span className={`gym-home-wrap-title-text`}>我的百宝箱</span>
                </div>
                <Scrollbars
                    className={'gym-home-app-content'}
                    autoHide={true}
                    universal={true}
                    autoHeight={true}
                    autoHeightMin={729}
                    autoHeightMax={729}
                >
                    {
                        appList.length > 0
                            ? appList.map((item:any, index:number) => (
                                <div key={`home-app-${index}`} className={`gym-home-app-content-item`}>
                                    <div className={`gym-home-app-content-item-icon`} onClick={() => this.handleChoiceLink(item)} >
                                        {/*Todo logo*/}
                                        <img src={item.logoUrl} alt={item.displayName}/>
                                    </div>

                                    <div className={`gym-home-app-content-item-title`} style={{color: item.fontColor}}>
                                        {item.name}
                                    </div>
                                    <div className={`gym-home-app-content-item-info`}>
                                        <div className={`gym-home-app-content-item-info-desc`}>
                                            {item.description}
                                        </div>
                                        <div className={`gym-home-app-content-item-info-admin`}>
                                            系统管理员：{item.adminName}
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <div className={'gym-home-app-content-empty'}>
                                <div>
                                    <p>您的百宝箱暂无权限，如需新增，可邮件至</p>
                                    <p>service@gymboglobal.com</p>
                                </div>
                            </div>

                    }
                </Scrollbars>
            </div>
        )
    }
}

export {MyApp};
