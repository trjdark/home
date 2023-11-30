/**
 * desc: 日历组件
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/3
 * Time: 上午11:09
 */
import React from 'react';
import Calendar from 'rc-calendar';
import {Icon} from "../../../component/icon";
import {Steps} from "antd";
import moment from 'moment';
import {connect} from "../../../component/decorator/connect";
import {fetchCalendarListByMonth, fetchCalendarListByDay} from "../../../../redux-actions/homeActions";
import {selectHasMeetingCalendarList} from "../../../../saga/selectors/home";
import 'rc-time-picker/assets/index.css';
import 'rc-calendar/assets/index.css';

const Step = Steps.Step;

@connect((state:any) => ({
    hasMeetingCalendarList: selectHasMeetingCalendarList(state),
}), {fetchCalendarListByMonth})
class MyCalendar extends React.Component<any, any>{
    state = {
        visible: false,
        meetingVisible: false,
        selectedDate: null,
        currentMonth: moment(),
        selectedMeetingList: []
    };
    componentDidMount(){
        this.props.fetchCalendarListByMonth({
            beginDate: moment().startOf('month').format('YYYY-MM-DD'),
            endDate: moment().endOf("month").format('YYYY-MM-DD')
        });
        this.rebuildNextPrevBtn();
        this.rebuildHeader();
    }
    /**
     * 重写日历header左右按钮
     */
    rebuildNextPrevBtn = () => {
        const nextBtnDiv = document.querySelector('.rc-calendar-next-month-btn');
        nextBtnDiv.setAttribute('title', '');
        const nextIcon = document.createElement('i');
        nextIcon.classList.add('iconfont', 'icon-zhedie');
        nextBtnDiv.appendChild(nextIcon);
        const prevBtnDiv = document.querySelector('.rc-calendar-prev-month-btn');
        prevBtnDiv.setAttribute('title', '');
        const prevIcon = document.createElement('i');
        prevIcon.classList.add('iconfont', 'icon-xiangzuo');
        prevBtnDiv.appendChild(prevIcon);
    }
    /**
     * 重写日历header Dom内容
     */
    rebuildHeader = (date:any = this.state.currentMonth) => {
        const headerDiv = document.getElementsByClassName('rc-calendar-my-select')[0];
        const childs = headerDiv.childNodes;
        const headerContent = document.createElement('span');
        headerContent.classList.add('gym-home-calendar-header');
        headerContent.innerHTML = date.format('YYYY年MM月');
        for(let i = childs.length - 1; i >= 0; i--){
            headerDiv.removeChild(childs[i])
        }
        headerDiv.appendChild(headerContent);
    };
    /**
     * 点击日历事件
     * @param value
     */
    handleSelect = (value:any) => {
        const {hasMeetingCalendarList} = this.props;
        if(hasMeetingCalendarList.includes(value.format("YYYY-MM-DD"))){
            this.setState({
                meetingVisible: true,
                selectedDate:value
            });
            fetchCalendarListByDay({beginDate: value.format('YYYY-MM-DD')})
                .then((res:any) => {
                    this.setState({selectedMeetingList: res}, () => {
                        if(document.getElementById('gym-home-calendar-wrap-meeting')){
                            document.getElementById('gym-home-calendar-wrap-meeting').focus()
                        }
                    })
                });

        }

    };
    meetingBlur = () => {
        this.closeMeeting()
    };
    /**
     * 切换月份
     * @param date
     */
    handleChange = (date:any) => {
        const {currentMonth} = this.state;
        if(date.month() !== currentMonth.month()){
            this.setState({currentMonth: date});
            this.props.fetchCalendarListByMonth({
                beginDate: date.startOf('month').format('YYYY-MM-DD'),
                endDate: date.endOf("month").format('YYYY-MM-DD')
            })
            this.rebuildHeader(date)
        }
    };
    /**
     * 重写日历内容
     * @param current
     * @param value
     * @returns {any}
     */
    dateCellRender = (current, value) => {
        const {hasMeetingCalendarList} = this.props;
        if(hasMeetingCalendarList.includes(current.format("YYYY-MM-DD"))){
            return (
                <div className={"gym-calendar-date done"}>
                    <div className={`gym-calendar-date-text`} title={''}>
                        {current.format("DD")}
                    </div>
                </div>
            )
        }else{
            return (
                <div className={"gym-calendar-date"}>
                    <div className={`gym-calendar-date-text`} title={''}>
                        {current.format("DD")}
                    </div>
                </div>
            )
        }

    };
    /**
     * 关闭会议弹框
     */
    closeMeeting = () => {
        this.setState({
            meetingVisible:false,
            selectedDate:null,
            selectedMeetingList: []
        })
    };
    /**
     * 会议列表标记
     * @param dot
     * @returns {any}
     */
    customDot = (dot) => (
        <span>{dot}</span>
    );
    render(){
        const {meetingVisible, selectedDate, selectedMeetingList} = this.state;
        return(
            <div className={`gym-home-calendar`}>
                <div className={`gym-home-wrap-title`}>
                    <Icon className={`gym-home-wrap-title-icon`} type="rili" />
                    <span className={`gym-home-wrap-title-text`}>我的日历</span>
                </div>
                <div className={`gym-home-calendar-wrap`}>
                    <Calendar
                        onChange={this.handleChange}
                        onSelect={(value:any) => this.handleSelect(value)}
                        style={{ zIndex: 1000 }}
                        dateRender={this.dateCellRender}
                        showDateInput={false}
                    />
                    {
                        selectedMeetingList.length > 0 &&
                        <div
                            id={`gym-home-calendar-wrap-meeting`}
                            className={`gym-home-calendar-wrap-meeting  ${meetingVisible ? 'active': ''}`}
                            tabIndex={1}
                            onBlur={this.meetingBlur}
                        >
                            <div className={`gym-home-calendar-wrap-meeting-title`} >
                                <span className={`gym-home-calendar-wrap-meeting-title-date`}>
                                    {moment(selectedDate).format("YYYY/MM/DD")}
                                </span>
                            </div>
                            <div className={`gym-home-calendar-wrap-meeting-content`}>
                                <Steps progressDot={this.customDot} direction={`vertical`}>
                                    {
                                        
                                        selectedMeetingList.map((item:any, index:number) => (
                                            <Step
                                                key={item.eventId}
                                                title={<span className={`gym-home-calendar-wrap-meeting-content-date`} >{item.beginTime}</span>}
                                                description={<span className={`gym-home-calendar-wrap-meeting-content-title`} title={item.subject}>{item.subject}</span>}
                                            />
                                        ))
                                    }
                                </Steps>
                            </div>
                        </div>
                    }

                </div>
            </div>
        )
    }
}

export {MyCalendar}