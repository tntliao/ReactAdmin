import React, { Component } from 'react'
import ReactECharts from 'echarts-for-react';
import { Card, Button } from 'antd';
export default class Cylindrical extends Component {

    state = {
        sales: [5, 20, 36, 10, 10, 20], //销量
        stock: [15, 13, 29, 13, 21, 17] //库存
    }

    update = () => {
        this.setState(state => ({
            sales: state.sales.map(item => item + 1),
            stock: state.stock.reduce((pre, item) => {
                pre.push(item - 1)
                return pre
            }, [])
        }))
    }

    render() {
        const { sales, stock } = this.state
        const option = {
            title: {
                text: 'ECharts 入门示例'
            },
            color: ['#556270', '#FF6B6B'],
            tooltip: {},
            legend: {
                data: ['销量', '库存']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: sales
                },
                {
                    name: '库存',
                    type: 'bar',
                    data: stock
                }
            ]
        };

        return (
            <div>
                <Card title={<Button type="primary" onClick={this.update}>更新</Button>}>
                    <ReactECharts
                        option={option}
                        style={{ height: 400 }}
                        opts={{ renderer: 'svg' }}
                    />;
                </Card>
            </div >
        )
    }
}


