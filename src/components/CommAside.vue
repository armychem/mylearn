<template>
    <div :width="!$store.state.isCollapse ? '180px' : '60px'">
            
            <el-menu
                :collapse="!$store.state.isCollapse"
                :collapse-transition="false"
            >
                <div v-show="$store.state.isCollapse" class="syslabel">通用后台管理</div>
                <div v-show="!$store.state.isCollapse" class="syslabel">后台</div>
                <el-menu-item
                v-for="item in noChildren()"
                :index="item.path+''"
                :key="item.path"
                @click="clickMenu(item)">
                    <el-icon><component class="icons" :is="item.icon"></component></el-icon>
                    <span>{{item.label}}</span>
                </el-menu-item>
                <el-sub-menu
                v-for="item in hasChildren()"
                :index="item.label+''"
                :key="item.label">
                    <template #title>
                        <el-icon><location /></el-icon>
                        <span>{{item.label}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                        v-for="subitem in item.children"
                        :index="subitem.path+''"
                        :key="subitem.path"
                        @click="clickMenu(subitem)">{{subitem.label}}</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
    </div>
    
</template>
<script>
import { useRouter } from "vue-router"
import { useStore } from "vuex";

    export default {
        setup() {
            const store = useStore();
            //
            const router = useRouter();
            const menulist = [
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
            ];
            const asyncList = store.state.menu
            //没有子菜单
            const noChildren = () => {
                return asyncList.filter((item) => !item.children);
            };
            //有子菜单
            const hasChildren = () => {
                return asyncList.filter((item) => item.children);
            };
            
            const clickMenu = (item) => {
                router.push({
                    name: item.name
                });
                //vuex 来管理面包屑
                store.commit('selectMenu', item)
            }
            return {
                clickMenu,
                noChildren,
                hasChildren,
            }
            
        },

    }
</script>
<style lang="less" scoped>

.el-menu{
    height: 100%;
    .syslabel{
        text-align: center;
        background-color: #409eff;
        color: #fff;
        padding: 10px;
    }
}
    
</style>
