import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Tree } from 'antd';
import memuList from '../../config/menuConfig'

export default class UpdateRole extends Component {

    static propTypes = {
        role: PropTypes.object
    }

    //初始化那些被勾上
    constructor(props) {
        super(props);
        const { menus } = this.props.role;
        this.state = {
            checkedKeys: menus
        }
    }


    //点击执行
    onCheck = (checkedKeys) => {
        this.setState({
            checkedKeys
        })
    };

    //初始化树形结构
    initTreeData = (memuList) => {
        return memuList.reduce((pre, item) => {
            pre.push({
                title: item.title,
                key: item.key,
                children: item.children ? this.initTreeData(item.children) : ''
            })
            return pre
        }, [])
    }

    // 返回给父组件数据
    getUpdateRole = () => this.state.checkedKeys

    //页面挂载前执行
    UNSAFE_componentWillMount() {
        const treeData = this.initTreeData(memuList);
        this.treeData = [
            {
                title: '平台权限',
                key: 'all',
                children: [
                    ...treeData
                ]
            }
        ]
    }
    //传入新的props执行
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { menus } = nextProps.role;
        this.setState({
            checkedKeys: menus
        })
    }
    render() {
        //根据传入角色的menu生成初始状态
        const { name } = this.props.role;
        const { checkedKeys } = this.state;
        return (
            <div>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        label="角色名称"
                    >
                        <Input disabled value={name} />
                    </Form.Item>
                </Form>

                <Tree
                    checkable
                    defaultExpandAll
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                    treeData={this.treeData}
                />
            </div>
        )
    }
}
