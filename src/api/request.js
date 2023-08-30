import axios from "axios";
import config from '../config'
import {  ElMessage } from 'element-plus'
const NETWORK_ERROR = '网络请求异常，请稍后重试......'

//创建一个axios实例对象
const serve = axios.create({
    baseURL: config.baseApi
})

//在请求之前做一些事情
serve.interceptors.request.use((req) => {
    //可以自定义header
    //jwt-token认证时候
    return req
})

//在请求之后做一些事情
serve.interceptors.response.use((res) => {
    // console.log(res.data)
    const { code, data, msg } = res.data
    //根据后端 协商 视情况而定
    if( code == 200){
        return data
    }else{
        //网络请求错误
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

//封装的核心函数
function request(option) {
    //{}
    option.method = option.method || 'get'
    if (option.method.toLowerCase() == 'get') {
        option.params = option.data
    }
    //对mock的处理
    let isMok = config.mock
    if (typeof option.mock !== 'undefined') {
        isMok = option.mock
    }
    //对线上环境做处理
    if(config.env == 'prod'){
        //不给你用到mock的机会
        serve.defaults.baseURL = config.baseApi
    }else{
        serve.defaults.baseURL = isMok ? config.mockApi : config.baseApi
    }
    return serve(option)
}
export default request