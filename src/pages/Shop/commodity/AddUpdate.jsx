import React, { Component, Fragment } from 'react'
import { Card, Form, Input, Button, Cascader, message } from 'antd'
import PicturesWall from './PicturesWall';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqGetCategory } from '../../../api'
import LinkButton from '../../../components/LinkButton';
import RichTextEditor from './RichTextEditor';
import { reqAddOrUpdateProduct } from '../../../api/index'
const { TextArea } = Input;

/* 更新添加 */
export default class AddUpdate extends Component {

    constructor(props) {
        super(props);
        this.pw = React.createRef();
        this.rich = React.createRef();
    }

    state = {
        options: [], // 列表选项数据
        cascaderValue: [], // 选中的列表数据
    };

    UNSAFE_componentWillMount() {
        //取出携带的state
        const product = this.props.location.state; //在Home组件传递过来的
        //保存是否是更新的标识
        this.isUpdate = !!product;
        this.product = product || {}
    }

    componentDidMount() {
        this.getCategorys('0')
    }
    // 自定义价格验证
    verifyPrice = (_, value) => {
        if (value * 1 > -1) {
            return Promise.resolve()
        } else {
            return Promise.reject('价格不能为负数')
        }
    }
    // From成功的回调
    onFinish = async (values) => {
        //1.收集数据
        const { name, desc, price, categoryIds } = values;
        let pCategoryId, categoryId
        if (categoryIds.length === 1) {
            pCategoryId = "0";
            categoryId = categoryIds[0];
        } else {
            pCategoryId = categoryIds[0];
            categoryId = categoryIds[1];
        }
        const imgs = this.pw.current.getImgs();;
        const detail = this.rich.current.getRichContent();
        const product = { pCategoryId, categoryId, name, desc, price, imgs, detail };
        if (this.isUpdate) {
            product._id = this.product._id;
        }
        console.log(product);
        //2.调用接口请求函数去添加/更新
        const result = await reqAddOrUpdateProduct(product)

        //3.根据结果提示
        if (result.status === 0) {
            message.success(this.isUpdate ? '更新商品成功' : '添加商品成功')
            this.props.history.goBack();
        } else {
            message.error(this.isUpdate ? '更新商品失败' : '添加商品失败')
        }
    };
    // select 发生变化
    cascaderChange = (value, cascaderOptions) => {
        /* 
            value 只是id
            cascaderOptions 是 详细数据
         */
        console.log(value);
        this.setState({
            cascaderValue: value
        })
    };
    // 二级列表数据
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        //根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value);
        targetOption.loading = false;
        if (subCategorys && subCategorys.length > 0) {
            //生成二级列表options
            const childOptions = subCategorys.map(item => ({
                value: item._id,
                label: item.name,
                isLeaf: true,
            }))
            //添加二级列表
            targetOption.children = childOptions;
        } else { //当前选中的没有子分类
            targetOption.isLeaf = true;
        }
        this.setState({
            /*
                为什么这么更新？
                    因为上面直接通过.属性来修改状态，在内存中已经是修改的了，但是react不会进行更新，必须通过setState才行 
             */
            options: [...this.state.options]
        })
    }
    // 加工数据
    initOptions = async (data) => {

        const options = data.map(item => ({
            value: item._id,
            label: item.name,
            isLeaf: false,
        }))

        //如果是一个二级分类商品的更新
        const { isUpdate, product } = this;
        // const { pCategoryId, categoryId } = product;
        const { pCategoryId } = product;
        if (isUpdate && pCategoryId !== '0') {
            //获取对于的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId);
            //生成二级下拉列表的option
            const childOptions = subCategorys.map(item => ({
                value: item._id,
                label: item.name,
                isLeaf: true
            }))

            //找到当前商品对于的一级option对象
            const targetOption = options.find(option => option.value === pCategoryId);
            //关联对于的一级options
            targetOption.children = childOptions;
        }


        this.setState({
            options
        })
    }
    // 获取一级/二级分列数据
    getCategorys = async (parentId) => {
        const result = await reqGetCategory(parentId);
        if (result.status === 0) {
            const categroys = result.data;
            if (parentId === '0') { //一级分类列表
                this.initOptions(categroys)
            } else { //二级分类列表
                return categroys //返回二级列表 ==> 当前async函数返回的promise就会成功且value为categroys
            }
        } else {
            message.error('获取数据失败')
        }
    }

    render() {
        const { product, isUpdate } = this;
        const { categoryId, pCategoryId, imgs, detail } = product;
        const categoryIds = [];
        if (isUpdate) {
            //商品是一个一级分类的商品
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }

        const title = (
            <Fragment>
                <LinkButton onClick={() => { this.props.history.goBack() }}> <ArrowLeftOutlined style={{ margin: "0 10px" }} /></LinkButton>
                {isUpdate ? "修改商品" : "添加商品"}
            </Fragment>
        );

        return (
            <div>
                <Card title={title}>
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 8 }}
                        initialValues={{
                            name: product.name,
                            desc: product.desc,
                            price: product.price,
                            categoryIds: categoryIds
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            label="商品名称"
                            name="name"
                            rules={[{ required: true, message: '请输入商品名称' }]}
                        >
                            <Input placeholder="请输入商品名称" />
                        </Form.Item>

                        <Form.Item
                            label="商品描述"
                            name="desc"
                            rules={[{ required: true, message: '请输入商品内容' }]}
                        >
                            <TextArea placeholder="请输入商品内容" autoSize={{ minRows: 2, maxRows: 6 }} />
                        </Form.Item>

                        <Form.Item
                            label="商品价格"
                            name="price"
                            rules={[{ required: true, message: '请输入商品名称' }, { validator: this.verifyPrice }]}
                        >
                            <Input type="number" addonAfter="元" placeholder="请输入商品价格" />
                        </Form.Item>


                        <Form.Item
                            label="商品分类"
                            name="categoryIds"
                            rules={[{ required: true, message: '请指定商品分类' }]}
                        >
                            <Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                                onChange={this.cascaderChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="商品图片"
                        >
                            <PicturesWall ref={this.pw} imgs={imgs} />
                        </Form.Item>

                        <Form.Item
                            label="商品详情"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 20 }}
                        >
                            <RichTextEditor ref={this.rich} detail={detail} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
        )
    }
}
