import React, { Component } from 'react'
import { Form, Select, Input } from 'antd';
import PropsTypes from 'prop-types'
const { Option } = Select;
export default class AddFrom extends Component {

    constructor(props) {
        super(props);
        this.addFromRef = React.createRef();
    }
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
                        const addFromRef = this.addFromRef
                        this.props.getAddFrom({ selectId, inputValue, addFromRef })
                    })
                } else {
                    this.setState({ inputValue: event.target.value }, () => {
                        let { selectId, inputValue } = this.state;
                        const addFromRef = this.addFromRef
                        if (!selectId) { selectId = parentId }
                        this.props.getAddFrom({ selectId, inputValue, addFromRef })
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
            <Form
                ref={this.addFromRef}
                initialValues={{ addInput: '' }}
            >
                <Select
                    key={getDefaultValue(parentId)}
                    onChange={handleChange('select')}
                    defaultValue={getDefaultValue(parentId)}
                    style={{ width: '100%', marginBottom: 40 }}
                >
                    <Option key='一级分类'>一级分类</Option>
                    {sourceList}
                </Select>
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
                    <Input
                        type="text"
                        name="addInput"
                        onChange={handleChange('input')}
                        placeholder="请输入分类名称"
                        autoComplete="off"
                    />
                </Form.Item>
            </Form >
        )
    }
}
