import React, { Component, Fragment } from 'react'
import { Card, Button, Select, Input, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqGetCommodity, reqSearchProducts, reqUpdateStatus } from '../../../api';
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
        // 执行 发送请求获取数据信息
        this.getDataSource(1);
    }

    //发送请求获取数据信息
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

    //收集 选择框和搜索框 的内容
    handleChange = (flag) => {
        return (value) => {
            if (flag) {
                this.setState({ selectValue: value })
            } else {
                this.setState({ searchName: value.target.value })
            }
        }
    }
    // 进入详情页面
    fromDetail = (item) => {
        this.props.history.push('/shop/commodity/detail', item)
    }
    //更新指定商品的状态
    updateStatus = async (productId, status) => {
        console.log(productId);
        const result = await reqUpdateStatus(productId, status);
        if (result.status === 0) {
            message.success('修改商品状态成功')
            this.getDataSource(1);
        } else {
            message.error('修改商品状态失败')
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
            },
            {
                width: 90,
                title: '价格',
                dataIndex: 'price',
                render: (price) => {
                    return '💴' + price
                }
            },
            {
                width: 110,
                title: '状态',
                // dataIndex: 'status',
                render: (item) => {
                    const { status, _id } = item
                    return (
                        <Fragment>
                            <Button
                                type="primary"
                                style={{ marginRight: 10 }}
                                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
                            >
                                {status === 1 ? "下架" : "上架"}</Button>
                            <span>{status === 1 ? "在售" : "已下架"}</span>
                        </Fragment>
                    )
                }
            },
            {
                title: '操作',
                // width: 135,
                textWrap: 'word-break',
                render: (item) => {
                    return (
                        <Fragment>
                            <LinkBottom onClick={() => this.fromDetail(item)}>详情</LinkBottom>
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
            <Button type="primary" onClick={() => this.props.history.push('/shop/commodity/addUpdata')}>
                < PlusOutlined />
                添加商品
            </Button >
        )

        return (
            <Fragment>
                <Card title={title} extra={extra}>
                    {<Table
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
                    />}
                </Card>
            </Fragment >
        )
    }
}
