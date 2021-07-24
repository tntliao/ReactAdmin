import React, { Component, Fragment } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less';
import logo from './images/logo.png';
export default class Login extends Component {

    /* 对密码进行自定义验证 */
    validatePwd = (rule, value) => {
        if (!value) {
            return Promise.reject(new Error('密码不能为空'));
        } else if (value.length < 4) {
            return Promise.reject(new Error('密码不能小于4位'));
        } else if (value.length > 12) {
            return Promise.reject(new Error('密码不能大于12位'));
        } else if (!/^[a-zA-z0-9_]+$/.test(value)) {
            return Promise.reject(new Error('密码必须是数字英文或者下划线组成'));
        } else {
            return Promise.resolve();
        }
    }

    render() {
        const onFinish = (values) => {
            console.log('Received values of form: ', values);
        };
        
        return (
            <Fragment>
                <div className="login_container">
                    <div className="login_header">
                        <img src={logo} alt="logo" />
                        <h1 className="header_title">React项目:后台管理系统</h1>
                    </div>
                    <div className="login_from">
                        <h2>用户登录</h2>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[ //配置对象：属性名是特定的一些名称
                                    //声明式验证：直接使用别人定义好的验证进行验证
                                    { required: true, whitespace: true, message: '必须输入用户名' },
                                    { min: 4, message: '用户名最小4位' },
                                    { max: 12, message: '用户名最大12位' },
                                    { pattern: /^[a-zA-z0-9_]+$/, message: '用户名必须是数字英文或者下划线组成' }
                                ]}
                            >
                                {/* prefix icon组件 */}
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ validator: this.validatePwd }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </Fragment >
        )
    }
}

/*
    1.高阶函数
        1).一类特别的函数
            a.接受函数类型的参数
            b.返回的值是函数
        2).常见
            a.定时器 setTimeout() serInterval()
            b.Promise:Promise(()=>) then(value => {},reason => {})
            c.数组的遍历的相关方法：forEach()/filter()/map()/reduce()/findIndex()
            d.函数对象的bind()
            e.
    2.高阶组件
        1).本质就是一个函数
        2).接收一个组件(被包装组件),返回一个新的组件(已包装组件)，已包装组件会向被包装组件传入特定属性
        3).作用：扩展组件的功能
        4).高阶组件夜神高阶函数：接受一个组件函数，返回是一个新的组件函数
 */