import React, { Component, Fragment } from 'react';
import { Card, Button, Table, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../../components/LinkButton'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api';
import UserFrom from './UserFrom';
import moment from 'moment';
const { confirm } = Modal;
export default class User extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        isShow: false, //是否显示对话框
        users: [], //所有用户列表
        roles: [], //所有角色列表
    }

    //模态框确定回调
    handleOk = async () => {
        this.setState({
            isShow: false
        })
        //拿到UseFrom的ref
        const userRef = this.myRef.current.getUserFrom();
        //拿到userFrom数据
        const userData = userRef.current.getFieldsValue();
        console.log(userData);
        if (this.user && this.user._id) userData._id = this.user._id;
        //重置表单
        userRef.current.resetFields();
        //发送添加的请求
        const result = await reqAddOrUpdateUser(userData);
        console.log(result);
        //更新列表的显示
        if (result.status === 0) {
            message.success((this.user ? '修改' : '添加') + '用户成功');
            this.getUsers();
        } else {
            message.error(result.msg);
        }
    };

    //获取所有用户信息
    getUsers = async () => {
        const result = await reqUsers();
        if (result.status === 0) {
            const { users, roles } = result.data;
            this.initRoleNames(roles);
            this.setState({
                users,
                roles
            })
        }
    }

    //根据role的数组，生成包含所有角色名的对象(属性名用角色的id值)
    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre;
        }, {})
        //保存
        this.roleNames = roleNames;
    }

    //传递给userFrom拿到数据
    showConfirm = (user) => {
        confirm({
            title: `确定要删除${user.username}吗？`,
            icon: <ExclamationCircleOutlined />,
            onOk: async () => {
                const result = await reqDeleteUser(user._id);
                console.log(result);
                if (result.status === 0) {
                    message.success("删除用户成功");
                    this.getUsers();
                } else {
                    message.error("删除用户失败")
                }
            }
        });
    }

    //显示修改页面
    showUpdate = (user) => {
        this.user = user;
        this.setState({
            isShow: true
        })
    }

    //点击创建用户回调函数
    createUser = () => {
        console.log('aaa');
        this.user = null;
        this.setState({
            isShow: true
        })
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const title = <Button type="primary" onClick={this.createUser}>创建用户</Button>
        // 每一行的标题
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: (create_time) => {
                    return moment(create_time).format('YYYY-MM-DD-H:m:s')
                }
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                // render: (role_id) => this.state.roles.find(role => role._id === role_id).name
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: '操作',
                dataIndex: '',
                render: (user) => (
                    <Fragment>
                        <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.showConfirm(user)}>删除</LinkButton>
                    </Fragment>
                )
            }
        ];
        const { isShow, users, roles } = this.state;
        const user = this.user || {};
        return (
            <Card title={title} >
                <Table
                    bordered
                    rowKey="username"
                    dataSource={users}
                    columns={columns}
                    pagination={{ defaultPageSize: 3 }}
                />
                <Modal
                    title={user._id ? '修改用户' : '添加用户'}
                    visible={isShow}
                    onOk={this.handleOk}
                    onCancel={() => { this.setState({ isShow: false }) }}
                >
                    <UserFrom
                        ref={this.myRef}
                        roles={roles}
                        user={user}
                    />
                </Modal>
            </Card >
        )
    }
}
