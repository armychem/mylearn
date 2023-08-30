import { createStore } from "vuex";
// import Cookie from "js-cookie"
export default createStore ({
    state: {
        isCollapse: true,
        currentMenu: null,
        tabsList:[
            {
                path:'/',
                name:'myhome',  
                label:'首页',
                icon:'home'
            }
        ],
        menu:[],
        token:""
    },
    mutations: {
        //菜单伸缩
        //额外的参数，即 mutation 的载荷（payload）
        updateIsCollapse(state, payload){
            state.isCollapse = !state.isCollapse
        },
        //选择菜单
        selectMenu(state, val){
            //根据val判断
            // val.name == 'myhome' ? (state.currentMenu = null) : (state.currentMenu = val)
            console.log(val)
            if(val.name == 'myhome'){
                state.currentMenu = null
            } else {
                state.currentMenu = val
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result == -1 ? state.tabsList.push(val) : ''
            }
        },
        //关闭标签
        closeTab(state, val){
            let res = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(res, 1) 
        },
        setMenu(state, val){
            state.menu = val
            localStorage.setItem('menu', JSON.stringify(val))
        },
        addMenu(state, router){
            if(!localStorage.getItem('menu')){
                return
            }
            const menu = JSON.parse(localStorage.getItem('menu'))
            state.menu = menu

            const menuArray = []
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        let url = `../view/${item.url}.vue`
                        item.component = () => import(url)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    let url = `../view/${item.url}.vue`
                    item.component = () => import(url)
                    menuArray.push(item)
                }
            });
            menuArray.forEach(item => {
                router.addRoute('myhomes', item)
            })
        },
        //退出
        clearMenu(state){
            state.menu = []
            localStorage.removeItem('menu')
        },
        //路由导航守卫

        // setToken(state,val){
        //     state.token = val
        //     Cookie.set("token", val)
        // },
        // getToken(state){
        //     state.token = state.token || Cookie.get('token')
        // },
        // clearToken(state){
        //     state.token = ''
        // },
    }
})