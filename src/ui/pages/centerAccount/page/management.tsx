/**
 * desc: 中心账号管理
 * User: Katarina
 * Date: 2022/1/19
 * Time: 下午3:20
 */
import React from 'react';
import {Popover} from "antd";
import {Table} from "antd";
import {form} from "../../../../common/decorator/form";
import {SearchForm} from "../../../component/searchForm";
import {Pagination} from "../../../component/pagination";
import {PageTitle} from "../../../component/pageTitle";
import "../style"
import {connect} from "../../../../common/decorator/connect";
import {selectStaffInfo} from "../../../../saga/selectors/adminSelectors";
import {getStaffInfo} from "../../../../redux-actions/adminOperation";
import {
    emilCloseApply,
    emilOpenApply,
    listAccount, listCurrentPositionType,
} from "../../../../redux-actions/centerEmailActions";
import {NewMobileContent} from "../part/newMobile";
import {MakeLeave} from "../part/makeLeave";
import {PopoverContent} from "../part/popoverContent"
import history from "../../../../router/history";
import {Routes} from "../../../../common/enum/routes";
import {CommonUtils} from "../../../../common/utils/commonUtils";

@form()
@connect((state:any) => ({
             staffInfo: selectStaffInfo(state)
         }),
         {getStaffInfo})

