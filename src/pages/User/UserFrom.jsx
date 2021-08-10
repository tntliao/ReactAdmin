import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';
import PropTyps from 'prop-types'
const { Option } = Select;

export default class UserFrom extends Component {

    constructor(props) {
        super(props);
        this.userRef = React.createRef();
    }

    static PropTyps = {
        roles: PropTyps.array.isRequired,
        user: PropTyps.object
    }

    getUserFrom = () => {
        return this.userRef;
    }

    componentDidMount() {
        this.userRef.current.resetFields()
    }
    render() {
        const { roles, user } = this.props;
        return (
            <div>
                <Form
                    key={new Date()}
                    ref={this.userRef}
                    name="basic"
                    labelCol={{ span: 4, }}
                    wrapperCol={{ span: 16, }}
                    initialValues={{
                        username: user.username,
                        password: user.password,
                        phone: user.phone,
                        email: user.email,
                        role_id: user.role_id
                    }}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '用户名不能为空',
                            },
                        ]}
                    >
                        <Input placeholder="请输入你的用户名" autoComplete="off" />
                    </Form.Item>

                    {
                        user._id ? null : (
                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '密码不能为空',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="请输入你的密码" />
                            </Form.Item>
                        )
                    }

                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: '手机号不能为空',
                            },
                        ]}
                    >
                        <Input placeholder="请输入你的手机号" autoComplete="off" />
                    </Form.Item>

                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: '邮箱不能为空',
                            },
                        ]}
                    >
                        <Input placeholder="请输入你的邮箱" autoComplete="off" />
                    </Form.Item>

                    <Form.Item
                        label="角色"
                        name="role_id"
                        rules={[
                            {
                                required: true,
                                message: '角色不能为空',
                            },
                        ]}
                    >
                        <Select onChange={this.handleChange}>
                            {roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            </div >
        )
    }
}
