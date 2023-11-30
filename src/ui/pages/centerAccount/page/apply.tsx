/**
 * desc: 中心账号申请
 * User: Katarina
 * Date: 2022/1/19
 * Time: 下午3:20
 */
import React from 'react';
import {Button, Popover} from "antd";
import {Table} from "antd";
import {form} from "../../../../common/decorator/form";
import {SearchForm} from "../../../component/searchForm";
import {Pagination} from "../../../component/pagination";
import {PageTitle} from "../../../component/pageTitle";
import moment from 'moment';
import "../style"
import history from "../../../../router/history";
import {Routes} from "../../../../common/enum/routes";
import {CommonUtils} from "../../../../common/utils/commonUtils";
import {allCenterAccRecordList, recallCenterAccRecord} from "../../../../redux-actions/centerIDActions";
import {connect} from "../../../../common/decorator/connect";
import {selectStaffInfo} from "../../../../saga/selectors/adminSelectors";
import {getStaffInfo} from "../../../../redux-actions/adminOperation";
import {PopoverContent} from "../part/popoverContent";
import {Cookie} from "../../../../service/cookie";

@form()
@connect((state:any) => ({
             staffInfo: selectStaffInfo(state)
         }),
         {getStaffInfo})

class ApplyCenterAccount extends React.Component<any, any> {
    private userName = Cookie.getCookie('userName')
    constructor(props: any) {
        super(props);
        this.state= {
            pageNo: 1,
            pageSize:10,
            data: {},
            totalSize: '',
            employeeId: '', // 详情id
        };
    }
    searchItem = ():any => {
        const statusOptions = [
            {mdmId: '20001', mdmName: '通过'},
            {mdmId: '20002', mdmName: '拒绝'},
            {mdmId: '20003', mdmName: '审批中'},
            {mdmId: '20004', mdmName: '已撤销'},
            {mdmId: '', mdmName: '全部'},
        ];
        return [
            {
                type: 'text',
                label: '关键字',
                name: 'keyword',
                placeholder: '请输入中英文名/Gymbo ID'
            }, {
                type: 'text',
                label: '中心号',
                name: 'centerCode',
                placeholder: '请输入'
            },
            {
                type: 'text',
                label: '手机号',
                name: 'mobile',
                placeholder:'请输入'
            },{
                type: 'select',
                label: '申请状态',
                name: 'status',
                options: statusOptions,
                initialValue: ''
            }
        ];
    }
    columns:any = [
        {
            title: 'Gymbo ID',
            dataIndex: 'fullUsName',
            key: 'fullUsName',
            width: 120,
        },{
            title: '姓名',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 100,
        },{
            title: '英文名',
            dataIndex: 'englistFullName',
            key: 'englistFullName',
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
            title: '申请人',
            dataIndex: 'applyBy',
            key: 'applyBy',
            width: 100,
        },{
            title: '申请时间',
            dataIndex: 'applyTime',
            key: 'applyTime',
            render:(text)=>(text && moment(text).format('YYYY-MM-DD HH:mm:ss')),
            width: 100,
        },{
            title: '申请状态',
            dataIndex: 'status',
            key: 'status',
            width: 90,
            render:(text:string, record:any, index:number) => {
                return(
                    <div>
                        {this.formatStatus(text)}
                    </div>
                )
            }
        },{
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 120,
            render:(text:string, record:any, index:number) => {
                return(
                    <div className='gym-center-account-popover'>
                        <span className={`detail-btn fl mr10`} onClick={() => this.detail(record.id)}>查看</span>
                        {record.status === '20003' ? <PopoverContent
                            params={{centerAccRecordId: record.id}}
                            requestList={this.requestList}
                            text='撤销'
                            handleRequest={recallCenterAccRecord}
                            disabled={this.userName !== record.applyBy}
                            userName={this.userName}
                            applyBy={record.applyBy}
                        /> : ''}
                        {(record.status === '20004' || record.status === '20002') ? <div
                            className={`${this.userName !== record.applyBy?'disable-btn':'detail-btn'} fl`}
                            onClick={() => this.userName === record.applyBy?this.reapply(record.id,record.status):''}
                        >
                            重新申请
                        </div> : ''}
                    </div>
                )
            }
        },{
            title: '最后更新时间',
            dataIndex: 'lastUpdateTime',
            key: 'lastUpdateTime',
            render:(text)=>(text && moment(text).format('YYYY-MM-DD HH:mm:ss')),
            width: 100,
        }];

    formatStatus = (status:string) => {
        switch (status){
            case '20001':
                return '通过';
            case '20002':
                return '拒绝';
            case '20003':
                return '审批中';
            case '20004':
                return '已撤销';
            default:
                return ''
        }
    };
    componentDidMount() {
        this.requestList();
        this.props.getStaffInfo();
    }
    // 查看
    detail = (id) => {
        history.push(`${Routes.账号申请查看.link}/${CommonUtils.stringify({centerAccRecordId: id})}`)
    }
    // 重新申请
    reapply = (id, status) => {
        history.push(`${Routes.账号申请重新申请.link}/${CommonUtils.stringify({centerAccRecordId: id, status})}`)
    }
    // 新建
    handleAccRecord = () => {
        history.push(`${Routes.账号申请新建.path}`)
    };

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
                allCenterAccRecordList(params).then(data => {
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
                <PageTitle title={<span className={'gym-page-title-content'}>中心 Gymbo ID 申请</span>}/>
                <div>
                    <SearchForm
                        items={this.searchItem()}
                        form={form}
                        onSearch={this.onSearch}
                    />
                    <Button className={`gym-button-create`} onClick={this.handleAccRecord}>新建</Button>
                </div>
                <Table
                    className={`gym-table`}
                    pagination={false}
                    bordered={false}
                    columns={this.columns}
                    dataSource={data?data.list:[]}
                    rowKey={`id`}
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

export {ApplyCenterAccount}

