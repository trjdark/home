/**
 * desc: 接口地址
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/1
 * Time: 下午6:48
 */

enum Actions{
    登录 = '/auth/login',
    注销 = '/auth/logout',
    检查用户名 = '/user/check/username',
    发送验证码 = '/user/send/securityCode',
    校验验证码 = '/user/check/securityCode',
    密码规则验证 = '/user/first/password/verify',
    重置密码 = '/user/reset/password',
    获取用户信息 = '/user/personalCenter/employee',
    获取用户应用列表 = '/index/app/list',
    获取code令牌 = '/auth/code',
    获取版本故事 = '/index/version/list',
    // 获取当月会议日期 = '/user/calendarTags',
    获取当日会议列表 = '/user/calendarList',
    获取用户权限 = '/user/menu',
    验证是否登录 = '/auth/me',
    获取二维码获取接口 = '/auth/getLoginCode',
    二维码状态异步通知 = '/home/auth/webLoginFromQCode/',
    // 我的消息 = '/bpm/list',
    埋点 = '/operation/record',
    获取oa系统token = '/auth/oa/token',
    我的消息列表 ='/notice/getMyNoticeList',
    获取需要弹屏消息 = '/notice/getPopUpNoticeList',
    已读消息 = '/notice/markAsReadNotice',

    获取城市学历枚举 = '/talentPool/getCityAndEduInfo',
    修改个人信息 = '/talentPool/updatePersonInfo'
}

export {Actions}