/**
 * desc: 模版头部组件
 * User: Renjian.Tang/renjian.tang@gymboglobal.com
 * Date: 2018/8/3
 * Time: 上午11:01
 */

import React from 'react';
import {Dropdown, Menu, Popover, Modal, Divider, Collapse} from 'antd';
import {Link} from "react-router-dom";
import {User} from "../../../common/beans/user";
import {logout as logoutAction} from "../../../redux-actions/userActions";
import {Icon} from "../../component/icon";
import {connect} from "../../component/decorator/connect";
import {getEmitNews, getNoticeList, readNotice} from "../../../redux-actions/homeActions";
// import {selectVersionInfo} from "../../../saga/selectors/version";
import {selectUserInfo, selectUserPermission} from "../../../saga/selectors/user";
import {selectHeadApps} from "../../../saga/selectors/home";
import {getSyncCode} from "../../../redux-actions/userActions";
import moment from 'moment';
import {Routes} from "../../../common/enum/routes";
// import {fetchVersionList} from "../../../redux-actions/homeActions";

const Panel = Collapse.Panel;

@connect((state:any) => ({
    // versionInfo:selectVersionInfo(state),
    permission: selectUserPermission(state),
    employeeInfo: selectUserInfo(state),
    headApps: selectHeadApps(state)
}), {
    getNoticeList,
    // fetchVersionList
})
class Header extends React.Component<any, any>{
    // private DEFAULT_COLLAPSE_KEYS = 0;
    state = {
        visible: false,
        // collapseIndex: `collapse_${this.DEFAULT_COLLAPSE_KEYS}`,
        newsList: [],
        newsIndex: 0,
        newsVisible: false
    };
    componentDidMount(){
        getEmitNews().then(res => {
            this.setState({
                newsList: res,
                newsVisible: !!res.length,
            })
        })
        // this.props.fetchVersionList()
    }
    /**
     * 退出
     */
    logout = () => {
        logoutAction();
    }
    // /**
    //  * 打开版本故事
    //  */
    // showVersionStroy = () => {
    //     this.setState({visible: true})
    // }

