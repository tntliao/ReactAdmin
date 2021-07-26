import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import Header from '../../components/Header'
import LeftNav from '../../components/LeftNav';
import Home from '../Home';
import Category from '../Shop/Category ';
import Commodity from '../Shop/Commodity';
import User from '../User'
import Role from '../Role';
import Cylindrical from '../Graphical/Cylindrical';
import BrokenLine from '../Graphical/BrokenLine';
import PieChart from '../Graphical/PieChart';

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {

        const data = JSON.parse(storageUtils.getStorage('user') || '{}');
        memoryUtils.user = data;
        if (!memoryUtils.user._id) {
            return <Redirect to="/" />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ backgroundColor: "#fff" }}>
                        <Switch>
                            <Route path="/home" component={Home}></Route>
                            <Route path="/shop/category" component={Category}></Route>
                            <Route path="/shop/commodity" component={Commodity}></Route>
                            <Route path="/user" component={User}></Route>
                            <Route path="/role" component={Role}></Route>
                            <Route path="/graphical/cylindrical" component={Cylindrical}></Route>
                            <Route path="/graphical/brokenLine" component={BrokenLine}></Route>
                            <Route path="/graphical/pieChart" component={PieChart}></Route>
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: "center", color: '#ccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
