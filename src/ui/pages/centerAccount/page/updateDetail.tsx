/**
 * desc: 账号审批GID重新申请 detail
 * User: katarina.yuan
 * Date: 2022/1/13
 * Time: 上午10:00
 */

import React from 'react';
import {form} from "../../../../common/decorator/form";
import {PageTitle} from "../../../component/pageTitle";
import {CommonUtils} from "../../../../common/utils/commonUtils";
import {ExamineDetailContent} from "../part/detailContent";
import {getStaffInfo} from "../../../../redux-actions/adminOperation";
import {connect} from "../../../../common/decorator/connect";
import {selectStaffInfo} from "../../../../saga/selectors/adminSelectors";
import {getRecordDetail} from "../../../../redux-actions/centerIDActions";

@form()
@connect((state:any) => ({
    staffInfo: selectStaffInfo(state)
}),
         {getStaffInfo})

class UpdateDetail extends React.Component<any, any> {
    id:string;
    constructor(props: any) {
        super(props);
        this.state = {
            contentInfo: '',
            centerAccRecordId: '', // centerAccRecordId
            status: '' // 申请状态
        };
    }
    componentDidMount() {
        const id = CommonUtils.hasParams(this.props) ? CommonUtils.parse(this.props).centerAccRecordId : '';
        const status = CommonUtils.hasParams(this.props) ? CommonUtils.parse(this.props).status : '';
        if (id) {
            getRecordDetail({centerAccRecordId:id}).then((res:any) => {
                this.setState({contentInfo:res, centerAccRecordId:id, status});
            })
        }
        this.props.getStaffInfo();
    }
    // 详情数据

    render() {
        const {form} = this.props;
        const {contentInfo, centerAccRecordId, status} = this.state;
        return (
            <div id={`gym-role-list`} className={`page-wrap`}>
                <PageTitle title={<span className={'gym-page-title-content'}>查看账号</span>}/>
                <div className={`gym-employee-title`}>
                    基本信息
                </div>
                {
                    contentInfo &&
                    <ExamineDetailContent
                        applyForm={form}
                        contentDInfo={contentInfo}
                        nonEditable={false}
                        centerAccRecordId={centerAccRecordId}
                        status={status}
                    />
                }
            </div>
        )
    }
}

export {UpdateDetail}
