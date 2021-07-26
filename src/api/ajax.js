/*
    能发送异步ajax请求的函数模块
    封装axios库
    函数的返回值是promise对象
 */

import axios from "axios";
import { message } from 'antd';

export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, rejecy) => {
        let promise;
        if (type === 'GET') { //发送GET请求
            promise = axios.get(url, {
                params: data
            })
        } else { //发送POST请求
            promise = axios.post(url, data)
        }

        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求出错:' + error.message);
        })
    })
}