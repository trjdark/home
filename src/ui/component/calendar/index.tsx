/**
 * desc: 日历样式
 * User: colin.lu
 * Date: 2018/8/9
 * Time: 下午12:39
 */
import React from 'react';
import {Calendar as AntCalendar} from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import './index.scss';

let configType:string = '';
// let currentQuarter:any = moment().quarter(); // 当前是第几季度
// let currentYear:any = moment().year(); // 当前年
//
// moment(moment(currentYear + '-01-01').toDate()).quarter(currentQuarter);
// let endMonth:any = 3 * parseInt(currentQuarter); //当季度最后一个月
// /* 对月数进行格式化 */
// if(endMonth < 10)
//     endMonth = '0' + endMonth;
// else
//     endMonth += '';
//
// let endMonthDays = moment(currentYear + '-' + endMonth).daysInMonth(); // 末尾月天数
// let endDays = currentYear + '-' + endMonth + '-' + endMonthDays; //完整年月日整合
// alert(moment(endDays).toDate());


class Calendar extends React.Component<any, any>{
    calendarValue:any;
    clickAction:string = '';
    count:number = 1;
    addCount:number = 1;
    imageSrc:string = '';

    // constructor (props) {
    //     super(props);
    //     this.state = { clickAction: '' }
    // }

    // gotoPreviousMonth = () => {
    //     console.log('previousMonth');
    //     this.clickAction = 'previous'
    // };
    //
    // gotoNextMonth = () => {
    //     console.log('nextMonth');
    //     this.clickAction = 'next'
    // };

    render(){
        this.imageSrc = 'https://baidu.logo.png';
        // function getListData(value) {
        //     let listData;
        //     switch (value.date()) {
        //         case 8:
        //             listData = [
        //                 { type: 'warning', content: 'This is warning event.' },
        //                 { type: 'success', content: 'This is usual event.' },
        //             ]; break;
        //         case 10:
        //             listData = [
        //                 { type: 'warning', content: 'This is warning event.' },
        //                 { type: 'success', content: 'This is usual event.' },
        //                 { type: 'error', content: 'This is error event.' },
        //             ]; break;
        //         case 15:
        //             listData = [
        //                 { type: 'warning', content: 'This is warning event' },
        //                 { type: 'success', content: 'This is very long usual event。。....' },
        //                 { type: 'error', content: 'This is error event 1.' },
        //                 { type: 'error', content: 'This is error event 2.' },
        //                 { type: 'error', content: 'This is error event 3.' },
        //                 { type: 'error', content: 'This is error event 4.' },
        //             ]; break;
        //         default:
        //     }
        //     return listData || [];
        // }

        // function dateCellRender(value) {
        //     const listData = getListData(value);
        //     return (
        //         <div>
        //
        //         </div>
        //     );
        // }

        // function getMonthData(value) {
        //     if (value.month() === 8) {
        //         return 1394;
        //     }
        // }

        // function monthCellRender(value) {
        //     const num = getMonthData(value);
        //     return num ? (
        //         <div className="notes-month">
        //             <section>{num}</section>
        //         </div>
        //     ) : null;
        // }

        function onPanelChange(value, mode) {

        }

        function onChange(value) {
            // console.log(2);
            if(configType === 'previous'){
                value.add(-1, 'months');
            }else if (configType === 'next') {
                value.add(1, 'months');
            }
        }

        function gotoPreviousMonth() {
            configType = 'previous';
            onChange(this.clickAction.state.value);
        }
        function gotoNextMonth() {
            configType = 'next';
            // onChange();
        }

        return(
            <div>
                {/*<div className={'gym-calendar-pic'}>*/}
                    {/*<img src={this.imageSrc}/>*/}
                {/*</div>*/}
                <div>
                    <div className={'gym-calendar-header'}>
                        <span className="ant-fullcalendar-cell ant-fullcalendar-last-month-cell" onClick={gotoPreviousMonth.bind(this)}>上一个月</span> <span>当前日期</span> <span onClick={gotoNextMonth.bind(this)}>下一个月</span>
                    </div>
                </div>
                <AntCalendar ref={(ref:any) => this.clickAction = ref }
                             fullscreen={false} mode={'month'} onPanelChange={onPanelChange} onChange={onChange.bind(this)}
                />
            </div>
        )
    }
}


export {Calendar}