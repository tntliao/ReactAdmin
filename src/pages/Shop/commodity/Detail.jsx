import React, { Component } from 'react'
import { Card, List, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import LinkButton from '../../../components/LinkButton';
import { DETAIL_IMG_URL } from '../../../utils/constant';
import { reqClassify } from '../../../api'
const { Item } = List
/* 详情 */
export default class Detail extends Component {

    state = {
        pName: '',
        cName: '',
    }

    componentDidMount() {
        let pName;
        const { pCategoryId, categoryId } = this.props.history.location.state;
        const results = Promise.all([reqClassify(pCategoryId), reqClassify(categoryId)]);
        results.then(response => {
            if (response[0].status === 0) pName = response[0].data.name;
            this.setState({
                pName,
                cName: response[1].data.name
            })
        }).catch(error => {
            message.error('获取数据失败')
        })

    }


    render() {
        const { name, desc, price, imgs, detail } = this.props.history.location.state
        const dangDetail = { __html: detail };
        const { cName, pName } = this.state;
        return (
            <div>
                <Card>
                    <List>
                        <Item className="commodity_detail">
                            <LinkButton>
                                <ArrowLeftOutlined style={{ fontSize: '20px' }} onClick={() => this.props.history.goBack()} />
                            </LinkButton>
                            <span className="detail_title">商品详情</span>
                        </Item>
                        <Item className="commodity_detail">
                            <span className="detail_class">商品名称:</span>
                            <span>{name}</span>
                        </Item>
                        <Item className="commodity_detail">
                            <span className="detail_class">商品描述:</span>
                            <span>{desc}</span>
                        </Item>
                        <Item className="commodity_detail">
                            <span className="detail_class">商品价格:</span>
                            <span>{price}元</span>
                        </Item>
                        <Item className="commodity_detail">
                            <span className="detail_class">所属分类:</span>
                            <span>{pName ? pName + '-->' : ''}  {cName}</span>
                        </Item>
                        <Item className="commodity_detail">
                            <span className="detail_class">商品图片:</span>
                            {
                                imgs.map(item => {
                                    return <img className="detail_picture" src={DETAIL_IMG_URL + item} alt={desc} key={item} />
                                })
                            }
                        </Item>
                        <Item className="commodity_detail">
                            <span className="detail_class">商品详情:</span>
                            <div dangerouslySetInnerHTML={dangDetail}></div>
                        </Item>
                    </List>
                </Card>
            </div>
        )
    }
}
