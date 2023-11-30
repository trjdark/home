/* tslint:disable:jsx-no-multiline-js */
/**
 * desc: 账号审批GID 查看
 * User: katarina.yuan
 * Date: 2022/1/13
 * Time: 上午10:00
 */
import React, {Fragment} from 'react';
import {
    Button,
    Form,
    Row,
    Col,
    DatePicker,
    Input,
    Select,
    message,
    Tree,
    TreeSelect
} from "antd";
import moment from 'moment';
import {Routes} from "../../../../common/enum/routes";
import {handleValidate, Validation} from "../../../../common/utils/validate";
import {getStaffInfo, queryPositionInfo} from "../../../../redux-actions/adminOperation";
import {connect} from "../../../../common/decorator/connect";
import {selectStaffInfo} from "../../../../saga/selectors/adminSelectors";
import history from "../../../../router/history";
import {
    applyCenterAccount,
    idNoCheck,
    mobileCheck
} from "../../../../redux-actions/centerIDActions";
import {form} from "../../../../common/decorator/form";
const SelectOption = Select.Option;

const FormItem = Form.Item;
const { TextArea } = Input;
const { TreeNode } = Tree;

declare interface ContentProps {
    form?:any,
    applyForm: any,
    contentDInfo?:any,
    handleSave?: (res:any) => void,
    staffInfo?:any,
    nonEditable?:boolean, // 不可编辑
    centerAccRecordId?:string,
    emailDetail?:boolean, // 管理查看
    cancel?:string,
    status?: string // 申请状态
}

@form()
@connect((state:any) => ({
    staffInfo: selectStaffInfo(state)
}),
         {getStaffInfo})

class ExamineDetailContent extends React.Component<ContentProps, any> {
    private genderOptions = [
        {name: '女', value: 0},
        {name: '男', value: 1}
    ]
    private centerAccRecordOptions = [
        {name: '审批中', value: '20003'},
        {name: '通过', value: '20001'},
        {name: '拒绝', value: '20002'},
        {name: '已撤销', value: '20004'},
    ]
    constructor(props: any) {
        super(props);
        this.state = {
            employeeType: null, // 员工类型
            joinDate: null, // 入职时间
            firstLoginDate: '', // home有效期始于
            positionTypeList: [], // 岗位序列列表
            positionType: '', // 岗位序列
            mdmUnitTreeList: [], // 中心部门
            orgLeader: null,
            orgId: null,
            orgCode: null,
            orgName: null,
            employeeId: null,
            centerList: null, // 可选中心
            unitId: '',
            employeeCode: '',
            positionTypeName: '',
            adCenterRequests:[{index: 0, primaryflag: 1}], // 中心
            // AD账号校验信息
            treeData: [], // 树形选择框
            idType: 1,
            status: '20003',
            num: 0,
        };
    }

