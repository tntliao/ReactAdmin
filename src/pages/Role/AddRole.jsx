import React, { Component } from 'react';
import { Form, Input } from 'antd';

export default class AddRole extends Component {
    constructor(props) {
        super(props);
        this.addRole = React.createRef();
    }
    state = {
        roleName: ''
    }
    //设置input输入的内容
    setRoleName = (event) => {
        const roleName = event.target.value
        this.setState({
            roleName
        })
    }
    getRoleName = () => {
        const addRoleObj = {
            roleName: this.state.roleName,
            addRole: this.addRole
        }
        return addRoleObj;
    }
    render() {
        return (
            <div>
                <Form
                    ref={this.addRole}
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        roleName: '', //可以重置
                        // roleName: this.state.roleName //无法重置
                    }}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="角色名称"
                        name="roleName"
                        rules={[
                            {
                                required: true,
                                message: '内容不能为空',
                            },
                            {
                                whitespace: true,
                                message: '内容不能为空',
                            },
                        ]}
                    >

                        <Input onChange={this.setRoleName} autoComplete="off" />
                    </Form.Item>
                </Form>
            </div >
        )
    }
}
