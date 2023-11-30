/**
 * desc: 关联中心
 * User: Vicky.Yu
 * Date: 2020/02/25
 * Time: 上午10:00
 */

import React from 'react';
import {
    Form,
    Row,
    Col,
    // Select,
    Input,
} from "antd";
import {Select, Option} from "../../../component/select";
import {form} from "../../../../common/decorator/form";
const FormItem = Form.Item;

@form()

class AddCenterContent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            unitName:'',
        };
    }
    handleChangeCenter = (value:any,index:any) => {
        const {centerList, form} = this.props;
        form.setFieldsValue({unitName:null});
        const selectedCenter = centerList.filter((item:any) => item.unitId === value)[0];
        this.setState({unitName:selectedCenter.unitName})
        form.setFieldsValue({unitName:selectedCenter.unitName});
    };
    render() {
        const {getFieldDecorator} = this.props.form;
        const {handleSelectCenter,handleSelectPosition, deleteItem,index,value,
            centerList,positionTypeList} = this.props;
        const {isPrimary,unitCode,unitName,positionType } = value;
        const positionCode = parseInt(positionType)
        const position = positionTypeList.filter((item:any) => item.value === positionCode)[0];
        const positionData = position&&position.name
        return (
            <Row>
                <Col span={8}>
                    <FormItem label={isPrimary===1?`主中心号:`:`关联中心`} className={`gym-employee-add-form-item`}>
                        {
                            getFieldDecorator('unitCode', {
                                rules: [{
                                    required: true, message: "请选择中心号"
                                }],
                                initialValue: unitCode,
                            })(
                                <Select
                                    className={`gym-employee-add-select`}
                                    onSelect={this.handleChangeCenter}
                                    onChange={value => handleSelectCenter(value, index)}
                                    showSearch={true}
                                    filterOption={(input, option:any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {
                                        (centerList || []).map((item: any,index) => (
                                            <Option key={item.unitCode} value={item.unitId} title={item.unitName}>
                                                {item.unitCode}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                </Col>
                <Col span={8}>
                    <FormItem label={`中心名称:`} className={`gym-employee-add-form-item`}>
                        {
                            getFieldDecorator('unitName', {
                                initialValue: unitName,
                            })(
                                <Input disabled={true}/>
                            )
                        }
                    </FormItem>
                </Col>
                {
                    isPrimary === 1 &&
                    <Col span={8}>
                        <FormItem label={`岗位序列:`} className={`gym-employee-add-form-item`}>
                            {
                                getFieldDecorator('positionData', {
                                    initialValue: positionData,
                                    rules: [{
                                        required: true, message: "请选择岗位序列"
                                    }],
                                })(
                                    <Select
                                        className={`gym-employee-add-select`}
                                        onChange={value => handleSelectPosition(value, index)}
                                        showSearch={true}
                                        filterOption={(input, option:any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            (positionTypeList || []).map((item: any) => (
                                                <Option key={item.id} value={item.value}>
                                                    {item.name}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Col>
                }
                {
                    isPrimary !== 1 &&
                    <Col span={8}>
                        <FormItem>
                            <span className={`delete-btn`} style={{color:'#EF7421',cursor:'pointer'}} onClick={() =>deleteItem(value,index)}>删除</span>
                        </FormItem>
                    </Col> 
                }
                
            </Row>
        )
    }
}

export {AddCenterContent}
