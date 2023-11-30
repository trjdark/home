/**
 * desc: 中心消息历史列表
 * User: lele.hao
 * Date: 2022/05/27
 * Time: 下午2:10
 */
import React from 'react';
import {PageTitle} from "../../../component/pageTitle";
import {SearchForm} from "../../../component/searchForm";
import {Table} from "antd";
import {Routes} from "../../../../common/enum/routes";
import {CommonUtils} from "../../../../common/utils/commonUtils";
import {getHistoryNoticeList} from "../../../../redux-actions/centerNoticeActions";
import {form} from "../../../../common/decorator/form";
import {connect} from "../../../../common/decorator/connect";
import {selectStaffInfo} from "../../../../saga/selectors/adminSelectors";
import {getStaffInfo} from "../../../../redux-actions/adminOperation";
import moment from "moment";

@form()
@connect((state:any) => ({
        staffInfo: selectStaffInfo(state)
    }),
    {getStaffInfo})
class NoticeList extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state= {
            pageNo: 1,
            pageSize:10,
            data: [],
            totalSize: 0,
            noticeId: '', // 详情id
        };
    }

    searchItem = ():any => {
        const readFlagOptions = [
            {mdmId: 1, mdmName: '已读'},
            {mdmId: 0, mdmName: '未读'},
        ];
        return [
            {
                type: 'text',
                label: '标题',
                required: false,
                name: 'title',
                placeholder: '请输入'
            },{
                type: 'dates',
                label: '有效日期',
                precision:true,
                required: false,
                name: {
                    start: 'validDateRangeBegin',
                    end: 'validDateRangeEnd',
                },
                format:'yyyy/MM/DD HH:mm'
            },{
                type: 'select',
                label: '浏览状态',
                required: false,
                name: 'readFlag',
                options: readFlagOptions,
                initialValue: ''
            }
        ];
    }

    columns:any = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 120,
            render:(text:string, record:any, index:number) => {
                return(
                    <span className={`detail-btn`} onClick={()=>this.handleDetail(record.id)}>{text}</span>
                )
            }
        },{
            title: '有效日期范围',
            dataIndex: 'validDateRange',
            key: 'validDateRange',
            width: 100,
        },{
            title: '浏览状态',
            dataIndex: 'readFlag',
            key: 'readFlag',
            width: 50,
            render:(text:number, record:any, index:number) => {
                return(
                    <div>
                        {this.formatReadFlag(text)}
                    </div>
                )
            }
        }];

    formatReadFlag = (status:number) => {
        switch (status){
            case 1:
                return '已读';
            case 0:
                return '未读';
            default:
                return ''
        }
    };
    componentDidMount() {
        this.requestList();
        this.props.getStaffInfo();
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
                values.validDateRangeBegin = values.validDateRangeBegin?moment(values.validDateRangeBegin).valueOf() : ''
                values.validDateRangeEnd = values.validDateRangeEnd?moment(values.validDateRangeEnd).valueOf() : ''
                const params = Object.assign({}, values, {pageNo, pageSize});
                getHistoryNoticeList(params).then(data => {
                    this.setState({data})
                    this.setState({totalSize: data.length})
                })
            }
        });
    };

    handleDetail = (id) => {
        CommonUtils.newWin(`${Routes.账号消息详情.link}/${CommonUtils.stringify({id})}`, `{id}`)
    }

    render(){
        const {form} = this.props;
        const {data} = this.state;

        return (
            <div id={`gym-center-account`} className={`page-wrap`}>
                <PageTitle title={<span className={'gym-page-title-content'}>消息列表</span>}/>
                <div className={'gym-content'} style={{background:'#FFFFFF'}}>
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
                    dataSource={data?data:[]}
                    rowKey={`id`}
                    scroll={{x : 'max-content'}}
                />
            </div>
        )
    }
}

export {NoticeList}