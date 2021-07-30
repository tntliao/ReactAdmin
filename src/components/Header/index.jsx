import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.less';
import { weather } from '../../api/index';
import menuList from '../../config/menuConfig';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';
// import LinkBottom from '../../components/LinkButton';

class Header extends Component {

    state = {
        weather: '',
        nowTime: moment().format('YYYY:M:D h:mm:ss A')
    };

    UNSAFE_componentWillMount() {
        this.getWeather();
        this.interTime = setInterval(() => {
            this.setState({
                nowTime: moment().format('YYYY:M:D h:mm:ss A')
            })
        }, 1000)
    };

    componentWillUnmount() {
        clearInterval(this.interTime);
    }
    getWeather = async () => {
        const weatherData = await weather('440114');
        this.setState({ weather: weatherData.lives[0].weather });
    }

    getTitle = () => {
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const flag = item.children.find(item => {
                    return item.key === path;
                });
                if (flag) title = item.title;
            }
        })
        return title;
    }
    /* 推出登录 */
    loginOut = () => {
        // const _this = this;
        Modal.confirm({
            title: '你确定要退出登陆吗？',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                storageUtils.removeStorage();
                memoryUtils.user = {};
                // _this.props.history.replace('/login')
                this.props.history.replace('/login')
            }
        });
    }

    render() {
        const title = this.getTitle();

        return (
            <div className="header">
                <div className="header_top">
                    <div className="userTitle">
                        <p>欢迎,admin</p>
                        <a href="#/" onClick={this.loginOut}>退出</a>
                        {/* 这个组件会一直render */}
                        {/* <LinkBottom onClick={this.loginOut}>退出</LinkBottom> */}
                    </div>
                </div>
                <div className="header_bottom">
                    <div className="leftTitle">{title}</div>
                    <div className="rightTitle">
                        <p className="dateTime">{this.state.nowTime}</p>
                        <p className="weather">{this.state.weather}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);