/**
 * desc: 忘记密码-验证用户
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/10
 * Time: 下午2:12
 */
import React from 'react';
import {Link} from "react-router-dom";
import {form} from "../../../component/decorator/form";
import {Routes} from '../../../../common/enum/routes';
import {Form, Input, Button} from "antd";
const FormItem = Form.Item;

@form()
class PasswordUser extends React.Component<any>{
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 22 },
            },
        };
        return(
            <Form className={`login-form`}>
                <FormItem label={'Gymbo ID：'} {...formItemLayout}>
                    {getFieldDecorator('userName', {
                        rules: [
                            { required: true, message: '请输入您的Gymbo ID！' },
                        ],
                    })(
                        <Input placeholder="Gymbo ID"/>
                    )}
                </FormItem>
                <FormItem label={'验证:'} {...formItemLayout}>
                    {getFieldDecorator('code', {
                        rules: [
                            { required: true, message: '图片验证码！' },
                        ],
                    })(
                        <Input type="code" placeholder="图片验证码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" className="login-form-button" onClick={this.props.next}>
                        确定
                    </Button>
                    <Link to={Routes.登陆.path}>
                        <Button type="default" className="login-form-button">
                            关闭
                        </Button>
                    </Link>
                </FormItem>
            </Form>
        )
    }
}

export {PasswordUser}