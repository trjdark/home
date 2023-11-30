/**
 * desc: gymboID列表api
 * User: Vicky
 * Date: 2020/2/13
 * Time: 下午3:08
 */

const AdminApi = {
    // list页面
    登录:'/auth/codeCheck',
    获取类型和工号: '/account/getBaseInfo',
    // gymboID管理
    查询账号列表: `/account/getListAccount`, // 账号列表
    新建账号: `/account/createAccount`,
    生成gymboID: `/account/generateGymboId`,
    根据员工类型查询信息:`/account/getByEmpKind`,
    查看详情:`/account/getDetails`,
    编辑: `/account/updateEmployee`,
    分页查询:`/account/getListAccount`,
    校验证件号: `/account/idNoCheck`,
    校验手机号: `/account/mobileCheck`,
    校验Mate账号: `/account/mateUserNameCheck`,
    刷新邮箱license数据: `/account/updateEmailFlag`,
    校验邮箱: `/account/emailCheck`
};

export {AdminApi}
