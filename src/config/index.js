// 环境配置文件
/*一般在企业级项目里面有三个环境
开发环境
测试环境
线上环境*/



//当前环境
const evn = import.meta.env.MODE || 'prod'

const EnvConfig = {
    development: {
        baseApi: '/api',
        mockApi: 'https://www.fastmock.site/mock/cb4ce68e36492b2b4182ecd335babc43/api'
    },
    test: {
        baseApi: '//test.future.com/api',
        mockApi: 'https://www.fastmock.site/mock/cb4ce68e36492b2b4182ecd335babc43/api'
    },
    pro: {
        baseApi: '//future.com/api',
        mockApi: 'https://www.fastmock.site/mock/cb4ce68e36492b2b4182ecd335babc43/api'
    },
}
export default{
    evn,
    //mock的总开关
    mock: false,
    ...EnvConfig[evn    ]
}
