import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/less/index.less'
import store from './store/index.js'
import './api/mock/mock.js'
import api from './api/api'
const app = createApp(App)


// createApp(App).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$api = api //api挂载到全局
store.commit('addMenu', router)


//路由导航守卫
// function checkRouter(path){
//     let hasCheck = router.getRoutes().filter(route => route.path == path).length
//     if (hasCheck) {
//         return true
//     }
//      else {
//         return false
//     }
// }

// router.beforeEach((to, from, next) => {
//     store.commit('token')
//     const token = store.state.token
//     if (!token && to.name !== 'login') {
//         next({
//             name:'login'
//         })
//     } else if (!checkRouter(to.path)) {
//         next({
//             name:'myhome'
//         })
//     }
//     else{
//         next()
//     }
// })
app.use(router).use(store).use(ElementPlus)
app.mount('#app')






