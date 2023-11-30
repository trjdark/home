/**
 * desc: 业务层Action，涉及到流程管控
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/1
 * Time: 下午2:08
 */

enum ServiceActionEnum {
    登录 = 'LOGIN',
    注销 = 'LOGOUT',
    检查用户名 = 'CHECKUSERNAME',
    获取用户应用列表 = "USER_APP",
    获取版本故事列表 = 'GET_VERSION_LIST',
    获取当月会议日期 = 'CALENDAR_TAGS',
    获取当日会议列表 = 'CALENDAR_MEETING_LIST',
    获取个人资料 = 'GET_USER_INFO',
    获取个人权限 = 'FETCH_USER_PERMISSION_LIST',
    基本信息 = 'BASIC_INFO',

    // admin账号
    获取员工类型相关信息 = 'GET_INFO_LIST',
    查询身份类型员工类型 = 'GET_STAFF_INFO',
    // 数据管理
    // 区域管理
    获取pop员工 = 'GET_POP_LIST',
    获取中心 = 'GET_CENTER_LIST',
    // pop管理
    可选pop员工 = 'GET_SET_POP_LIST',

    获取有效消息 = 'GET_NEWS',
}

export {ServiceActionEnum};
