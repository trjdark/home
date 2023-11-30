/**
 * desc: notice 父容器
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/15
 * Time: 下午4:19
 */
import React from 'react';
import {Notice} from "./notice";
import ReactDOM from 'react-dom';

const getUuid = () => {
    return "notification-" + new Date().getTime();
};

class Notification extends React.Component<any, any>{
    constructor(props:any){
        super(props)
        this.state = {
            notices : []     //
        }
    }
    add = (notice:any) => {
        const {notices} = this.state;
        const key = notice.key ? notice.key : notice.key = getUuid();
        // const temp = notices.filter((item) => item.key === key).length;
        // console.log(temp)
        // // 不存在重复，添加
        // if(!temp){
        //     notices.push(notice);
        //     this.setState({notices: notices})
        // }
        // @todo 目前碳层只展示一个
        if(!notices.length){
            notices.push(notice);
            this.setState({notices: notices})
        }
    }
    remove (key) {
        // 根据key删除对应
        this.setState(previousState => {
            return {
                notices: previousState.notices.filter(notice => notice.key !== key),
            };
        });
    }

    /**
     * 生成
     * @returns {any[]}
     */
    getNoticeDOM = () => {
        const {notices} = this.state;
        let result = [];
        notices.map((notice:any) => {
            result.push(
                <Notice key={notice.key} {...notice} />
            );

        })
        return result;
    }
    render(){
        const noticesDOM = this.getNoticeDOM();
        return(
            <div>
                {noticesDOM}
            </div>
        )
    }
}

Notification.reWrite = function (properties) {
    const { ...props } = properties || {};

    let div;

    div = document.createElement('div');
    div.classList.add('gym-shadow-box')
    document.body.appendChild(div);

    const notification = ReactDOM.render(<Notification {...props} />, div);

    return {
        notice(noticeProps) {
            notification.add(noticeProps);
        },
        removeNotice(key) {
            notification.remove(key);
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
        component: notification
    }
};

export {Notification}