import React, { Component, Fragment } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import menuList from '../../config/menuConfig';
import logo from '../../assets/images/logo.png';
import './index.less';

const { SubMenu } = Menu;

class LeftNav extends Component {

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
        // 1.获取当前路径
        let path = this.props.location.pathname;
        if (path.indexOf('/shop/commodity') === 0) {
            path = '/shop/commodity';
        }
        return menuList.reduce((pre, item) => {
            if (item.children) {
                // 2.查找一个与当前请求路径匹配的子item 
                const cItem = item.children.find(cItem => cItem.key === path);
                // 2.1如果匹配，说明需要展开，把它存起来
                if (cItem) this.openKey = item.key;

                pre.push(
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
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
    /* 
        3.在render()之前调用一次
          在第一次render()之前render一次
          为第一次render()准备数据(同步)
     */
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {
        let path = this.props.location.pathname;
        if (path.indexOf('/shop/commodity') === 0) {
            path = '/shop/commodity';
        }
        return (
            <Fragment>
                <div className="left_nav">
                    <Link to="/home" className="header">
                        <img src={logo} alt="logo" />
                        <h1>硅谷后台</h1>
                    </Link>
                </div>
                <Menu
                    selectedKeys={[path]}
                    // 第三步 提前执行就是为了获取 openkey 从而展开需要打开的选项
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {/* 4.渲染到页面 */}
                    {this.menuNodes}
                </Menu>
            </Fragment>

        )
    }
}

export default withRouter(LeftNav);