/**
 * desc: 接口地址
 * User: Renjian.Tang/trj8772@aliyun.com
 * Date: 2018/8/1
 * Time: 下午6:48
 */
enum centerID{
    账号申请列表 = '/centerAccApply/queryCenterAccRecordList',
    账号申请记录查看 = '/centerAccApply/getRecordDetail',
    账号申请重新申请 = '/centerAccApply/updateCenterAccRecord',
    账号申请撤销 = '/centerAccApply/recallCenterAccRecord',
    账号申请插入 = '/centerAccApply/applyCenterAccount',
    校验证件号 = '/account/idNoCheck',
    校验手机号 = '/account/mobileCheck',
}

export {centerID}
