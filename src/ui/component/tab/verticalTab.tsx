/**
 * desc: 跳转系统tab
 * User: colin.lu
 * Date: 2018/8/14
 * Time: 上午9:30
 */
import React from 'react';
import {Tabs as AntSwitchSystemTabs, Row, Col} from 'antd';
import './verticalTab.scss';

const TabPane = AntSwitchSystemTabs.TabPane;

class VerticalTabs extends React.Component<any, any>{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className={'ant-switch-system-tabs'}>
                <AntSwitchSystemTabs
                    hideAdd
                    defaultActiveKey="1"
                    tabPosition={'top'}
                >
                    <TabPane tab="我的应用&nbsp;&nbsp;" key="1" className={'gym-vertical-tab'}>
                        <Row gutter={24} className={'gym-tab-content'}>
                            <Col span={24}>
                                <Col span={4}>
                                    <img src={''} />
                                </Col>
                                <Col span={5}>
                                    <span>
                                        AO系统
                                    </span>
                                </Col>
                                <Col span={13}>
                                    <span>
                                        <p>
                                            ewiofhiweifhioewiohfhewgfuoewhofwefweewfffffffffffffffffffffffffffffffffffff
                                        </p>
                                        <p>
                                            fuhewfhoewhfoewhfhweiofhofhiw
                                        </p>
                                    </span>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={4}>
                                    <img src={''} />
                                </Col>
                                <Col span={5}>
                                    <span>
                                        AO系统
                                    </span>
                                </Col>
                                <Col span={13}>
                                    <span>
                                        <p>
                                            ewiofhiweifhioewiohfhewgfuoewhofwefweewfffffffffffffffffffffffffffffffffffff
                                        </p>
                                        <p>
                                            fuhewfhoewhfoewhfhweiofhofhiw
                                        </p>
                                    </span>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={4}>
                                    <img src={''} />
                                </Col>
                                <Col span={5}>
                                    <span>
                                        AO系统
                                    </span>
                                </Col>
                                <Col span={13}>
                                    <span>
                                        <p>
                                            ewiofhiweifhioewiohfhewgfuoewhofwefweewfffffffffffffffffffffffffffffffffffff
                                        </p>
                                        <p>
                                            fuhewfhoewhfoewhfhweiofhofhiw
                                        </p>
                                    </span>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={4}>
                                    <img src={''} />
                                </Col>
                                <Col span={5}>
                                    <span>
                                        AO系统
                                    </span>
                                </Col>
                                <Col span={13}>
                                    <span>
                                        <p>
                                            ewiofhiweifhioewiohfhewgfuoewhofwefweewfffffffffffffffffffffffffffffffffffff
                                        </p>
                                        <p>
                                            fuhewfhoewhfoewhfhweiofhofhiw
                                        </p>
                                    </span>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={4}>
                                    <img src={''} />
                                </Col>
                                <Col span={5}>
                                    <span>
                                        AO系统
                                    </span>
                                </Col>
                                <Col span={13}>
                                    <span>
                                        <p>
                                            ewiofhiweifhioewiohfhewgfuoewhofwefweewfffffffffffffffffffffffffffffffffffff
                                        </p>
                                        <p>
                                            fuhewfhoewhfoewhfhweiofhofhiw
                                        </p>
                                    </span>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={4}>
                                    <img src={''} />
                                </Col>
                                <Col span={5}>
                                    <span>
                                        AO系统
                                    </span>
                                </Col>
                                <Col span={13}>
                                    <span>
                                        <p>
                                            ewiofhiweifhioewiohfhewgfuoewhofwefweewfffffffffffffffffffffffffffffffffffff
                                        </p>
                                        <p>
                                            fuhewfhoewhfoewhfhweiofhofhiw
                                        </p>
                                    </span>
                                </Col>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="我的办公&nbsp;&nbsp;" key="2">
                        <div>
                            <Col span={24}>
                                <Col span={4}>
                                    <img src={''} />
                                </Col>
                                <Col span={5}>
                                    <span>
                                        AO系统
                                    </span>
                                </Col>
                                <Col span={13}>
                                    <span>
                                        <p>
                                            ewiofhiweifhioewiohfhewgfuoewhofwefweewfffffffffffffffffffffffffffffffffffff
                                        </p>
                                        <p>
                                            fuhewfhoewhfoewhfhweiofhofhiw
                                        </p>
                                    </span>
                                </Col>
                            </Col>
                        </div>
                    </TabPane>
                </AntSwitchSystemTabs>
            </div>
        )
    }
}


export {VerticalTabs}

