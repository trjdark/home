/**
 * desc: 首页我的消息
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/9/6
 * Time: 下午5:55
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Icon} from "../../../component/icon";
import {getNoticeList} from "../../../../redux-actions/homeActions";
import moment from 'moment';
import {CommonUtils} from "../../../../common/utils/commonUtils";
import {Scrollbars} from 'react-custom-scrollbars';
import history from "../../../../router/history";
import {Routes} from "../../../../common/enum/routes";
import {connect} from "../../../../common/decorator/connect";
import {selectEmitNews} from "../../../../saga/selectors/home";

@connect((state) => ({
    myTodoMessageList: selectEmitNews(state)
}), {getNoticeList})
class MyMessage extends React.Component<any, any>{
    LIMIT_COUNT = 10;    // 多少条以后显示更多按钮
    constructor(props:any){
        super(props)
        this.state = {
            myTodoMessageList:[],
            myTodoMessageCount:0,
        }
    }
    componentDidMount(){
        this.props.getNoticeList();
        // getNoticeList(null)
        //     .then((res:any) => {
        //         this.setState({
        //             myTodoMessageList: res || [],
        //             myTodoMessageCount:res.count
        //         })
        //     })
    }

    render(){
        // const {myTodoMessageList} = this.state;
        const {myTodoMessageList} = this.props;
        return(
            <div className={`gym-home-message`}>

                <div className={`gym-home-wrap-title`}>
                    <Icon className={`gym-home-wrap-title-icon`} type="xiaoxi"  />
                    <span className={`gym-home-wrap-title-text`}>我的消息</span>
                    {/* Todo 下个版本添加刷新按钮*/}
                    {/*<span className={`gym-home-wrap-title-refresh`} title={`刷新`}>*/}
                        {/*<Icon type="shuaxin"  />*/}
                    {/*</span>*/}
                </div>
                <div className={`gym-home-message-content`}>
                            <Scrollbars
                                className={'gym-home-message-content-main'}
                                autoHide={true}
                                universal={true}
                                autoHeight={true}
                                autoHeightMin={365}
                                autoHeightMax={365}
                            >
                                {
                                    myTodoMessageList.length > 0
                                        ?(myTodoMessageList).map((item:any) =>
                                            <Link to={`${Routes.账号消息详情.link}/${CommonUtils.stringify({id: item.id})}`} key={item.id}>
                                                <div className={`gym-home-message-content-main-item ${item.readFlag === 0 ? 'gym-home-message-content-main-item-un' : ''}`}  >
                                                    <div className={`gym-home-message-content-main-item-flag ${item.readFlag === 0 ? 'gym-home-message-content-main-item-flag-un' : ''}`}>
                                                        {item.readFlag === 0 ? '●':''}
                                                    </div>
                                                    <div className={'gym-home-message-content-main-item-time'}>
                                                        {moment(item.validDateBegin).format("YYYY-MM-DD")}
                                                    </div>
                                                    <div className='gym-home-message-content-main-item-title' title={item.title}>
                                                        {item.title}
                                                    </div>
                                                </div>
                                            </Link>

                                        )
                                        :
                                        <div className={`gym-home-message-content-soon`}>
                                            <div className={`gym-home-message-content-soon-img`}>
                                                <img src={require('../../../../images/no_message.png')} alt=""/>
                                            </div>
                                            <p className={`gym-home-message-content-soon-p1`}>确认过眼神，您还没有相关的信息</p>
                                            <p className={`gym-home-message-content-soon-p2`}>可以去看看其它的</p>
                                        </div>
                                }
                            </Scrollbars>
                    <div className={''}>
                        <div className='gym-home-message-content-main-item-more' onClick={() => history.push(Routes.账号消息列表.path)}>查看历史消息</div>
                    </div>
                </div>
            </div>
        )
    }
}

export {MyMessage}