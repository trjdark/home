/**
 * desc:
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2023/4/27
 * Time: 上午9:35
 */
import React, {Fragment, Component} from 'react';
import {Icon, Input} from 'antd'


class SpanInputRender extends Component <any, any> {
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
    handleChange = (e) => {
        this.setState({value:e.target.value})
    };
    render(){
        const {name, prevValue} = this.props;
        const {flag} = this.state;
        return (
            <Fragment>
                {
                    flag ? (<Fragment>
                                <Input
                                    className='gym-input'
                                    defaultValue={prevValue}
                                    onChange={this.handleChange}
                                    maxLength={40}
                                />
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

export {SpanInputRender};