    // /**
    //  * 切换版本故事
    //  * @param key
    //  */
    // changeCollapse = (key:any) => {
    //     this.setState({collapseIndex: key})
    // }
    /**
     * 关闭信息
     */
    closeModal = () => {
        const {newsList, newsIndex} = this.state;
        const id = newsList[newsIndex].id;
        readNotice(id).then(() => {
            this.props.getNoticeList();
        });
        if(newsList[newsIndex + 1]){
            this.setState(preState => ({newsIndex: preState.newsIndex + 1}))
        }else{
            this.setState({newsVisible: false})
        }
    }
    /**
     * 关闭信息
     */
    closeVersionStory = () => {
        this.setState({newsVisible: false})
    }
    /**
     * 登陆Touch页面
     */
    handleTouch = (returnUrl:string) => {
        getSyncCode((res:any) => {
            if(process.env.NODE_ENV === 'production'){
                window.location.href = `${returnUrl}?code=${res.code}`
            }else{
                window.location.href = `http://localhost:5011?code=${res.code}`
            }
        });
    }
    menu = (
        <Menu className={`gym-layout-header-nav-person-menu`}>
            <Menu.Item className={`gym-layout-header-nav-person-menu-item`}>
                <Link to={Routes.个人中心.path}>个人中心</Link>
            </Menu.Item>
            <Menu.Item className={`gym-layout-header-nav-person-menu-item`} onClick={this.logout}>
                <span>退出</span>
            </Menu.Item>
        </Menu>
    );
    render(){
        const {versionInfo, employeeInfo, headApps} = this.props;
        const {visible, newsList, newsIndex, collapseIndex, newsVisible} = this.state;
        return(
            <div id={'gym-layout-header'} className={`gym-layout-header`}>
                {/*<Modal*/}
                    {/*className={`gym-layout-header-version`}*/}
                    {/*visible={visible}*/}
                    {/*onCancel={this.closeVersionStory}*/}
                    {/*centered={true}*/}
                    {/*closable={false}*/}
                    {/*title={(*/}
                        {/*<div className={`gym-layout-header-version-box`}>*/}
                            {/*<div className={`gym-layout-header-version-title`}>*/}
                                {/*<img*/}
                                    {/*className={`gym-layout-header-version-title-icon`}*/}
                                    {/*src={require('../../../images/login/login_form_title.png')}*/}
                                    {/*alt=""*/}
                                {/*/>*/}
                                {/*<span className={`gym-layout-header-version-title-text`}>版本故事</span>*/}
                            {/*</div>*/}
                            {/*<Icon onClick={() => this.setState({visible:false})} className={`gym-layout-header-version-close`} type={`guanbi`}/>*/}
                        {/*</div>   */}
                    {/*)}*/}
                    {/*footer={false}*/}
                {/*>*/}
                    {/*<div>*/}
                        {/*<span>当前版本：</span><span>{versionInfo.version}</span>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                        {/*<span>上线时间：</span><span>{moment(versionInfo.version_date).format('YYYY-MM-DD')}</span>*/}
                    {/*</div>*/}
                    {/*<Divider/>*/}
                    {/*<Collapse*/}
                        {/*accordion={true}*/}
                        {/*defaultActiveKey={[`collapse_${this.DEFAULT_COLLAPSE_KEYS}`]}*/}
                        {/*bordered={false}*/}
                        {/*className={`gym-layout-header-version-collapse`}*/}
                        {/*onChange={(key) => this.changeCollapse(key)}*/}
                    {/*>*/}
                        {/*{*/}
                            {/*(versionInfo.versionList || []).map((item:any, index:number) =>(*/}
                                {/*<Panel*/}
                                    {/*header={*/}
                                        {/*<div>*/}
                                            {/*<Icon*/}
                                                {/*className={`gym-layout-header-version-collapse-icon ${collapseIndex === `collapse_${index}` ? 'active' : ''}`}*/}
                                                {/*type={collapseIndex === `collapse_${index}` ? 'zhankai' : 'zhedie'}*/}
                                            {/*/>*/}
                                            {/*<span className={`gym-layout-header-version-desc-version`}>{item.version}</span>*/}
                                            {/*<span className={`gym-layout-header-version-desc-version-date`}>*/}
                                                {/*{moment(item.versionDate).format('YYYY-MM-DD')}*/}
                                            {/*</span>*/}
                                        {/*</div>*/}
                                    {/*}*/}
                                    {/*key={`collapse_${index}`}*/}
                                    {/*showArrow={false}*/}
                                    {/*className={`gym-layout-header-version-desc-content`}*/}
                                {/*>*/}
                                    {/*<div className={`gym-layout-header-version-desc-content-div`} dangerouslySetInnerHTML={{__html: item.story}}/>*/}
                                {/*</Panel>*/}
                            {/*))*/}
                        {/*}*/}
                    {/*</Collapse>*/}
                {/*</Modal>*/}
                <Modal
                    className='gym-layout-header-version'
                    visible={newsVisible}
                    onCancel={this.closeVersionStory}
                    centered={true}
                    closable={false}
                    maskClosable={false}
                    title={
                        <div className='gym-layout-header-version-box'>
                            <div className={`gym-layout-header-version-title`}>
                                <img
                                    className={`gym-layout-header-version-title-icon`}
                                    src={require('../../../images/login/login_form_title.png')}
                                    alt=""
                                />
                                <span className='gym-layout-header-version-title-text'>最新消息</span>
                            </div>
                        </div>
                        }
                    footer={false}
                >
                    <div className='fontW f18'>
                        <span className='mr10'>{moment((newsList[newsIndex] || {}).validDateBegin).format("YYYY-MM-DD")}</span>
                        <span>{(newsList[newsIndex] || {}).title}</span>
                    </div>
                    <Divider/>
                    <div className='gym-layout-header-version-content'  dangerouslySetInnerHTML={{__html: (newsList[newsIndex] || {}).text}}/>
                    <div className='text-c'>
                        <button className='gym-layout-header-version-box-button' onClick={this.closeModal}>我知道了</button>
                    </div>
                </Modal>
                <div className={'gym-wrapper gym-clearfix'}>
                    <Link className={'gym-layout-header-logo'} to={Routes.首页.path}>
                        <img className={`gym-layout-header-logo-img`} src={require('../../../images/home-logo.png')} alt=""/>
                    </Link>
                    <div className={'gym-layout-header-nav'}>
                        {/*{*/}
                            {/*// Todo 菜单权限定义*/}
                            {/*permissionList.includes('TOUCH_MGR') &&*/}
                            {/*<Popover placement="bottom"content={<span>进入综合后台</span>}>*/}
                                {/*<div className={`gym-layout-header-nav-icon-box`} onClick={this.handleTouch}>*/}
                                    {/*<Icon type="guanliyuan" className={`gym-layout-header-nav-icon`}/>*/}
                                {/*</div>*/}
                            {/*</Popover>*/}
                        {/*}*/}
                        {
                            headApps.map((item:any, index:number) =>
                                <Popover placement="bottom"content={<span>{item.name}</span>} key={`head_app_${index}`}>
                                    <div className={`gym-layout-header-nav-icon-box`} onClick={() => this.handleTouch(item.returnUrl)}>
                                        <Icon type={item.icon ? item.icon.replace(/icon-/, ''):''} className={`gym-layout-header-nav-icon`}/>
                                    </div>
                                </Popover>
                            )
                        }
                        {/*<Popover placement="bottom"content={<span>版本故事</span>}>*/}
                            {/*<div className={`gym-layout-header-nav-icon-box`} onClick={this.showVersionStroy}>*/}
                                {/*<Icon type="banbengushi" className={`gym-layout-header-nav-icon`}/>*/}
                            {/*</div>*/}
                        {/*</Popover>*/}

                        <Dropdown trigger={['click']} overlay={this.menu}>
                            <div className={`gym-layout-header-nav-person`}>
                                {
                                    employeeInfo.photo
                                        ? <img
                                            className={`gym-layout-header-nav-person-avatar`}
                                            src={`${location.protocol}//${location.host}/home/basic/file/${employeeInfo.photo}/fileView`}
                                        />
                                        : User.sex === 1
                                        ?   <img className={`gym-layout-header-nav-person-avatar`} src={require(`../../../images/male.png`)} alt=""/>
                                        : User.sex === 0
                                        ?<img className={`gym-layout-header-nav-person-avatar`} src={require(`../../../images/famale.png`)} alt=""/>
                                        : <img className={`gym-layout-header-nav-person-avatar`} src={require(`../../../images/avatar.png`)} alt=""/>
                                }
                                <span>
                                    {`${User.enName}${User.chineseName}`}
                                </span>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
        )
    }
}

export {Header}
