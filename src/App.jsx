import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './pages/Admin';
import Login from './pages/Login';

import './App.less';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch> {/* 匹配到一个就不会继续匹配 */}
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}