class ManagementCenterAccount extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state= {
            pageNo: 1,
            pageSize:10,
            data: {},
            totalSize: '',
            employeeId: '', // 详情id
            listCurrentPositionType: [], // 岗位列表
            newMobileVisible: false, // 修改手机号显示框
            makeLeaveVisible: false  // 修改离职日期显示框
        };
    }
    searchItem = ():any => {
        const {staffInfo} = this.props
        const statusOptions = [
            {mdmId: 1, mdmName: '在职'},
            {mdmId: 0, mdmName: '离职'},
            {mdmId: '', mdmName: '全部'},
        ];
        return [
            {
                type: 'text',
                label: '关键字',
                name: 'keyword',
                placeholder: '请输入中英文名/Gymbo ID'
            },{
                type: 'text',
                label: '中心号',
                name: 'unitCode',
                placeholder: '请输入'
            },{
                type: 'select',
                label: '员工类型',
                name: 'employeeKind',
                options: staffInfo.employeeTypeList,
            },{
                type: 'text',
                label: '证件号码',
                name: 'idNo',
                placeholder:'请输入'
            },{
                type: 'select',
                label: '员工状态',
                name: 'isResign',
                options: statusOptions,
                initialValue: ''
            },{
                type: 'text',
                label: '邮箱',
                name: 'email',
                placeholder:'请输入'
            }
        ];
    }
    columns:any = [
        {
            title: 'Gymbo ID',
            dataIndex: 'fullUsName',
            key: 'fullUsName',
            width: 120,
            render:(text:string, record:any, index:number) => {
                return(
                    <span className={`detail-btn`} onClick={()=>this.handleDetail(record.employeeId)}>{text}</span>
                )
            }
        },{
            title: '姓名',
            dataIndex: 'chineseName',
            key: 'chineseName',
            width: 100,
        },{
            title: '英文名',
            dataIndex: 'englishName',
            key: 'englishName',
            width: 100,
        },{
            title: '所属组织',
            dataIndex: 'unitName',
            key: 'unitName',
            width: 150,
            render:(text:string, record:any, index:number) => {
                return(
                    <div>
                        <Popover content={text}>
                            {text && text.length > 13 ? `${text.substr(0,13)}...`:text}
                        </Popover>
                    </div>
                )
            }
        },{
            title: '岗位',
            dataIndex: 'positionType',
            key: 'positionType',
            width: 90,
            render:(text:string, record:any, index:number) => {
                return(
                    <span>{this.formatListCurrentPositionType(text)}</span>
                )
            }
        },{
            title: '邮箱账号',
            dataIndex: 'email',
            key: 'email',
            width: 150,
            render:(text:string, record:any, index:number) => {
                return(
                    <span>{text?text:'无'}</span>
                )
            }
        },{
            title: '邮箱操作',
            dataIndex: 'emailOperation',
            key: 'emailOperation',
            width: 90,
            render:(text:string, record:any, index:number) => {
                return(
                    <div className='gym-center-account-popover' >
                        {
                            !(record.state === '离职' && text ==='申请') &&
                            <PopoverContent
                                params={{employeeId: record.employeeId}}
                                requestList={this.requestList}
                                text={text}
                                handleRequest={text==='申请'?emilOpenApply:emilCloseApply}
                                disabled={(record.emailApplyState === '创建申请审批中' || record.emailApplyState === '关闭申请审批中')}
                            />
                        }
                    </div>
                )
            }
        },{
            title: '邮箱申请状态',
            dataIndex: 'emailApplyState',
            key: 'emailApplyState',
            width: 120,
            render:(text:string, record:any, index:number) => {
                if(text==="关闭申请拒绝" || text==="创建申请拒绝"){
                    return (
                        <Popover content={'拒绝原因:'+record.emailRefuseCause} overlayClassName='email-apply-state-popover'>
                            {text}
                        </Popover>
                    )
                }else{
                    return text
                }
            }
        },{
            title: '员工状态',
            dataIndex: 'state',
            key: 'state',
            width: 90
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render:(text:string, record:any, index:number) => {
                return(
                    <div className='gym-center-account-popover'>
                        {record.state === '在职' ? <MakeLeave employeeId={record.employeeId} requestList={this.requestList}/>: ''}
                        <NewMobileContent employeeId={record.employeeId} requestList={this.requestList} mobile={record.mobile}/>
                    </div>
                )
            }
        }];
    componentDidMount() {
        this.requestList();
        // 获取岗位列表
        listCurrentPositionType().then(res=>{
            this.setState({listCurrentPositionType:res})
        })
        this.props.getStaffInfo();
    }
    // 岗位格式化
    formatListCurrentPositionType = (text) => {
        const value = this.state.listCurrentPositionType.filter(item=>item.value === Number(text))[0]
        return value?value.name:''
    }
    handleDetail = (employeeId) => {
        history.push(`${Routes.账号管理详情.link}/${CommonUtils.stringify({employeeId})}`)
    }

    // 查询数据
    onSearch = (values:any) => {
        this.setState({pageNo:1},this.requestList);
    };
    requestList = () => {
        const {form} = this.props;

        const {pageNo, pageSize} = this.state;
        form.validateFields((err, values) => {
            if (!err) {
                const params = Object.assign({}, values, {pageNo, pageSize});
                listAccount(params).then(data => {
                    this.setState({data})
                    this.setState({totalSize: data.totalSize})
                })
            }
        });
    };

    // 分页搜索
    onPageChange = ({pageNo, pageSize}) => {
        this.setState({pageNo, pageSize},this.requestList);
    };
    render() {
        const {form} = this.props;
        const {data,pageNo,pageSize, totalSize} = this.state;
        return (
            <div id={`gym-center-account`} className={`page-wrap`}>
                <PageTitle title={<span className={'gym-page-title-content'}>中心 Gymbo ID 管理</span>}/>
                <div>
                    <SearchForm
                        items={this.searchItem()}
                        form={form}
                        onSearch={this.onSearch}
                    />
                </div>
                <Table
                    className={`gym-table`}
                    pagination={false}
                    bordered={false}
                    columns={this.columns}
                    dataSource={data?data.list:[]}
                    rowKey={`employeeId`}
                    scroll={{x : 'max-content'}}
                />
                <Pagination
                    className={`mt15`}
                    defaultCurrent={pageNo}
                    total={totalSize}
                    pageSize={pageSize}
                    onChange={this.onPageChange}

                />
            </div>
        )
    }
}

export {ManagementCenterAccount}