    componentDidMount() {
        const {contentDInfo, emailDetail} = this.props;
        this.props.getStaffInfo();
        if (contentDInfo) {
            this.queryPosition(contentDInfo.employeeKind)
            let adCenterRequests
            if(emailDetail){
                adCenterRequests = contentDInfo.empPosResponses
            }else{
                // 给adCenterRequests添加index
                let num = 0
                adCenterRequests = contentDInfo.adCenterRequests.map((item)=>{
                    const item2 = {...item,index: num}
                    num++
                    return item2
                })
                this.setState({num})
            }
            this.setState({
                              joinDate: contentDInfo.joinDate && moment(contentDInfo.joinDate),
                              firstLoginDate: contentDInfo.firstLoginDate && moment(contentDInfo.firstLoginDate),
                              adCenterRequests,
                              status: contentDInfo.status,
                              idType: contentDInfo.idType
                          },()=>{
                // 找出主中心
                const positionTypeObj = this.state.adCenterRequests.filter(item=>{
                    return item.primaryflag === 1
                })
                // 带出主中心岗位
                this.setState({
                                  positionType: positionTypeObj[0]?Number(positionTypeObj[0].positionType):''
                              })

            })
        }else{
            // 默认员工类型为金宝贝中心
            this.queryPosition(6439)
        }
    }
    // 获取员工类型
    queryPosition = (type) => {
        queryPositionInfo({empKind:type, centerAccApplyFlag:!this.props.nonEditable}).then((res:any) => {
            this.setState({
                              positionTypeList: res.positionTypeList,
                              centerList: res.centerList,
                              mdmUnitTreeList: res.mdmUnitTreeList?res.mdmUnitTreeList[0]:'',
                          });
        })
        // 根据不同类型显示
        if (type === 1201 || type === 1209 || type === 1208 || type === 1207 || type === 6441 || type===6444 || type===6445){
            this.props.form.setFieldsValue({
                                               unitId: '',
                                               employeeCode: '',
                                               positionTypeName: ''
                                           })
            this.setState({
                              employeeType: 'HO'
                          })
        }else if(type === 2000){
            this.setState({
                              employeeType: 'other'
                          })
        } else if (type === 1202 || type === 1210 || type === 6439 || type === 6442){
            this.setState({
                              employeeType: 'Center'
                          })
        }
    }
    // 返回
    cancel = () => {
        this.props.cancel==='email'?history.push(Routes.账号管理.path):history.push(Routes.账号申请.path)
    };
    // 获取组织树列表
    setOrg = (values:any,label,extra) => {
        this.props.form.setFieldsValue({orgLeader:''});
        this.setState({
            orgCode: extra.triggerNode.props.eventKey,
            orgName: extra.triggerNode.props.title,
            orgId: extra.triggerNode.props.value,
        });
    };
    // 校验身份证号
    upperCase = () => {
        this.toUpperCase()
        this.props.form.validateFields(['idNo'],(errs,value)=>{
            if(!errs){
                const {idType} = this.state
                idNoCheck({idType, ...value})
            }
        })
    };
    // 改成大写
    toUpperCase = () => {
        this.props.form.setFieldsValue({idNo:`${this.props.form.getFieldsValue().idNo.toUpperCase()}`})
        let fixBlank = this.props.form.getFieldsValue().idNo.replace(/\s*/g,"");
        this.props.form.setFieldsValue({idNo:fixBlank});
    }
    // 校验手机号
    checkPhone = () => {
        this.props.form.validateFields(['mobile'],(errs,value)=>{
            if(!errs){
                mobileCheck(value).then((res:any) => {
                })
            }
        })
    }
    // 改变审批状态时触发
    handleSelectChange =(value) =>{
        this.setState({
            status: value
        })
    }
    // 提交
    handleExamine = () =>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let arr = [];
                for(let key:string in values){
                    if(/_/.test(key) && values[key]){
                        let i = Number(key.substr(0, key.indexOf('_')));
                        let k = key.substr(key.indexOf('_') + 1);
                        let primaryflag = i === 0?1:0
                        arr[i] = Object.assign({}, (arr[i] || {}), {[k]: values[key], primaryflag})
                    }
                }
                for(var i = 0;i<arr.length;i++){
                    if(arr[i]==''||arr[i]==null||typeof(arr[i])==undefined){
                        arr.splice(i,1);
                        i=i-1;
                    }
                }
                values.firstLoginDate = values.firstLoginDate?moment(values.firstLoginDate).valueOf():''
                values.joinDate = values.joinDate?moment(values.joinDate).valueOf():''
                values.adCenterRequests = arr
                applyCenterAccount(values).then(data => {
                    if(this.props.status === '20002' || this.props.status === '20004'){
                        message.success('重新申请账号成功')
                    }else{
                        message.success('新建成功')
                    }
                    history.push(Routes.账号申请.path)
                })
                // if(this.props.centerAccRecordId && this.props.status === '20004'){
                //     values.id = this.props.centerAccRecordId
                //     updateCenterAccRecord(values).then(data => {
                //         message.success('重新申请账号成功')
                //         history.push(Routes.账号申请.path)
                //     })
                // }else{
                //     applyCenterAccount(values).then(data => {
                //         if(this.props.status === '20002'){
                //             message.success('重新申请账号成功')
                //         }else{
                //             message.success('新建成功')
                //         }
                //         history.push(Routes.账号申请.path)
                //     })
                // }
            }
        });
    }
    // 添加一条关联中心
    addCenter = () => {
        this.setState(prev => {
            return {
                adCenterRequests: [...prev.adCenterRequests, {index: prev.num + 1}],
                num: prev.num + 1
            }
        })
    };
    // 删除一条关联中心
    deleteCenter = (record) => {
        const {form} = this.props;
        let key1 = `${record}_unitId`;
        let key2 = `${record}_unitName`;
        let key3 = `${record}_positionType`;
        form.setFieldsValue({
                                [key1]:null,
                                [key2]:null,
                                [key3]:null,
                            })
        this.setState(prevState => {
            return {
                adCenterRequests: prevState.adCenterRequests.filter(item => item.index !== record)
            }
        })
    }
    // 选择中心后带出中心名称
    handleSelectCenter = (value:any,index:any) => {
        const {centerList} = this.state
        const {form} = this.props;
        form.setFieldsValue({unitName:null});
        const selectedCenter = centerList.filter((item:any) => item.unitId === value)[0];
        const name = index +'_unitName'
        form.setFieldsValue({[name]:selectedCenter.unitName});
    }
    // 选择主中心岗位
    handlePositionType = (value, index) => {
        if(index === 0) {
            this.setState({
                              positionType:value
                          })
        }
    }
    // 不允许填总部
    unitIdRules = (rule, value, callback) => {
        if(value === '') {
            callback({message: '请输入部门'})
        }else{
            callback({message: '权限不允许！'})
        }
    }
    // 选择证件类型
    setCardType = (value) => {
        this.setState({
                          idType: value
                      })
    };
    render() {
        // props数据初始化
        const {staffInfo, contentDInfo ={},form, nonEditable, emailDetail}= this.props;
        const {employeeType,firstLoginDate, joinDate, status, adCenterRequests, centerList, positionTypeList, mdmUnitTreeList, unitId, employeeCode, positionTypeName} = this.state;
        const {getFieldDecorator} = form;
        const selectEmployeeType = staffInfo.employeeTypeList
        const idTypeList = staffInfo.idTypeList
        let treeArr = [];
        treeArr.push(mdmUnitTreeList);
        const loop = data =>
            data.map(item => {
                if (item.child) {
                    return (
                        <TreeNode title={item.unitName} key={item.unitId} value={item.unitId}>
                            {loop(item.child)}
                        </TreeNode>
                    );
                }
                return <TreeNode title={item.unitName} key={item.unitId} value={item.unitId}/>;
            });
        return (
                <div className={`gym-search-wrap gym-AD-create`}>
                    <Form  autoComplete="false">
                        <Row>
                            <Col span={8}>
                                <FormItem label={`员工类型:`} className={`gym-employee-add-form-item`}>
                                    {
                                        getFieldDecorator('employeeKind', {
                                            initialValue: contentDInfo.employeeKind?contentDInfo.employeeKind:6439,
                                            rules: [{
                                                required: true,
                                                message:'请选择员工类型'
                                            }],
                                        })(
                                            <Select placeholder={`请选择`} className={`gym-employee-add-select`} disabled={nonEditable} onChange={this.queryPosition}>
                                                {
                                                    (selectEmployeeType || []).map((item: any) => (
                                                        <SelectOption key={item.mdmId} value={item.mdmId}>
                                                            {item.mdmName}
                                                        </SelectOption>
                                                    ))
                                                }
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label={`中文姓名:`} className={`gym-employee-add-form-item`}>
                                    {
                                        getFieldDecorator('fullName', {
                                            rules: [{
                                                required: true, message: "请输入中文姓名",whitespace:true},
                                                {validator:handleValidate[Validation.姓名]}
                                            ],
                                            initialValue: contentDInfo.fullName,
                                        })(
                                            <Input placeholder={`请输入中文姓名`} maxLength={20} disabled={nonEditable}/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label={`英文姓:`} className={`gym-employee-add-form-item`}>
                                    {
                                        getFieldDecorator('lastName', {
                                            initialValue: contentDInfo.lastName,
                                            rules: [
                                                {required: true, message: "请输入英文姓"},
                                                {validator:handleValidate[Validation.英文]}
                                            ]
                                        })(
                                            <Input placeholder={`请输入英文姓`} maxLength={20} disabled={nonEditable}/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label={`英文名:`} className={`gym-employee-add-form-item`}>
                                    {
                                        getFieldDecorator('firstName', {
                                            initialValue: contentDInfo.firstName,
                                            rules: [
                                                {required: true, message: "请输入英文名"},
                                                {validator:handleValidate[Validation.英文]}
                                            ]
                                        })(
                                            <Input placeholder={`请输入英文名`} maxLength={20} disabled={nonEditable}/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label={`证件类型:`} className={`gym-employee-add-form-item`}>
                                    {
                                        getFieldDecorator('idType', {
                                            initialValue: contentDInfo.idType,
                                            rules: [{
                                                required: true, message: "请选择证件类型"
                                            }],
                                        })(
                                            <Select placeholder={`请选择`} className={`gym-employee-add-select`} disabled={nonEditable}  onChange={this.setCardType}>
                                                {
                                                    (idTypeList?idTypeList:[]).map((item: any) => (
                                                        <SelectOption key={item.mdmId} value={item.mdmId}>
                                                            {item.mdmName}
                                                        </SelectOption>
                                                    ))
                                                }
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label={`证件号码:`} className={`gym-employee-add-form-item`}>
                                    {
                                        getFieldDecorator('idNo', {
                                            initialValue: contentDInfo.idNo,
                                            rules: [
                                                {required: true, message: "请输入证件号"},
                                                {validator:this.state.idType === 1?handleValidate[Validation.身份证]:{validator:handleValidate[Validation.英文数字]}},
                                                {min: 6,message:'证件位数最少设置6位'}
                                            ]
                                        })(
                                            <Input placeholder={`证件号码`} maxLength={20} min={6} disabled={nonEditable} onBlur={this.upperCase}/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <FormItem label={`性别:`} className={`gym-employee-add-form-item`}>
                                    {
                                        getFieldDecorator('sex', {
                                            initialValue: contentDInfo.sex,
                                            rules: [
                                                { required: true, message: '请选择性别' },
                                            ],
                                        })(
                                            <Select className={`gym-employee-add-select`} disabled={nonEditable}>
                                                {
                                                    (this.genderOptions || []).map((item: any) => (
                                                        <SelectOption key={item.value} value={item.value}>
                                                            {item.name}
                                                        </SelectOption>
                                                    ))
                                                }
                                            </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label={`手机号:`} className={`gym-employee-add-form-item`}>
                                    {
                                        getFieldDecorator('mobile', {
                                            initialValue: contentDInfo.mobile,
                                            rules: [
                                                {required: true, message:'请输入手机号'},
                                                {validator:handleValidate[Validation.手机号]}
                                            ],
                                        })(
                                            <Input placeholder={`请输入联系电话`} disabled={nonEditable} onBlur={this.checkPhone}/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                        </Row>
                        <div className={`gym-employee-title`}>
                            工作信息
                        </div>
                        {
                            employeeType === 'HO' &&
                            <div>
                                <Row>
                                    <Col span={16}>
                                        <FormItem label={`部门:`} className={`gym-employee-add-form-item`}>
                                            {
                                                getFieldDecorator('unitId', {
                                                    initialValue: unitId,
                                                    rules:[{
                                                        validator: this.unitIdRules,
                                                        required: true
                                                    }]
                                                })
                                                (
                                                    <TreeSelect
                                                        showSearch={true}
                                                        style={{ width: 570 }}
                                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                                        placeholder="请选择"
                                                        onChange={this.setOrg}
                                                        treeNodeFilterProp="title"
                                                        disabled={nonEditable}
                                                    >
                                                        {loop(treeArr||[])}
                                                    </TreeSelect>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label={`工号:`} className={`gym-employee-add-form-item`}>
                                            {
                                                getFieldDecorator('employeeCode', {
                                                    initialValue: employeeCode,
                                                })(
                                                    <Input placeholder={`请输入工号`}  maxLength={20} disabled={nonEditable}/>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <FormItem label={`岗位序列:`} className={`gym-employee-add-form-item`}>
                                            {
                                                getFieldDecorator('positionTypeName', {
                                                    initialValue: positionTypeName,
                                                    rules: [{
                                                        required: true, message: "请选择岗位序列"
                                                    }],
                                                })(
                                                    <Select className={`gym-employee-add-select`} disabled={nonEditable}>
                                                        {
                                                            (positionTypeList || []).map((item: any) => (
                                                                <SelectOption key={item.id} value={item.value}>
                                                                    {item.name}
                                                                </SelectOption>
                                                            ))
                                                        }
                                                    </Select>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <FormItem label={`员工入职日期:`} className={`gym-employee-add-form-item`}>
                                            {
                                                getFieldDecorator('joinDate', {
                                                    initialValue: joinDate?joinDate:(nonEditable?'':moment()),
                                                    rules:[{
                                                        required: true, message: "请选择日期"
                                                    }]
                                                })(
                                                    <DatePicker  disabled={nonEditable}/>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        }
                        {
                            employeeType === 'Center' &&
                            <div>
                                <Button
                                    className={`gym-button-create mt20`}
                                    onClick={this.addCenter}
                                    disabled={nonEditable}
                                >
                                    添加
                                </Button>
                                {
                                    adCenterRequests.map((item) =>{
                                        return (
                                            <Row key={`${item.index}_centerForm`}>
                                                <Col span={7}>
                                                    <FormItem label={(item.primaryflag === 1) || (item === 0) || (item.isPrimary === 1)?'主中心号':`关联中心`} className={`gym-employee-add-form-item`}>
                                                        {
                                                            getFieldDecorator(`${item.index}_unitId`, {
                                                                rules: [{
                                                                    required: true, message: '请选择中心号'
                                                                }],
                                                                initialValue: item.unitId
                                                            })(
                                                                <Select
                                                                    className={`gym-employee-add-select`}
                                                                    onChange={value => this.handleSelectCenter(value, item.index)}
                                                                    showSearch={true}
                                                                    disabled={nonEditable}
                                                                    filterOption={(input, option:any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                                >
                                                                    {
                                                                        (centerList || []).map((item2: any,index) => (
                                                                            <SelectOption key={item2.unitCode} value={item2.unitId} title={item2.unitName}>
                                                                                {item2.unitCode}
                                                                            </SelectOption>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            )
                                                        }
                                                    </FormItem>
                                                </Col>
                                                <Col span={7}>
                                                    <FormItem label={`中心名称`} className={`gym-employee-add-form-item`}>
                                                        {
                                                            getFieldDecorator(`${item.index}_unitName`, {
                                                                initialValue: item.unitName
                                                            })(
                                                                <Input disabled={true} />
                                                            )
                                                        }
                                                    </FormItem>
                                                </Col>
                                                <Col span={7}>
                                                    <FormItem label={`岗位`} className={`gym-employee-add-form-item`}>
                                                        {
                                                            getFieldDecorator(`${item.index}_positionType`, {
                                                                rules: [{
                                                                    required: true, message: '请选择岗位'
                                                                }],
                                                                initialValue: item.positionType?Number(item.positionType):this.state.positionType
                                                            })(
                                                                <Select
                                                                    className={`gym-employee-add-select`}
                                                                    showSearch={true}
                                                                    disabled={nonEditable}
                                                                    onChange={value => this.handlePositionType(value, item.index)}
                                                                    filterOption={(input, option:any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                                >
                                                                    {
                                                                        (positionTypeList || []).map((item2: any) => (
                                                                            <SelectOption key={item2.id} value={item2.value}>
                                                                                {item2.name}
                                                                            </SelectOption>
                                                                        ))
                                                                    }
                                                                </Select>
                                                            )
                                                        }
                                                    </FormItem>


                                                </Col>
                                                {/*删除*/}
                                                <Col  span={3}>
                                                    {
                                                        (item.primaryflag !== 1 && item !== 0) && !nonEditable &&
                                                        <FormItem>
                                                            <span className={`delete-btn`} style={{color:'#EF7421',cursor:'pointer'}} onClick={() =>this.deleteCenter(item.index)}>删除</span>
                                                        </FormItem>
                                                    }
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                                <Row>
                                    <Col span={8}>
                                        <FormItem label={`员工入职日期:`} className={`gym-employee-add-form-item`}>
                                            {
                                                getFieldDecorator('joinDate', {
                                                    initialValue: joinDate?joinDate:(nonEditable?'':moment()),
                                                    rules:[{
                                                        required: true, message: "请选择入职日期"
                                                    }]
                                                })(
                                                    <DatePicker disabled={nonEditable}/>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        }
                        {
                            employeeType === 'other' &&
                            <div>
                                <Row>
                                    <Col span={8}>
                                        <FormItem label={`Country:`} className={`gym-employee-add-form-item`}>
                                            {
                                                getFieldDecorator('country', {
                                                    initialValue: contentDInfo.country,
                                                    rules: [{
                                                        required: true, message:'请输入国家'
                                                    }],
                                                })(
                                                    <Input placeholder={`请输入`} maxLength={100} disabled={nonEditable}/>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label={`State:`} className={`gym-employee-add-form-item`}>
                                            {
                                                getFieldDecorator('state', {
                                                    initialValue: contentDInfo.state,
                                                    rules: [{
                                                        required: true, message:'请输入所属州'
                                                    }],
                                                })(
                                                    <Input placeholder={`请输入`} maxLength={100} disabled={nonEditable}/>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                    <Col span={8}>
                                        <FormItem label={`Location:`} className={`gym-employee-add-form-item`}>
                                            {
                                                getFieldDecorator('location', {
                                                    rules: [{
                                                        required: true, message:'请输入地址'
                                                    }],
                                                    initialValue: contentDInfo.location
                                                })(
                                                    <Input placeholder={`请输入`} disabled={nonEditable}/>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        }
                        {/* GymboID信息 */}
                        <div className={`gym-employee-title`}>
                            Gymbo ID信息
                        </div>
                        { employeeType &&
                        <div>
                            <Row>
                                <Col span={8}>
                                    <FormItem label={`员工卡号:`} className={`gym-employee-add-form-item`}>
                                        {
                                            getFieldDecorator('cardNumber', {
                                                initialValue: contentDInfo.cardNumber,
                                                rules: [{
                                                }],
                                            })(
                                                <Input placeholder={`请输入卡号`} maxLength={20} disabled={nonEditable}/>
                                            )
                                        }
                                    </FormItem>
                                </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <FormItem  label={`Home登陆有效期始于:`} className={`gym-employee-add-form-item`}>
                                            {
                                                getFieldDecorator('firstLoginDate', {
                                                    initialValue:  firstLoginDate?firstLoginDate:(nonEditable?'':moment()),
                                                    rules: [
                                                        {required: true,message: '请选择日期'}
                                                    ],
                                                })(
                                                    <DatePicker disabled={nonEditable}/>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <FormItem  label={`备注:`} className={`gym-employee-add-form-item gym-employee-add-form-note`}>
                                            {
                                                getFieldDecorator('remark', {
                                                    initialValue: contentDInfo.remark,
                                                })(
                                                    <TextArea rows={3} maxLength={500} style={{width:'600px'}} placeholder={`请输入内容`} disabled={nonEditable}/>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                            </div>
                        }
                        {
                            nonEditable && !emailDetail &&
                            <Fragment>
                                <div className={`gym-employee-title`}>
                                    账号审批
                                </div>
                                <Row>
                                    <Col span={8}>
                                        <FormItem label={`审批状态:`} className={`gym-employee-add-form-item`}>
                                            {
                                                getFieldDecorator('status', {
                                                    initialValue: contentDInfo.status,
                                                    rules: [
                                                        { required: true, message: '请输入审批状态' },
                                                    ],
                                                })(
                                                    <Select className={`gym-employee-add-select`} onChange={this.handleSelectChange} disabled={nonEditable}>
                                                        {
                                                            (this.centerAccRecordOptions || []).map((item: any) => (
                                                                <SelectOption key={item.value} value={item.value}>
                                                                    {item.name}
                                                                </SelectOption>
                                                            ))
                                                        }
                                                    </Select>
                                                )
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                                {
                                    status === '20002'&&
                                    <Row>
                                        <Col span={24}>
                                            <FormItem  label={`拒绝原因:`} className={`gym-employee-add-form-item gym-employee-add-form-note`}>
                                                {
                                                    getFieldDecorator('refuseCause', {
                                                        initialValue: contentDInfo.refuseCause,
                                                        rules: [
                                                            { required: status === '20002'?true:false, message: '拒绝原因' },
                                                        ],
                                                    })(
                                                        <TextArea rows={3}  maxLength={200} style={{width:'600px'}} placeholder={`请输入内容`} disabled={nonEditable}/>
                                                    )
                                                }
                                            </FormItem>
                                        </Col>
                                    </Row>
                                }
                            </Fragment>
                        }
                        <div>
                            <Row style={{textAlign:'center'}}>
                                <Col span={10}>
                                    {!nonEditable && <Button type="default" onClick={this.handleExamine}>确认</Button>}
                                </Col>
                                <Col span={2}>
                                    <Button type="default" onClick={this.cancel}>返回</Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
        )
    }
}

export {ExamineDetailContent}
