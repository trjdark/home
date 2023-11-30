/**
 * desc: 账号审批GID新建
 * User: katarina.yuan
 * Date: 2022/1/13
 * Time: 上午10:00
 */

import React from 'react';
import {form} from "../../../../common/decorator/form";
import {PageTitle} from "../../../component/pageTitle";
import {ExamineDetailContent} from "../part/detailContent";
import {getStaffInfo} from "../../../../redux-actions/adminOperation";
import {connect} from "../../../../common/decorator/connect";
import {selectStaffInfo} from "../../../../saga/selectors/adminSelectors";

@form()
@connect((state:any) => ({
    staffInfo: selectStaffInfo(state)
}),
         {getStaffInfo})

class NewExamineBuild extends React.Component<any, any> {
    id:string;
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.props.getStaffInfo();
    }
    render() {
        const {form} = this.props;
        const {contentInfo, centerAccRecordId} = this.state;
        return (
            <div id={`gym-role-list`} className={`page-wrap`}>
                <PageTitle title={<span className={'gym-page-title-content'}>新建账号</span>}/>
                <div className={`gym-employee-title`}>
                    基本信息
                </div>
                <ExamineDetailContent
                    applyForm={form}
                    contentDInfo={contentInfo}
                    nonEditable={false}
                    centerAccRecordId={centerAccRecordId}
                />
            </div>
        )
    }
}

export {NewExamineBuild}
