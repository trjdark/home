/**
 * desc: 我的消息tab
 * User: colin.lu
 * Date: 2018/8/14
 * Time: 上午11:07
 */
import React from 'react';
import {Tabs as AntMyTodoListTabs, Row, Col} from 'antd';
import './tab.scss';

declare interface TabsProps {
    data:any
}

const TabPane = AntMyTodoListTabs.TabPane;

class Tabs extends React.Component<TabsProps, any>{
    constructor(props) {
        super(props);

        this.state = {
            source:this.props.data,
            isShowMoreBtn:false
        }
        // this.newTabIndex = 0;
    }

    handleScroll(e){
        let ele=e.target;
        let scrollT=ele?  ele.scrollTop : document.querySelectorAll('#gym-msg-ant-tabs .ant-tabs-content')[0].scrollTop;
        if(scrollT>20){
            this.setState({
                    isShowMoreBtn:true
                }
            )
        }else{
            this.setState({
                    isShowMoreBtn:false
                }
            )
        }

    }
    handleTabChange(e){
       // this.handleScroll(e);
        this.setState({
            isShowMoreBtn:false
        })
    }

    render(){
        return(
            <div className={'ant-tabs'} id={'gym-msg-ant-tabs'} onScroll={this.handleScroll.bind(this)}>
                <AntMyTodoListTabs
                    hideAdd
                    defaultActiveKey="1"
                    tabPosition={'top'} onChange={this.handleTabChange.bind(this)}
                >
                    <TabPane tab={this.state.source.panes[0].title} key={this.state.source.panes[0].key}>
                        <Row gutter={24} className={'gym-tab-content'}>
                            {this.state.source.message.permittedList.map((info,index) =>
                                <Col span={24} key={index}>
                                    <Col span={10}>
                                        <span>
                                            {info.name}
                                        </span>
                                    </Col>
                                    <Col span={10}>
                                        <span>
                                            {info.date}
                                        </span>
                                    </Col>
                                    <Col span={4}>
                                        <span>
                                            {info.sign}
                                        </span>
                                    </Col>
                                </Col>
                            )}
                        </Row>
                    </TabPane>
                    <TabPane tab={this.state.source.panes[1].title} key={this.state.source.panes[1].key}>
                        <Row gutter={24} className={'gym-tab-content'}>
                            {this.state.source.message.sendList.map((info,index) =>
                                <Col span={24} key={index}>
                                    <Col span={10}>
                                        <span>
                                            {info.name}
                                        </span>
                                    </Col>
                                    <Col span={10}>
                                        <span>
                                            {info.date}
                                        </span>
                                    </Col>
                                    <Col span={4}>
                                        <span>
                                            {info.sign}
                                        </span>
                                    </Col>
                                </Col>
                            )}
                        </Row>
                    </TabPane>
                </AntMyTodoListTabs>
                {this.state.isShowMoreBtn &&  (<button className="gym-small-round-btn ">更多</button>)}
            </div>
        )
    }
}


export {Tabs}

