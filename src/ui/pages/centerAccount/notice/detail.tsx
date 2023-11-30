/**
 * desc: 中心通知查看 detail
 * User: lele.hao
 * Date: 2022/05/27
 * Time: 下午15:00
 */

import React from 'react';
import {form} from "../../../../common/decorator/form";
import {PageTitle} from "../../../component/pageTitle";
import {getStaffInfo} from "../../../../redux-actions/adminOperation";
import {connect} from "../../../../common/decorator/connect";
import {selectStaffInfo} from "../../../../saga/selectors/adminSelectors";
import {CommonUtils} from "../../../../common/utils/commonUtils";
import {Routes} from "../../../../common/enum/routes";
import history from "../../../../router/history";
import {getNoticeDetail} from "../../../../redux-actions/centerNoticeActions";
import {readNotice} from "../../../../redux-actions/homeActions";
import moment from "moment";

@form()
@connect((state:any) => ({
    staffInfo: selectStaffInfo(state)
}),
         {getStaffInfo})
class NoticeDetail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            validDateBegin:'',
            text:''
        };
    }

    componentDidMount() {
        const id = CommonUtils.hasParams(this.props) ? CommonUtils.parse(this.props).id : '';
        if (id) {
            readNotice(id).then(() => {});
            getNoticeDetail({id:id}).then((res:any) => {
                this.setState({title:res.title});
                this.setState({validDateBegin:res.validDateBegin});
                this.setState({text:res.text});
            })
        }
        this.props.getStaffInfo();
    }

    render() {
        return (
            <div id={`gym-role-list`} className={`page-wrap`}>
                <PageTitle
                    title={<span className={'gym-page-title-content'}
                    onClick={() => history.push(Routes.账号消息列表.path)}>返回所有消息列表</span>}>
                </PageTitle>
                <div style={{margin:15}}>
                    <div className={`gym-employee-title`}>
                        <h2>{this.state.title}</h2>
                    </div>
                    <div style={{marginTop:10,color:"gray",fontSize:14}}>
                        {moment(this.state.validDateBegin).format('yyyy-MM-DD')}
                    </div>
                    <div style={{marginTop:20}}  dangerouslySetInnerHTML={{__html: this.state.text}}/>
                </div>
            </div>
        )
    }
}

export {NoticeDetail}
