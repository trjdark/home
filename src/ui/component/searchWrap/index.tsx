/**
 * desc: 搜索框
 * User: Renjian.Tang/trj8772@aliyun.com
 * Date: 2018/8/11
 * Time: 下午2:23
 */
import React from 'react';
import {Row, Col, Form, Input, Button} from "antd";
const FormItem = Form.Item;
import {form} from "../../../common/decorator/form";
import './index.scss';

declare interface SearchWrapProps {
    itemConfig:Array<any>,
    form?:any,
    onSearch:(json:any) => void
}

@form()
class SearchWrap extends React.Component<SearchWrapProps, any>{
    onSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                this.props.onSearch(values);
            }
        });
    };
    onReset = () => {
        this.props.form.resetFields()
    };
    getFields = () => {
        const children = [];
        const inputNodes = this.props.itemConfig;
        const { getFieldDecorator } = this.props.form;
        for ( let i = 0, len = inputNodes.length; i < len; i++){
            children.push(
                <Col span={8} key={i}>
                    <FormItem label={inputNodes[i].label}>
                        {
                            getFieldDecorator(inputNodes[i].name)(
                                <Input placeholder={inputNodes[i].placeholder}/>
                            )}
                    </FormItem>
                </Col>)
        }
        return children;
    };
    render(){
        return(
            <div className={`gym-search-wrap`}>
                <Form onSubmit={this.onSearch}>
                    <Row>{this.getFields()}</Row>
                    <Row>
                        <Col span={2} offset={20} className={`gym-clearfix`}>
                            <Button type="primary" htmlType="submit" className={`gym-float-right`}>查询</Button>
                        </Col>
                        <Col span={2} className={`gym-clearfix`}>
                            <Button className={`gym-float-right`} onClick={this.onReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export {SearchWrap}