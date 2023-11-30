
import React, {Fragment} from "react";
import {Button, Col, Form, Input, message, Modal, Row} from "antd";
import {handleValidate, Validation} from "../../../../common/utils/validate";
import {form} from "../../../../common/decorator/form";
import {modifyMobile} from "../../../../redux-actions/centerEmailActions";
const FormItem = Form.Item;

@form()
class NewMobileContent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state= {
            newMobileVisible: false, // 修改手机号显示框
        };
    }
    // 组织Enter事件
    handleKeyDown = (event) => {
        if (event.keyCode === 13 ) {
            event.preventDefault();
            this.handleNewMobile()
        }
    }
    // 确认修改手机号
    handleNewMobile = () => {
        this.props.form.validateFields((err, values,e) =>{
            if(!err){
                const newMobile = this.props.form.getFieldsValue(['newMobile'])
                const {employeeId} = this.props
                modifyMobile({employeeId, ...newMobile}).then(res=>{
                    message.success('修改成功');
                    this.props.requestList()
                    this.setState({
                                      newMobileVisible: false
                                  })
                })
            }
        })
    }
    // 打开弹窗
    handleOpen = () => {
        this.setState({
                          newMobileVisible: true
                      })
    }
    // 关闭弹窗
    handleCancel = () => {
        this.setState({
                          newMobileVisible: false
                      })
    }
    // 原手机不能与新手机相同
    handleMobile = (rule,value,callback) => {
        const {mobile} = this.props;
        if(value===mobile){
            callback('未作修改')
        }else{
            callback()
        }
    }
    render() {
        const {form, mobile} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Fragment>
                <span className={`detail-btn`} onClick={this.handleOpen}>改手机号</span>
                <Modal
                    wrapClassName={`gym-examine-create-email-modal`}
                    visible={this.state.newMobileVisible}
                    destroyOnClose={true}
                    title={<span className={'gym-page-title-content'}>修改手机号</span>}
                    footer={''}
                    closable={false}
                >
                    <Form onKeyDown={this.handleKeyDown} labelCol={{sm: { span: 8 }}}>
                        <Row>
                            <Col span={16}>
                                <FormItem label={`原手机号:`} className={`gym-employee-add-form-item`}>
                                    <span>{mobile}</span>
                                </FormItem>
                                <FormItem label={`新手机号:`} className={`gym-employee-add-form-item`}>
                                    {
                                        getFieldDecorator('newMobile', {
                                            rules: [
                                                {required: true, whitespace:true, message: '新手机号不能为空'},
                                                {validator:handleValidate[Validation.手机号码]},
                                                {validator:this.handleMobile},
                                            ],
                                            validateTrigger:'onBlur'
                                        })(
                                            <Input placeholder={`请输入`} maxLength={11}/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style={{textAlign:'center'}}>
                            <Button
                                type="primary"
                                // htmlType="button"
                                onClick={this.handleNewMobile}
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
export {NewMobileContent}
