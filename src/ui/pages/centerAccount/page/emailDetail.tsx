/**
 * desc: 账号审批GID查看 detail
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
import {centerAccManageAccount} from "../../../../redux-actions/centerEmailActions";

@form()
@connect((state:any) => ({
    staffInfo: selectStaffInfo(state)
}),
         {getStaffInfo})

class EmailDetail extends React.Component<any, any> {
    id:string;
    constructor(props: any) {
        super(props);
        this.state = {
            contentInfo: '',
            centerAccRecordId: '', // centerAccRecordId
        };
    }
    componentDidMount() {
        const employeeId = CommonUtils.hasParams(this.props) ? CommonUtils.parse(this.props).employeeId : '';
        if (employeeId) {
            centerAccManageAccount({employeeId}).then((res:any) => {
                this.setState({contentInfo:res, centerAccRecordId:employeeId});
            })
        }
        this.props.getStaffInfo();
    }
    // 详情数据

    render() {
        const {form} = this.props;
        const {contentInfo, centerAccRecordId} = this.state;
        return (
            <div id={`gym-role-list`} className={`page-wrap`}>
                <PageTitle title={<span className={'gym-page-title-content'}>账号查看</span>}/>
                <div className={`gym-employee-title`}>
                    基本信息
                </div>
                {
                    contentInfo &&
                    <ExamineDetailContent
                        applyForm={form}
                        contentDInfo={contentInfo}
                        nonEditable={true}
                        emailDetail={true}
                        centerAccRecordId={centerAccRecordId}
                        cancel='email'
                    />
                }
            </div>
        )
    }
}

export {EmailDetail}
