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
/*
    搜索商品分页列表(根据商品名称/商品描述)
    searchType:搜索 类型，productName/productDesc
 */
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/manage/product/search', { pageNum, pageSize, [searchType]: searchName });
// 根据分类ID获取分类
export const reqClassify = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId });
//更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST');
//删除照片
export const deleteImg = (name) => ajax(BASE + '/manage/img/delete', { name }, 'POST');
//添加/更新商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST');
//更新商品
// export const reqAddProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')
//获取所有的角色列表
export const reqRoles = () => ajax(BASE + '/manage/role/list');
//添加角色
export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add', { roleName }, 'POST');
//更新角色
export const reqUpdateRole = (role) => ajax(BASE + '/manage/role/update', role, 'POST');
//获取所有用户列表
export const reqUsers = () => ajax(BASE + '/manage/user/list');
//删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', { userId }, 'POST');
//添加用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST');











































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
