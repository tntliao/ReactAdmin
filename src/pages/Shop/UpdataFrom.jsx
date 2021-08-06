import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
export default class UpdataFrom extends Component {

    constructor(props) {
        super(props);
        this.updateFromRef = React.createRef();
    }

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        getUpdateFrom: PropTypes.func.isRequired
    }

    getFromData = (event) => {
        this.props.getUpdateFrom(event.target.value, this.updateFromRef);
    }

    render() {

        const { categoryName } = this.props

        return (
            <Fragment>
                <Form
                    ref={this.updateFromRef}
                    initialValues={{ content: "" }}
                >
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