/*
    要求：能根据接口文档定义接口请求
    包含应用中所有接口请求函数的模块
    每个函数的返回值都是promise
 */

import ajax from './ajax';
import axios from 'axios';

const BASE = '';
//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST');
//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST');
//添加分类
export const reqAddCategory = (parentId, categoryName) => ajax(BASE + '/manage/category/add', { parentId, categoryName }, 'POST');
//获取一级或某个二级分类列表
export const reqGetCategory = (parentId) => ajax(BASE + '/manage/category/list', { parentId });
// 更新品类名称
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST');
//获取商品管理数据
export const reqGetCommodity = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize });



























//获取天气 
export const weather = (city) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=eca8e9e8d79722af27f1a9897c8a5a8d`;
    return new Promise((resolve, reject) => {
        axios.get(url).then(response => {
            resolve(response.data)
        })
    })
}

/* weather('440114')
const result = weather('440114');
result.then(response => {
    console.log(response);
}) */


/* (async function get() {
    const result = await weather('440114');
    console.log(result);
})() */
