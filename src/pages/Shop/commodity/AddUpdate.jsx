import React, { Component, Fragment } from 'react'
import { Card, Form, Input, Button, Cascader } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../../components/LinkButton';
const { TextArea } = Input;

/* 更新添加 */
export default class AddUpdate extends Component {

    state = {
        options: [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                isLeaf: false,
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                isLeaf: false,
            },
        ]
    };

    // 自定义价格验证
    verifyPrice = (_, value) => {
        if (value * 1 > -1) {
            return Promise.resolve()
        } else {
            return Promise.reject('价格不能为负数')
        }
    }
    // From成功的回调
    onFinish = (values) => {
        console.log('Success:', values);
    };

    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    loadData = selectedOptions => {
        //这个应该是被选中的第一个
        // const targetOption = selectedOptions[selectedOptions.length - 1];
        const targetOption = selectedOptions[0];
        targetOption.loading = true;

        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            this.setState({
                options: [...this.state.options],
            });
        }, 1000);
    }

    render() {
        const title = (
            <Fragment>
                <LinkButton> <ArrowLeftOutlined style={{ margin: "0 10px" }} /></LinkButton>
                添加商品
            </Fragment>
        );

        return (
            <div>
                <Card title={title}>
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 8 }}
                        initialValues={{ username: '' }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            label="商品名称"
                            name="goodsName"
                            rules={[{ required: true, message: '请输入商品名称' }]}
                        >
                            <Input placeholder="请输入商品名称" />
                        </Form.Item>

                        <Form.Item
                            label="商品描述"
                            name="goodsDescribe"
                            rules={[{ required: true, message: '请输入商品内容' }]}
                        >
                            <TextArea placeholder="请输入商品内容" autoSize={{ minRows: 2, maxRows: 6 }} />
                        </Form.Item>

                        <Form.Item
                            label="商品价格"
                            name="goodsPicre"
                            rules={[{ validator: this.verifyPrice }]}
                        >
                            <Input type="number" addonAfter="元" placeholder="请输入商品价格" />
                        </Form.Item>


                        <Form.Item label="商品分类" rules={[{ required: true, message: '请指定商品分类' }]}>
                            <Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                                onChange={this.onChange}
                                changeOnSelect
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
        )
    }
}
