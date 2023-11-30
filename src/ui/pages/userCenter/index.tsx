/**
 * desc: 个人中心
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/13
 * Time: 下午3:20
 */
import React from 'react';
import {Icon, Divider, Breadcrumb, Row, Col, message, Checkbox} from "antd";
import {connect} from "../../component/decorator/connect";
import {selectUserInfo} from "../../../saga/selectors/user";
import {SpanSelectRender} from "./part/spanSelectRender";
import {SpanInputRender} from "./part/spanInputRender";
import {getCityAndEduinfo, updateEmployInfo} from "../../../redux-actions/userActions";
import {getUserInfo} from "../../../redux-actions/userActions";

@connect((state:any) => ({
    employeeInfo: selectUserInfo(state)
}), {getUserInfo})
class UserCenter extends React.Component<any, any>{
    constructor(props){
        super(props)
        this.state = {
            cityTypeList: [],
            eduTypeList: []
        }
    }
    componentDidMount(){
        getCityAndEduinfo().then(res => {
            const {cityTypeList, eduTypeList} = res;
            this.setState({
                cityTypeList: cityTypeList,
                eduTypeList: eduTypeList,
            })
        })
    }
    save = (value, key) => {
        const param = {[key]:value}
        updateEmployInfo(param).then((res) => {
            this.props.getUserInfo();
            message.success('修改成功！')
        })
    };
    handleChange = (e) => {
        const param = {personAuthFlag: e.target.checked ? 1 : 0};
        updateEmployInfo(param).then((res) => {
            this.props.getUserInfo();
            message.success('修改成功！')
        })

    };
    render(){
        const {employeeInfo} = this.props;
        const {cityTypeList, eduTypeList} = this.state;
        return (
            <div className='gym-wrapper gym-user-center'>
                <div className='gym-user-center-title'>
                    <span className='gym-user-center-title-icon'>
                        <Icon type="user" theme="outlined" />
                    </span>
                    <span className='gym-user-center-title-text'>个人中心</span>
                </div>
                <Divider/>
                <Breadcrumb separator={'>'} className='gym-user-center-breadcrumb'>
                    {
                        (employeeInfo.level || []).map((item:any, index:number) => (
                            <Breadcrumb.Item key='post_${index}'>{item}</Breadcrumb.Item>
                        ))
                    }
                </Breadcrumb>
                <div className='gym-user-center-content'>
                    <Row className='gym-user-center-content-item'>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>Gymbo ID：</span>
                            <span className='gym-user-center-content-text'>{employeeInfo.fullUsName}</span>
                        </Col>

                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>工号：</span>
                            <span className='gym-user-center-content-text'>{employeeInfo.employeeCode}</span>
                        </Col>
                    </Row>
                    <Row className='gym-user-center-content-item'>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>中文名：</span>
                            <span className='gym-user-center-content-text'>{employeeInfo.fullName}</span>
                        </Col>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>性别：</span>
                            <span className='gym-user-center-content-text'>
                                {employeeInfo.sex === 0 ? '女' : employeeInfo.sex === 1 ? '男' : null}
                                </span>
                        </Col>
                    </Row>
                    <Row className='gym-user-center-content-item'>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>英文名：</span>
                            <span className='gym-user-center-content-text'>{employeeInfo.firstName}</span>
                        </Col>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>邮箱：</span>
                            <span className='gym-user-center-content-text'>{employeeInfo.email}</span>
                        </Col>
                    </Row>
                    <Row className='gym-user-center-content-item'>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>岗位：</span>
                            <span className='gym-user-center-content-text'>{employeeInfo.positionName}</span>
                        </Col>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>直属领导：</span>
                            <span className='gym-user-center-content-text'>{employeeInfo.leader}</span>
                        </Col>
                    </Row>
                    <Row className='gym-user-center-content-item'>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>原籍城市：</span>
                            <SpanSelectRender
                                name={employeeInfo.homeCityName}
                                list={cityTypeList}
                                prevValue={employeeInfo.homeCity}
                                emitSave={(e) => this.save(e, 'homeCity')}
                            />
                        </Col>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>学历：</span>
                            <SpanSelectRender
                                name={employeeInfo.educationHistoryName}
                                list={eduTypeList}
                                prevValue={employeeInfo.educationHistory}
                                emitSave={(e) => this.save(e, 'educationHistory')}

                            />
                        </Col>
                    </Row>
                    <Row className='gym-user-center-content-item'>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>学校：</span>
                            <SpanInputRender
                                name={employeeInfo.graduateSchool}
                                prevValue={employeeInfo.graduateSchool}
                                emitSave={(e) => this.save(e, 'graduateSchool')}
                            />
                        </Col>
                        <Col span={12}>
                            <span className='gym-user-center-content-label fontW'>曾从事过的职业：</span>
                            <SpanInputRender
                                name={employeeInfo.workExperience}
                                prevValue={employeeInfo.workExperience}
                                emitSave={(e) => this.save(e, 'workExperience')}
                            />
                        </Col>
                    </Row>
                    <Row className='gym-user-center-content-item'>
                        <Col span={24}>
                            <Checkbox
                                onChange={this.handleChange}
                                checked={employeeInfo.infoAuthFlag}
                            >是否开启个人信息授权</Checkbox>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export {UserCenter}