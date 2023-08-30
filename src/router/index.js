import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component:() => import ('../view/Main.vue'),
        redirect:'/myhome',
        name:'myhomes',
        // children: [
        //     {
        //         path: 'myhome', 
        //         label:'首页',
        //         name:'myhome',
        //         component: () => import('../view/home/Home.vue'),
        //         icon:'s-home'
        //     },
        //     {
        //         path: 'myproducts', 
        //         label:'产品服务',
        //         name:'myproducts',
        //         component: () => import('../view/productserve/MyProducts.vue'),
        //         icon:'connection'
        //     },
        //     {
        //         path: 'comm/commbuild', 
        //         label:'公共建设',
        //         name:'comm/commbuild',
        //         icon:'star-off',
        //         component: () => import('../view/buildcase/CommBulid.vue')
        //     },
        //     {
        //         path: 'comm/medicaledu', 
        //         label:'医疗教育',
        //         name:'comm/medicaledu',
        //         icon:'star-off',
        //         component: () => import('../view/buildcase/MedicalEdu.vue')
        //     },
        //     {
        //         path: 'comm/industryPage', 
        //         label:'工业制造',
        //         name:'comm/industryPage',
        //         icon:'star-off',
        //         component: () => import('../view/buildcase/IndustryPage.vue')
        //     },
        //     {
        //         path: 'newspage', 
        //         label:'新闻中心',
        //         name:'newspage',
        //         component: () => import('../view/NewsPage.vue'),
        //         icon:'chat-line-round'
        //     },
        //     {
        //         path: 'user/Introductionpage', 
        //         label:'简介',
        //         name:'user/Introductionpage',
        //         icon:'chat-line-round',
        //         component: () => import('../view/about/IntroductionPage.vue')
        //     },
        //     {
        //         path: 'user/environmentpage', 
        //         label:'环境',
        //         name:'user/environmentpage',
        //         icon:'chat-line-round',
        //         component: () => import('../view/about/EnvironmentPage.vue')
        //     },
        //     {
        //         path: 'user/manageuser', 
        //         label:'权限管理',
        //         name:'user/manageuser',
        //         icon:'chat-line-round',
        //         component: () => import('../view/about/MyUser.vue')
        //     },
        // ]
        children:[]
    },
    {
        path: '/login', 
        label:'登录',
        name:'login',
        component: () => import('../view/login/Login.vue')
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
   
  export default router