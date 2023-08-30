import Mock from 'mockjs'
export default {
    getMenu: config => {
        const {username, password} = JSON.parse(config.body)
        //先判断用户是否存在
        //判断账号和密码是否对应
        if(username === 'admin' && password === '123456'){
            return {
                code: 200,
                data: {
                    menu: [
                        { path: '/myhome', label:'首页', name: 'myhome',icon:'User' ,url:'home/Home'},
                        { path: '/myproducts', label:'产品服务', name: 'myproducts',icon:'setting'  ,url:'productserve/MyProducts'},
                        { label:'项目案例', children:[
                            { path: '/comm/commbuild', label:'公共建设', name: 'commbuild'  ,url:'buildcase/CommBulid'},
                            { path: '/comm/medicaledu',  label:'医疗教育', name: 'medicaledu'  ,url:'buildcase/MedicalEdu'},
                            { path: '/comm/industryPage',  label:'工业制造', name: 'industryPage' ,url:'buildcase/IndustryPage' }
                            ]
                        },
                        { path: '/newspage', label:'新闻中心', name: 'newspage',icon:'setting' ,url:'NewsPage' },
                        { label:'关于我们', children:[
                            { path: '/user/Introductionpage', label:'简介', name: 'Introductionpage' ,url:'about/IntroductionPage' },
                            { path: '/user/environmentpage',  label:'环境', name: 'environmentpage' ,url:'about/EnvironmentPage' },
                            { path: '/user/manageuser',  label:'权限管理', name: 'manageuser' ,url:'about/MyUser' }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if(username === 'xiaomi' && password === 'xiaomi'){
            return {
                code: 200,
                data: {
                    menu: [
                        { path: '/myhome', label:'首页', name: 'myhome',icon:'User' ,url:'home/Home'},
                        { path: '/myproducts', label:'产品服务', name: 'myproducts',icon:'setting'  ,url:'productserve/MyProducts'},
                        { label:'项目案例', children:[
                            { path: '/comm/commbuild', label:'公共建设', name: 'commbuild'  ,url:'buildcase/CommBulid'},
                            { path: '/comm/medicaledu',  label:'医疗教育', name: 'medicaledu'  ,url:'buildcase/MedicalEdu'},
                            { path: '/comm/industryPage',  label:'工业制造', name: 'industryPage' ,url:'buildcase/IndustryPage' }
                            ]
                        },
                        { path: '/newspage', label:'新闻中心', name: 'newspage',icon:'setting' ,url:'MedicalEdu' },
                        
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        }else{
            return {
                code: -999,
                data: {
                    message: '获取成功'
                }
            }
        }

    }

}