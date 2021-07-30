import React, { Component } from 'react'
import { Form, Select, Input } from 'antd';
import PropsTypes from 'prop-types'
const { Option } = Select;
export default class AddFrom extends Component {

    state = {
        selectId: '',
        inputValue: ''
    }

    static propsTypes = {
        dataSource: PropsTypes.array.isRequired,
        parentId: PropsTypes.string.isRequired,
        getAddFrom: PropsTypes.func.isRequired
    }

    render() {
        const { dataSource, parentId } = this.props
        const sourceList = dataSource.map(item => <Option key={item._id}>{item.name}</Option>)

        const handleChange = (value) => {
            return (event) => {
                if (value === 'select') {
                    this.setState({ selectId: event }, () => {
                        const { selectId, inputValue } = this.state;
                        this.props.getAddFrom({ selectId, inputValue })
                    })
                } else {
                    this.setState({ inputValue: event.target.value }, () => {
                        let { selectId, inputValue } = this.state;
                        if (!selectId) { selectId = parentId }
                        this.props.getAddFrom({ selectId, inputValue })
                    })
                }

            }
        }

        function getDefaultValue(parentId) {
            if (parentId === 0) {
                return '一级分类';
            } else {
                const result = dataSource.filter(item => item._id === parentId);
                return result[0].name;
            }
        }

        return (
            <Form >
                <Select key={getDefaultValue(parentId)} defaultValue={getDefaultValue(parentId)} style={{ width: '100%' }} onChange={handleChange('select')} >
                    <Option key='一级分类'>一级分类</Option>
                    {sourceList}
                </Select>
                <p style={{
                    color: 'black',
                    background: '#ffc107',
                    display: 'inline-block',
                    marginTop: '14px',
                    padding: '8px',
                    borderRadius: '2px'
                }}>
                    内容为上次输入内容</p>
                <Form.Item
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                        {
                            whitespace: true,
                            message: '内容不能为空',
                        }
                    ]}
                >
                    <Input type="text" name="addInput" onChange={handleChange('input')} placeholder="请输入分类名称" autoComplete="off" />
                </Form.Item>
            </Form >
        )
    }
}
