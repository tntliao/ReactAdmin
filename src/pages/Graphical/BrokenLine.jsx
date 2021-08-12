import React, { Component } from 'react'
import ReactECharts from 'echarts-for-react';
import { Card, Button } from 'antd';
export default class BrokenLine extends Component {

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
                text: '折线图堆叠'
            },
            color: ['#B3FFAB', '#12FFF7'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['销量', '库存']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '销量',
                    type: 'line',
                    stack: '销量',
                    data: sales
                },
                {
                    name: '库存',
                    type: 'line',
                    stack: '库存',
                    data: stock
                }
            ]
        };

        return (
            <div>
                <Card title={<Button type="primary" onClick={this.update}>更新</Button>}>
                    <ReactECharts
                        option={option}
                        opts={{ renderer: 'svg' }}
                    />;
                </Card>
            </div >
        )
    }
}


