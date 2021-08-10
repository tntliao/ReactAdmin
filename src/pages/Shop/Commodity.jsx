import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './commodity.less'
import Home from './commodity/Home';
import AddUpdate from './commodity/AddUpdate';
import Detail from './commodity/Detail';

export default class Commodity extends Component {
    render() {
        return (
            <Switch>
                <Route path='/shop/commodity' component={Home} exact></Route>
                <Route path='/shop/commodity/addUpdata' component={AddUpdate}></Route>
                <Route path='/shop/commodity/detail' component={Detail}></Route>
                <Redirect to='/shop/commodity' />
            </Switch>
        )
    }
}
