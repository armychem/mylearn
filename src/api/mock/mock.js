import Mock from 'mockjs'
import homeApi from './home'
import userApi from './news'
import permissionApi from './permission'
//拦截请求
Mock.mock('/home/getTableData', homeApi.getStatisticalData)

//获取本地user的数据
// Mock.mock('/user/getUser', 'get', userApi.getUserList)
//正则的表达方式
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updataUser)
Mock.mock(/user\/delete/, 'get', userApi.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)
