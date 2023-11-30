/**
 * desc: 中心邮箱审批接口地址
 * User: Katarina.Yuan
 * Date: 2022/1/25
 * Time: 11:20
 */
enum centerEmail{
    获取关联中心下所有账号 = '/centerAccManage/listAccount',
    邮箱开通申请 = '/centerAccManage/emilOpenApply/',
    邮箱关闭申请 = '/centerAccManage/emilCloseApply/',
    将员工调整为离职 = '/centerAccManage/makeLeave',
    手机号码修改 = '/centerAccManage/modifyMobile',
    获取某个账号的详情 = '/centerAccManage/account/',
    获取岗位列表 = '/centerAccManage/listCurrentPositionType'
}

export {centerEmail}
