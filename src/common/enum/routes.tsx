/**
 * desc: 路由配置
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/7/31
 * Time: 下午3:00
 */
import {Login} from '../../ui/pages/login';
import {Home} from "../../ui/pages/home";
import {Password} from "../../ui/pages/login/password";
import {FirstPassword} from "../../ui/pages/login/passwordFirstLogin";
import {UserCenter} from "../../ui/pages/userCenter";
import {Download} from "../../ui/pages/download";
import {Aware} from "../../ui/pages/aware";
import {OADownload} from "../../ui/pages/oaDownload";
import {CenterAccount} from "../../ui/pages/centerAccount";
import {ApplyCenterAccount} from "../../ui/pages/centerAccount/page/apply";
import {ExamineDetail} from "../../ui/pages/centerAccount/page/detail";
import {ManagementCenterAccount} from "../../ui/pages/centerAccount/page/management";
import {NewExamineBuild} from "../../ui/pages/centerAccount/page/newBuild";
import {EmailDetail} from "../../ui/pages/centerAccount/page/emailDetail";
import {UpdateDetail} from "../../ui/pages/centerAccount/page/updateDetail";
import {NoticeList} from "../../ui/pages/centerAccount/notice";
import {NoticeDetail} from "../../ui/pages/centerAccount/notice/detail";
import {News} from "../../ui/pages/news";

/**
 * oa系统权限管理
 */
const requirePermission = () => {
    return true
};

class Routes {
    static 登陆 = {
        path: '/login',
        component: Login,
    };
    static 找回密码 = {
        path: '/login/password_find',
        component: Password
    };
    static 首次登录修改密码 = {
        path: '/login/first_password_find/:params',
        component: FirstPassword,
        link:'/login/first_password_find/'
    };
    static 首页 = {
        path: '/',
        component: Home,
        authority: requirePermission(),
        redirectPath: Routes.登陆.path
    };
    static 个人中心 = {
        path: '/userCenter',
        component: UserCenter,
        authority: requirePermission(),
    };
    static 中心账号 = {
        path: '/centerAccount',
        component: CenterAccount,
        authority: requirePermission(),
    };
    static 账号申请 = {
        path: '/centerAccount/apply',
        component: ApplyCenterAccount,
        authority: requirePermission(),
    };
    static 账号申请查看 = {
        path: '/centerAccount/apply/examine/:params',
        link: '/centerAccount/apply/examine',
        component: ExamineDetail,
        authority: requirePermission(),
    };
    static 账号申请重新申请 = {
        path: '/centerAccount/apply/update/:params',
        link: '/centerAccount/apply/update',
        component: UpdateDetail,
        authority: requirePermission(),
    };
    static 账号申请新建 = {
        path: '/centerAccount/apply/new',
        component: NewExamineBuild,
        authority: requirePermission(),
    };
    static 账号管理 = {
        path: '/centerAccount/management',
        component: ManagementCenterAccount,
        authority: requirePermission(),
    };
    static 账号管理详情 = {
        path: '/centerAccount/management/examine/:params',
        link: '/centerAccount/management/examine',
        component: EmailDetail,
        authority: requirePermission(),
    };


    static 消息 = {
        path: '/news',
        component: News,
    };
    static 账号消息列表 = {
        path: '/news/notice',
        component: NoticeList,
    };
    static 账号消息详情 = {
        path: '/news/notice/detail/:params',
        link: '/news/notice/detail',
        component: NoticeDetail,
    };


    static 下载app = {
        path: '/login/download',
        component: Download,
    };
    static 态势感知 = {
        path: '/aware',
        component: Aware
    };
    static OA下载 = {
        path: '/login/oa',
        component: OADownload
    };
}

export {Routes}
