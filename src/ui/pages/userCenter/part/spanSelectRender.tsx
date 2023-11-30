/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2023/4/26
 * Time: 下午5:48
 */
import React, {Fragment, Component} from 'react';
import {Icon, Select} from 'antd'

const {Option} = Select;

class SpanSelectRender extends Component <any, any> {
    constructor(props){
        super(props);
        this.state = {
            flag: false,
            value: null,
        }
    }
    edit = () => {
        this.setState({flag: true})
    };
    save = () => {
        const {value} = this.state;
        this.props.emitSave(value);
        this.setState({flag: false})
    };
    cancel = () => {
        this.setState({flag: false})
    };
    handleChange = (value) => {
        this.setState({value:value})
    };
    render(){
        const {name, list, prevValue} = this.props;
        const {flag} = this.state;
        return (
            <Fragment>
                {
                    flag ? (<Fragment>
                                <Select
                                    className='gym-input-select'
                                    defaultValue={prevValue}
                                    onChange={this.handleChange}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        (list || []).map((item:any, index:any) => <Option key={`${index}_${item.mdmId}`} value={item.mdmId}>
                                            {item.mdmName}
                                        </Option>)
                                    }
                                </Select>
                                <Icon type="save" className='icon' onClick={this.save}/>
                                <Icon type="stop" className='icon' onClick={this.cancel}/>
                            </Fragment>
                            )
                        : (
                            <Fragment>
                                <span className='gym-user-center-content-text'>{name}</span>
                                <Icon type="edit" className='icon' onClick={this.edit}/>
                            </Fragment>
                    )
                }
            </Fragment>
        )
    }
}

export {SpanSelectRender};