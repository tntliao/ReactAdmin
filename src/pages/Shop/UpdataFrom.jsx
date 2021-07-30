import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
export default class UpdataFrom extends Component {

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        getUpdateFrom: PropTypes.func.isRequired
    }

    getFromData = (event) => {
        this.props.getUpdateFrom(event.target.value);
    }

    render() {

        const { categoryName } = this.props

        return (
            <Fragment>
                <Form>
                    <p style={{
                        color: 'black',
                        background: '#ffc107',
                        display: 'inline-block',
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
                        {/*categoryName 的值是对的，但是input框中的内容不变*/}
                        <Input type="text" placeholder={categoryName} onChange={this.getFromData} autoComplete="off" />
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }
}