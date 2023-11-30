/**
 * desc: 封装分页组件
 * User: Renjian.Tang/trj8772@aliyun.com
 * Date: 2018/8/6
 * Time: 下午7:45
 */
import React from 'react';
import {Pagination as AntdPagination} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import './pagination.scss';

declare interface PaginationProps {
    total:number,
    defaultCurrent:number,
    pageSize:number,
    onChange:(pageInfo:object) => void,
    className?:string
}

class Pagination extends React.Component<PaginationProps, any>{
    private DEFAULT_PAGESIZE:number = 50;
    constructor(props: any) {
        super(props);
        this.state = {
            currentPage: this.props.defaultCurrent || 1,
            pageSize: this.props.pageSize || 50,
        }
    }
    handleChange = (pageNumber:number, pageSize:number) => {
        this.setState({pageNo:pageNumber, pageSize:pageSize});
        this.props.onChange({pageNo:pageNumber, pageSize:pageSize});
    };
    render(){
        const {total, defaultCurrent, pageSize} = this.props;
        const pageCount=Math.ceil(total/(pageSize || this.DEFAULT_PAGESIZE) );
        return(
            <div className={`gym-page-content ${this.props.className ? this.props.className : ''}`}>
                {
                    total > 0 &&
                    <div className={`gym-page-content-wrap`}>
                        <div className={``}>
                            <span className={`gym-page-content-wrap-text`}>共</span>
                            <span className={`gym-page-content-wrap-number`}>{total}</span>
                            <span className={`gym-page-content-wrap-text`}>条记录</span>
                            <span className={`gym-page-content-wrap-text`}>第</span>
                            <span className={`gym-page-content-wrap-number`}>{defaultCurrent||1}</span>
                            <span className={`gym-page-content-wrap-text`}>/</span>
                            <span className={`gym-page-content-wrap-number`}>{pageCount}</span>
                            <span className={`gym-page-content-wrap-text`}>页</span>
                        </div>
                        <AntdPagination
                            className={``}
                            showSizeChanger={true}
                            showQuickJumper={pageCount > 1 ? true : false}
                            pageSizeOptions={['10', '50', '100']}
                            onShowSizeChange={this.handleChange}
                            current={defaultCurrent || 1}
                            total={total}
                            onChange={this.handleChange}
                            defaultPageSize={pageSize || this.DEFAULT_PAGESIZE}
                        />
                    </div>
                }
            </div>
        )
    }
}

export {Pagination}
