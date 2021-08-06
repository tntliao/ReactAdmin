import React, { Component, Fragment } from 'react'
import { Card, Button, Table, message, Modal } from 'antd';
import { PlusOutlined, ArrowRightOutlined, } from '@ant-design/icons';
import LinkButton from '../../components/LinkButton';
import { reqGetCategory, reqUpdateCategory, reqAddCategory } from '../../api/index';
import AddFrom from './AddFrom'
import UpdataFrom from './UpdataFrom';
export default class Category extends Component {

    state = {
        isLoding: false, //是否正在获取数据
        dataSource: [], //一级分类列表数据
        subCategorys: [], // 二级分类列表数据
        parentId: 0, //当前需要显示的分类列表的父分类ID
        parentName: '', //当前需要显示的分类列表的父分类名称
        showStatus: 0, //标识添加/更新的确认框是否显示，0都不显示,1显示添加,2显示更新
        updataFromData: '',//UpdataFrom传过来的值
        addFromData: '' //FromData传过来的值
    }
    // 组件挂载前 render之前
    UNSAFE_componentWillMount() {
        //table的信息
        this.tableInfo();
    }
    //组件挂载后 redner之后
    componentDidMount() {
        this.GetCategory();
    }
    // table的信息
    tableInfo = () => {
        // table
        this.columns = [
            {
                title: '分类的名字',
                dataIndex: 'name'
            },
            {
                title: '操作',
                width: 300,
                render: (category) => (
                    <Fragment>
                        <LinkButton onClick={() => this.showUpdateCategory(category)}>修改分类</LinkButton>
                        {this.state.parentId === 0 ? <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}
                    </Fragment>
                )
            }
        ];
    }
    //获取一级或某个二级分类列表
    GetCategory = async () => {
        this.setState({ isLoding: true });
        const { parentId } = this.state;
        const result = await reqGetCategory(parentId);
        this.setState({ isLoding: false });
        if (result.status === 0) {
            if (parentId === 0) {
                this.setState({ dataSource: result.data })
            } else {
                this.setState({ subCategorys: result.data })
            }
        } else {
            message.error('获取列表信息错误')
        }
    }
    //访问二级菜单
    showSubCategorys = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            this.GetCategory();
        })
    }
    //回到一级菜单
    goBackParent = () => {
        this.setState({
            subCategorys: [],
            parentId: 0,
            parentName: ''
        })
        this.GetCategory();
    }

    //隐藏对话框
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }
    //显示添加分类
    addCategory = async () => {
        const { parentId, addFromData: { selectId, inputValue, addFromRef } } = this.state;
        if (inputValue) {
            this.setState({
                showStatus: 0
            })
            addFromRef.current.resetFields()
            const result = await reqAddCategory(selectId, inputValue);
            if (result.status === 0) {
                //添加分类和当前的分类一样才重新获取数据
                if (parentId === selectId) {
                    console.log('刷新');
                    this.GetCategory();
                } else {
                    console.log('不刷新');
                }
            }
        } else {
            message.warning('分类名称不能为空')
        }
    }
    //显示更分类
    updataCategory = async () => {
        const parentId = this.category._id;
        const { updataFromData } = this.state
        if (updataFromData.trim()) {
            //1.关闭对话框
            this.setState({
                showStatus: 0
            })
            this.updateFromRef.current.resetFields();
            //2.修改数据
            const result = await reqUpdateCategory(parentId, updataFromData);
            if (result.status === 0) {
                //3.重新请求一次数据渲染
                this.GetCategory();
            }
        } else {
            message.warning('分类名称不能为空')
        }
    }
    //点击添加按钮显示对话框
    showAddCategory = () => {
        this.setState({
            showStatus: 1
        })
    }
    //点击修改分类显示对话框
    showUpdateCategory = (category) => {
        this.category = category || {};
        this.setState({
            showStatus: 2
        })
    }
    //获取UpdataFrom输入的值
    getUpdateFrom = (updataFromData, updateFromRef) => {
        this.setState({
            updataFromData,
        })
        this.updateFromRef = updateFromRef;
    }
    getAddFrom = (addFromData) => {
        console.log(addFromData);
        this.setState({
            addFromData
        })
    }
    render() {
        const { isLoding, dataSource, parentId, subCategorys, parentName, showStatus } = this.state;
        const category = this.category || { name: 'default' };
        const title = parentId === 0 ? <LinkButton style={{ color: 'rgba(0, 0, 0, 0.85)' }}>一级分类列表</LinkButton> : (
            <Fragment>
                <LinkButton onClick={this.goBackParent} style={{ color: 'rgba(0, 0, 0, 0.85)' }}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ margin: "0 10px" }} />
                {parentName}
            </Fragment>
        )
        const extra = (
            <Button type="primary" onClick={this.showAddCategory}>
                <PlusOutlined />
                添加
            </Button>
        )
        return (
            <Fragment>
                <Card title={title} extra={extra} loading={isLoding}>
                    <Table
                        dataSource={parentId === 0 ? dataSource : subCategorys}
                        columns={this.columns}
                        bordered rowKey='_id'
                        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                    />
                </Card>
                <Modal title="添加分类"
                    visible={showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}>
                    <AddFrom
                        dataSource={dataSource}
                        parentId={parentId}
                        getAddFrom={this.getAddFrom}
                    />
                </Modal>
                <Modal title="修改分类"
                    visible={showStatus === 2}
                    onOk={this.updataCategory}
                    onCancel={this.handleCancel}>
                    <UpdataFrom
                        categoryName={category.name}
                        getUpdateFrom={this.getUpdateFrom}
                    />
                </Modal>
            </Fragment >
        )
    }
}
