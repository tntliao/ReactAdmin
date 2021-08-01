import React, { Component, Fragment } from 'react'
import { Card, Button, Select, Input, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqGetCommodity, reqSearchProducts } from '../../../api';
import LinkBottom from '../../../components/LinkButton';
import { PAGE_SIZE } from '../../../utils/constant'
const { Option } = Select;
/*
    commodity默认子路由组件
 */
export default class Home extends Component {

    state = {
        total: 0, // 数据的总数量
        dataSource: [], //列表数据
        isLading: false, //是否正在加载数据
        searchType: 'productName', //选择框默认值
        searchName: '', //搜索的关键词
    }

    componentDidMount() {
        this.getDataSource(1);
    }

    //获取数据信息
    getDataSource = async (pageNum) => {
        this.setState({ isLading: true });
        let result;
        const { searchType, searchName } = this.state;

        if (searchName) {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType });
        } else {
            result = await reqGetCommodity(pageNum, PAGE_SIZE);
        }
        this.setState({ isLading: false })
        const { total, list } = result.data;
        if (result.status === 0) {
            this.setState({
                total,
                dataSource: list
            })
        } else {
            message.error('获取数据失败')
        }
    }

    handleChange = (flag) => {
        return (value) => {
            if (flag) {
                this.setState({ selectValue: value })
            } else {
                this.setState({ searchName: value.target.value })
            }
        }
    }

    render() {
        const { dataSource, total, isLading, searchType, searchName } = this.state

        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                width: 655
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => {
                    return '💴' + price
                }
            },
            {
                title: '状态',
                render: () => {
                    return (
                        <Fragment>
                            <Button type="primary" style={{ marginRight: 10 }}>下架</Button>
                            <span>在售</span>
                        </Fragment>
                    )
                }
            },
            {
                title: '操作',
                // width: 135,
                textWrap: 'word-break',
                render: () => {
                    return (
                        <Fragment>
                            <LinkBottom>详情</LinkBottom>
                            <LinkBottom>修改</LinkBottom>
                        </Fragment>
                    )
                }
            }
        ];

        const title = (
            <Fragment>
                <Select defaultValue={searchType} style={{ width: 120 }} onChange={this.handleChange(true)}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input style={{ width: 110, margin: '0 10px' }} placeholder='输入关键字' value={searchName} onChange={this.handleChange(false)} />
                <Button type="primary" style={{ height: 31.6 }} onClick={() => this.getDataSource(1)}> 搜索</Button>
            </Fragment>
        )
        const extra = (
            <Button type="primary">
                <PlusOutlined />
                添加商品
            </Button>
        )

        return (
            <Fragment>
                <Card title={title} extra={extra}>
                    <Table
                        rowKey="_id"
                        bordered
                        columns={columns}
                        dataSource={dataSource}
                        loading={isLading}
                        pagination={{
                            total,
                            showQuickJumper: true,
                            defaultPageSize: PAGE_SIZE,
                            onChange: paginate => this.getDataSource(paginate)
                        }}
                    />
                </Card>
            </Fragment >
        )
    }
}
