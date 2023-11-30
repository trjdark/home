
import React, {Fragment} from "react";
import {Button, Col, Form, message, Modal, Row, DatePicker,Select} from "antd";
import {form} from "../../../../common/decorator/form";
import {makeLeave} from "../../../../redux-actions/centerEmailActions";
import moment from 'moment';
const FormItem = Form.Item;
const {Option} = Select;

@form()
class MakeLeave extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state= {
            makeLeaveVisible: false  // 修改离职日期显示框
        };
    }
    // 组织Enter事件
    handleKeyDown = (event) => {
        if (event.keyCode === 13 ) {
            event.preventDefault();
            this.handleMakeLeave()
        }
    }
    // 确认修改离职
    handleMakeLeave = () => {
        this.props.form.validateFields((err, values,e) =>{
            if(!err){
                const time = moment(values.leaveTimestamp).startOf('day').valueOf()
                const {employeeId} = this.props;
                makeLeave({employeeId, leaveTimestamp: time, resignReasons: values.resignReasons}).then(res=>{
                    message.success('离职成功');
                    this.props.requestList()
                    this.setState({
                                      makeLeaveVisible: false
                                  })
                })
            }
        })
    }
    // 打开弹窗
    handleOpen = () => {
        this.setState({
                          makeLeaveVisible: true
                      })
    }
    // 关闭弹窗
    handleCancel = () => {
        this.setState({
                          makeLeaveVisible: false
                      })
    }
    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Fragment>
                <span className={`detail-btn`} onClick={this.handleOpen}>离职</span>
                <Modal
                    wrapClassName={`gym-examine-create-email-modal`}
                    visible={this.state.makeLeaveVisible}
                    destroyOnClose={true}
                    title={<span className={'gym-page-title-content'}>选择离职日期</span>}
                    footer={''}
                    closable={false}
                >
                    <Form onKeyDown={this.handleKeyDown}>
                        <Row>
                            <FormItem label={`离职原因:`} className={`gym-employee-add-form-item`}>
                                {
                                    getFieldDecorator('resignReasons', {
                                        rules: [
                                            {required: true, message: '离职原因不能为空'},
                                        ]
                                    })(
                                        <Select
                                            style={{ width: 180 }}
                                            placeholder='请填写离职原因'
                                        >
                                            <Option value={0}>主动离职</Option>
                                            <Option value={1}>被动离职</Option>
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Row>
                        <Row>
                            <FormItem label={`离职日期:`} className='gym-employee-add-form-item'>
                                {
                                    getFieldDecorator('leaveTimestamp', {
                                        rules: [
                                            {required: true, message: '离职日期不能为空'},
                                        ]
                                    })(
                                        <DatePicker/>
                                    )
                                }
                            </FormItem>
                            <div className='mb25'>注意：离职日期仅作为登记，账号会立即关闭。离职后该账号会保留，但不可再登录。如需复职，请联系service@gymboglobal.com</div>
                        </Row>

                        <Row style={{textAlign:'center'}}>
                            <Button
                                type="primary"
                                // htmlType="button"
                                onClick={this.handleMakeLeave}
                            >
                                确认
                            </Button>
                            <Button
                                type="default"
                                onClick={this.handleCancel}
                                style={{marginLeft:'50px'}}
                            >
                                返回
                            </Button>
                        </Row>
                    </Form>
                </Modal>
            </Fragment>

        )
    }
}
export {MakeLeave}
