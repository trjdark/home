/**
 * desc: 路由控制
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/30
 * Time: 下午5:40
 */
import React from 'react';
import {
    Router, Route,Switch,
} from 'react-router-dom/index';
import {Layout} from "../ui/containers/layout/layout";
import {Routes} from "../common/enum/routes";
import {Err404} from "../ui/pages/404";
import "../style/index";
import history from "./history";
import {AuthorizedRoute} from './authorizedRoute';
import {NewsLayout} from "../ui/containers/layout/newsLayout";

/**
 * 登陆，注册路由
 */
class LoginRouter extends React.Component{
    render(){
        return(
            <Router history={history}>
                <Switch>
                    <AuthorizedRoute exact={true} {...Routes.登陆}/>
                    <AuthorizedRoute exact={true} {...Routes.找回密码}/>
                    <AuthorizedRoute exact={true} {...Routes.首次登录修改密码}/>
                    <AuthorizedRoute exact={true} {...Routes.下载app} />
                    <AuthorizedRoute exact={true} {...Routes.OA下载} />
                    <Route path="*" component={Err404}/>
                </Switch>
            </Router>
        )
    }
}

/**
 * 消息
 */
class NewsRouter extends React.Component{
    render(){
        return(
            <Router history={history}>
                <NewsLayout centerAccount={true}>
                    <Switch>
                        <AuthorizedRoute exact={true} {...Routes.消息}/>
                        <AuthorizedRoute exact={true} {...Routes.账号消息列表}/>
                        <AuthorizedRoute exact={true} {...Routes.账号消息详情}/>
                    </Switch>
                </NewsLayout>
            </Router>
        )
    }
}

/**
 * 主页路由
 */
class HomeRouter extends React.Component{
    render(){
        return(
            <Router history={history}>
                <Layout>
                    <Switch>
                        <AuthorizedRoute exact={true} {...Routes.首页}/>
                        <AuthorizedRoute exact={true} {...Routes.个人中心}/>
                        <AuthorizedRoute exact={true} {...Routes.态势感知}/>
                        <AuthorizedRoute exact={true} {...Routes.中心账号}/>
                        <AuthorizedRoute exact={true} {...Routes.账号管理}/>
                        <AuthorizedRoute exact={true} {...Routes.账号申请}/>

                        {/*<Route exact={true} path={Routes.添加角色.path} component={AddRole}/>*/}
                        <Route path="*" component={Err404}/>
                    </Switch>
                </Layout>
            </Router>
        )
    }
}

/**
 * 中心账号路由
 */
class CenterAccountRouter extends React.Component{
    render(){
        return(
            <Router history={history}>
                <Layout centerAccount={true}>
                    <Switch>
                        <AuthorizedRoute exact={true} {...Routes.中心账号}/>
                        <AuthorizedRoute exact={true} {...Routes.账号管理}/>
                        <AuthorizedRoute exact={true} {...Routes.账号申请}/>
                        <AuthorizedRoute exact={true} {...Routes.账号申请查看}/>
                        <AuthorizedRoute exact={true} {...Routes.账号申请新建}/>
                        <AuthorizedRoute exact={true} {...Routes.账号管理详情}/>
                        <AuthorizedRoute exact={true} {...Routes.账号申请重新申请}/>
                    </Switch>
                </Layout>
            </Router>
        )
    }
}


/**
 * 主路由
 */
class Routers extends React.Component<any, any>{
    render(){
        return(
            <Router history={history}>
                <Switch>
                    <Route path={Routes.登陆.path} component={LoginRouter}/>
                    <Route path={Routes.消息.path} component={NewsRouter}/>
                    <Route path={Routes.中心账号.path} component={CenterAccountRouter}/>
                    <Route path={Routes.首页.path} component={HomeRouter}/>
                    <Route path="*" component={Err404}/>
                </Switch>
            </Router>
        )
    }
}

export {Routers}
