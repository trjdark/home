/**
 * desc: 高阶组件
 * User: Renjian.Tang/trj8772@aliyun.com
 * Date: 2018/8/14
 * Time: 下午2:39
 */
import React from 'react';
import {Form, Button, DatePicker, InputNumber} from "antd";
import {Select, Option} from "../select";
import Input from "antd/es/input/Input";
import {DateInput, MonthInput} from "../datePicker";
import {form} from "../../../common/decorator/form";
import {handleValidate, Validation} from "../../../common/utils/validate";
import './index.scss';

const {RangePicker} = DatePicker;

const FormItem = Form.Item;

declare interface item {
    format: string,
    type: 'number' | 'text' | 'select' | 'rangePicker' | 'dates' | 'months' | 'month' | 'datesPicker' | 'card',
    label:string,
    name: any,
    options?: Array<any>,
    initialValue?: any,
    placeholder?:string
    colon?:boolean,
    startInitialValue?:any,
    endInitialValue?:any,
    popupContainer?:any,
    props?:any
    precision?:boolean,        // 时间精度
}

declare interface SearchFormProps {
    items: Array<item>,
    form?: any,
    onSearch: (json: any) => void,
    onReset?: (value: any) => void,
    [propName: string]: any

}

@form()
class SearchForm extends React.Component <SearchFormProps, any> {
    onSearch = (e) => {
        e.preventDefault();
=        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSearch(values)
            }
        });
    };
    onReset = () => {
        const {form, onReset} = this.props;
        form.resetFields();
        if (typeof onReset === 'function') {
            onReset(form.getFieldsValue());
        }
    };
    handleChange = () => {

    };
    getFields = () => {
        const children = [];
        const {items, form, className} = this.props;
        const inputNodes = items;
        const {getFieldDecorator} = form;
        for (let i = 0, len = inputNodes.length; i < len; i++) {
            children.push(
                <div key={`form_${i}`} className="gym-form-item-wrap">
                    {
                        inputNodes[i].type === 'text' &&
                        <FormItem label={inputNodes[i].label} className={`gym-form-item ${className || ''}`}>
                            {
                                getFieldDecorator(inputNodes[i].name)(
                                    <Input
                                        className={`gym-form-item-input`}
                                        placeholder={inputNodes[i].placeholder}
                                        onChange={this.handleChange}
                                    />
                                )
                            }

                        </FormItem>
                    }
                    {
                        inputNodes[i].type === 'number' &&
                        <FormItem
                            label={inputNodes[i].label}
                            className={`gym-form-item ${className || ''}`}
                            colon={typeof inputNodes[i].colon === 'undefined' ? true: inputNodes[i].colon}
                        >
                            {
                                getFieldDecorator(inputNodes[i].name, {
                                    initialValue: inputNodes[i].initialValue
                                })(
                                    <InputNumber {...inputNodes[i].props}/>
                                )
                            }
                        </FormItem>
                    }
                    {
                        inputNodes[i].type === 'card' &&
                        <FormItem label={inputNodes[i].label} className={`gym-form-item ${className || ''}`}>
                        {
                            getFieldDecorator(inputNodes[i].name,{
                                rules:[{
                                    validator:handleValidate[Validation.英文数字]
                                }],
                            })(
                                <Input
                                    className={`gym-form-item-input`}
                                    placeholder={inputNodes[i].placeholder}
                                    onChange={this.handleChange}
                                    maxLength={18}
                                />
                            )
                        }
                        </FormItem>
                    }
                    {
                        inputNodes[i].type === 'select' &&
                        <FormItem label={inputNodes[i].label} className={`gym-form-item ${className || ''}`}>
                            {
                                getFieldDecorator(inputNodes[i].name, {
                                    initialValue: inputNodes[i].initialValue
                                })(
                                    <Select
                                        className={`gym-form-item-select`}
                                        onChange={this.handleChange}
                                        placeholder={inputNodes[i].placeholder}
                                        getPopupContainer={()=>document.querySelector(inputNodes[i].popupContainer || '.gym-common-search-form')}
                                        showSearch={true}
                                        filterOption={(input, option) => {
                                            const text = option.props.children as string;
                                            return text.toLowerCase().includes(input.toLowerCase())
                                        }}
                                    >
                                        {
                                            (inputNodes[i].options || []).map((item: any, index: number) =>
                                                <Option
                                                    key={`${item.mdmId}_${index}`}
                                                    value={item.mdmId}
                                                >
                                                    {item.mdmName}
                                                </Option>
                                            )
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                    }
                    {
                        inputNodes[i].type === 'rangePicker' &&
                        <FormItem label={inputNodes[i].label} className={`gym-form-item ${className || ''}`}>
                            {
                                getFieldDecorator(inputNodes[i].name, {
                                    initialValue: inputNodes[i].initialValue
                                })(
                                    <RangePicker
                                        allowClear={false}
                                    />
                                )
                            }
                        </FormItem>
                    }
                    {
                        inputNodes[i].type === 'dates' &&
                        <div className={`gym-form-item-date`}>
                            <FormItem label={inputNodes[i].label} className={`gym-form-item ${className || ''}`}>
                                {
                                    getFieldDecorator(inputNodes[i].name.start)(
                                        <DateInput style={{width:110}} showTime={inputNodes[i].precision} format={null}/>
                                    )
                                }
                            </FormItem>
                            <span className={`gym-form-item-date-text`}>-</span>
                            <FormItem className={`gym-form-item`}>
                                {
                                    getFieldDecorator(inputNodes[i].name.end)(
                                        <DateInput style={{width:110}} showTime={inputNodes[i].precision} format={null} />
                                    )
                                }
                            </FormItem>
                        </div>
                    }
                    {
                        /*月份区间选择*/
                        inputNodes[i].type === 'months' &&
                        <div className={`gym-form-item-date gym-form-item-month`}>
                            <FormItem label={inputNodes[i].label} className={`gym-form-item ${className || ''}`}>
                                {
                                    getFieldDecorator(inputNodes[i].name.start, {
                                        initialValue: inputNodes[i].startInitialValue
                                    })(
                                        <MonthInput style={{width: 190}} allowClear={false}/>
                                    )
                                }
                            </FormItem>
                            <span className="gym-form-item-date-text">-</span>
                            <FormItem className={`gym-form-item`}>
                                {
                                    getFieldDecorator(inputNodes[i].name.end, {
                                        initialValue: inputNodes[i].endInitialValue
                                    })(
                                        <MonthInput style={{width: 190}} allowClear={false}/>
                                    )
                                }
                            </FormItem>
                        </div>
                    }
                    {
                        /*单个月份选择*/
                        inputNodes[i].type === 'month' &&
                        <div className={`gym-form-item-date`}>
                            <FormItem label={inputNodes[i].label} className={`gym-form-item ${className || ''}`}>
                                {
                                    getFieldDecorator(inputNodes[i].name, {
                                        initialValue: inputNodes[i].initialValue
                                    })(
                                        <MonthInput
                                            style={{width: 200}}
                                            allowClear={false}
                                            {...inputNodes[i].props}
                                        />
                                    )
                                }
                            </FormItem>
                        </div>
                    }
                    {
                        inputNodes[i].type === 'datesPicker' &&
                        <div className={`gym-form-item-date`}>
                            <FormItem label={inputNodes[i].label} className={`gym-form-item ${className || ''}`}>
                                {
                                    getFieldDecorator(inputNodes[i].name, {
                                        initialValue: inputNodes[i].initialValue
                                    })(
                                        <DateInput/>
                                    )
                                }
                            </FormItem>
                        </div>
                    }
                </div>)
        }
        return children;
    };

    render() {
        const {items} = this.props;
        return (
            <Form onSubmit={this.onSearch} className="gym-common-search-form">
                {this.getFields()}
                {
                    // 如果正好占满一行，则按钮位置在最后一个
                    items.length % 3 === 0 && [
                        <div className="gym-form-item-wrap" key={'empty_0'}>
                            <FormItem className={`gym-form-item`}/>
                        </div>,
                        <div className="gym-form-item-wrap" key={'empty_1'}>
                            <FormItem className={`gym-form-item`}/>
                        </div>,
                    ]
                }
                {
                    // 如果多出一个，按钮位置在最后一个
                    items.length % 3 === 1 && [
                        <div className="gym-form-item-wrap" key={'empty_0'}>
                            <FormItem className={`gym-form-item`}/>
                        </div>,
                    ]
                }
                <div className="gym-form-item-wrap">
                    <FormItem className={`gym-form-item`} label={' '} colon={false}>
                        <div className="gym-search-form-btn">
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={`gym-button-xs gym-button-blue`}
                            >
                                查询
                            </Button>
                            <Button
                                className={`gym-button-xs  gym-button-reset ml15`}
                                onClick={this.onReset}
                            >
                                重置
                            </Button>
                        </div>
                    </FormItem>
                </div>
            </Form>
        )
    }
}

export {SearchForm};
