import React, { Component } from 'react';
import { Card, Table, Button, Modal, message } from 'antd';
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api';
import AddRole from './AddRole';
import UpdateRole from './UpdateRole';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils'
export default class Role extends Component {

    constructor(props) {
        super(props);
        this.roleRef = React.createRef();
        this.authRef = React.createRef();
    }

    state = {
        roles: [], //所有的角色信息
        role: {}, //选中的角色信息
        isShowRole: false, //添加角色默认不显示
        isShowAuth: false, //设置权限默认不显示
    }

    //初始化行title
    initColumns = () => {
        this.columns = [
            {
                title: '角色姓名',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
        ];

    }

    //获取角色信息
    getRoles = async () => {
        const result = await reqRoles();
        if (result.status === 0) {
            const roles = result.data;
            this.setState({
                roles
            })
        }
    }

    // 点击行
    onRow = (role) => {
        return {
            onClick: (event) => {
                // console.log(role);
                this.setState({
                    role
                })
            },
        }
    }

    //添加角色点击确定的函数
    handleRole = async () => {
        //获取addRole返回的数据
        const addRoleObj = this.roleRef.current.getRoleName();
        const roleName = addRoleObj.roleName.trim()
        //如果值为空不能通过确定按钮关闭对话框
        if (!roleName) return;
        //关闭对话框
        this.setState({ isShowRole: false })
        //把AddRef的值重置
        this.roleRef.current.setState({ roleName: '' })
        //把输入框重置
        this.addRole = addRoleObj.addRole
        this.addRole.current.resetFields();
        //发送请求
        const result = await reqAddRole(roleName);
        if (result.status === 0) {
            message.success('添加角色成功');
            //重新获取数据 方法1:
            // this.getRoles();

            //方法2:
            const role = result.data;
            /* const roles = this.state.roles;
            roles.push(role);// 直接push React不推荐
            this.setState({
                roles
            }) */

            //React推荐 下面写法是更新状态原本写法,以前的都是简写方式
            /* 
                什么时候用
                    函数式更新状态?
                        基于原本数据的更新就用函数式

                    对象简写方式?
                        不和原数据有任何关联的就是对象形式
             */
            this.setState(state => ({
                roles: [...state.roles, role]
            }))

        } else {
            message.error('添加角色失败');
        }
    };

    //权限对话框点击确定的函数
    handleAuth = async () => {
        const role = this.state.role;
        this.setState({ isShowAuth: false })
        const menus = this.authRef.current.getUpdateRole();
        //把数据更新到这边
        role.menus = menus;
        //请求更新
        const result = await reqUpdateRole(role);
        if (result.status === 0) {
            //更新数据方法1：
            // this.getRoles();
            //如果更新的是自己的权限，强制退出
            if (role._id === memoryUtils.user.role_id) {
                memoryUtils.user = {};
                storageUtils.removeStorage();
                this.props.history.replace('/login');
                message.success('当前用户角色权限修改了，重新登录');
            } else {
                message.success('设置角色权限成功');
            }
            /* this.setState({
                roles: [...this.state.roles]
            }) */
        } else {
            message.error('设置角色权限失败')
        }
    }


    UNSAFE_componentWillMount() {
        this.initColumns();
        this.getRoles();
    }

    render() {
        const { roles, role, isShowRole, isShowAuth } = this.state
        //Card的title
        const title = (
            <div>
                <Button type="primary" onClick={() => this.setState({ isShowRole: true })}>创建角色</Button>&nbsp;&nbsp;
                <Button type="primary" onClick={() => this.setState({ isShowAuth: true })} disabled={!role._id}>设置角色权限</Button>
            </div>
        )

        return (
            <div>
                <Card title={title}>
                    <Table
                        pagination={{ defaultPageSize: 4 }}
                        locale={{ filterReset: true }}
                        bordered
                        rowKey="_id"
                        columns={this.columns}
                        dataSource={roles}
                        rowSelection={{
                            type: "radio",
                            selectedRowKeys: [role._id],
                            onSelect: (role) => {
                                this.setState({ role })
                            }
                        }}
                        onRow={this.onRow}
                    />
                </Card>

                <Modal title="添加角色"
                    visible={isShowRole}
                    onOk={this.handleRole}
                    onCancel={() => { this.setState({ isShowRole: false }) }}
                >
                    <AddRole ref={this.roleRef} />
                </Modal>

                <Modal title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.handleAuth}
                    onCancel={() => { this.setState({ isShowAuth: false }) }}
                >
                    <UpdateRole role={role} ref={this.authRef} />
                </Modal>
            </div>
        )
    }
}
