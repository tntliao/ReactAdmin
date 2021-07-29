import React, { Component } from 'react'
import { Form, Select, Input } from 'antd';
const { Option } = Select;
export default class AddFrom extends Component {
    render() {

        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }

        function handleChange(value) {
            console.log(`Selected: ${value}`);
        }
        return (
            <Form>
                <Select defaultValue="a1" onChange={handleChange} style={{ width: '100%' }}>
                    {children}
                </Select>
                <Form.Item
                    style={{ margin: '30px 0 10px' }}
                    name="content"
                    rules={[{ required: true, message: 'Please input your content!' }]}
                >
                    <Input placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        )
    }
}
