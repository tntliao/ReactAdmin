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
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: '内容不能为空!',
                            },
                            {
                                whitespace: true,
                                message: '内容不能为空!',
                            }
                        ]}
                    >
                        <Input type="text" placeholder={categoryName} onChange={this.getFromData} autoComplete="off" />
                    </Form.Item>
                </Form>
            </Fragment>
        )
    }
}