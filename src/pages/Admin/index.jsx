import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import Header from '../../components/Header'
import LeftNav from '../../components/LeftNav';
import Home from '../Home';
import Category from '../Shop/Category';
import Commodity from '../Shop/Commodity';
import User from '../User'
import Role from '../Role';
import Cylindrical from '../Graphical/Cylindrical';
import BrokenLine from '../Graphical/BrokenLine';
import PieChart from '../Graphical/PieChart';
import NoFind from '../NoFind'
const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {

        const data = JSON.parse(storageUtils.getStorage('user') || '{}');
        memoryUtils.user = data;
        if (!memoryUtils.user._id) {
            return <Redirect to="/" />
        }
        return (
            <Layout style={{ minHeight: "100%" }}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout >
                    <Header>Header</Header>
                    <Content style={{ backgroundColor: "#fff", margin: '20px' }}>
                        <Switch>
                            <Redirect exact from='/' to='/home' />
                            <Route exact path="/home" component={Home}></Route>
                            <Route exact path="/shop/category" component={Category}></Route>
                            <Route exact path="/shop/commodity" component={Commodity}></Route>
                            <Route exact path="/user" component={User}></Route>
                            <Route exact path="/role" component={Role}></Route>
                            <Route exact path="/graphical/cylindrical" component={Cylindrical}></Route>
                            <Route exact path="/graphical/brokenLine" component={BrokenLine}></Route>
                            <Route exact path="/graphical/pieChart" component={PieChart}></Route>
                            <Route component={NoFind} />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: "center", color: '#ccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
