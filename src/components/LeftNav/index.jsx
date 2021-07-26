import React, { Component, Fragment } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import menuList from '../../config/menuConfig';
import logo from '../../assets/images/logo.png';
import './index.less';

const { SubMenu } = Menu;

export default class LeftNav extends Component {

    //第一种方法
    /* getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key} icon={item.icon}>

                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }

        })
    } */

    //第二种方法
    getMenuNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            if (item.children) {
                pre.push(
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            } else {
                pre.push(
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>
                )
            }
            return pre;
        }, [])
    }
    render() {
        return (
            <Fragment>
                <div className="left_nav">
                    <Link to="/home" className="header">
                        <img src={logo} alt="logo" />
                        <h1>硅谷后台</h1>
                    </Link>
                </div>

                <Menu
                    defaultSelectedKeys={['home']}
                    mode="inline"
                    theme="dark"
                >
                    {this.getMenuNodes(menuList)}
                </Menu>

            </Fragment>

        )
    }
}
