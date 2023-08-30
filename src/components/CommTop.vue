<template>
    <div class="topmian">
        <div class="l-contents">
            <el-button @click="handleCollapse" size="small">
                <el-icon :size="20">
                    <Menu />
                </el-icon>
            </el-button>
            <div class="bread">
                <el-breadcrumb separator="/">
                    <!-- 首页是一定存在，所以直接写死 -->
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="r-contents">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImgSrc('pht')" alt="">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="LoginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    
</template>
<script>
import {  computed, defineComponent } from 'vue-demi'
import { useRouter } from 'vue-router';
import { useStore } from "vuex";

    export default defineComponent({
        setup() {
            const getImgSrc = (pht) => {
                return new URL(`../assets/${pht}.png`,import.meta.url).href;
            };
            
            const store = useStore();
            let handleCollapse = () => {
                //调用vuex中的mutations
                store.commit('updateIsCollapse')
            };
            //
            const current = computed(() => {
                return store.state.currentMenu;
            });
            const router = useRouter()
            const LoginOut = () => {
                store.commit('clearMenu')
                router.push({
                    name:'login'
                })
            };
            return {
                // imgsrc,  
                getImgSrc,
                current,
                handleCollapse,
                LoginOut
            }
            // const imgsrc = require('../assets/pht.png');
            
        },

    })
</script>
<style lang="less" scoped>
.topmian{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    .l-contents{
        display: flex;
        align-items: center;
        .bread{
            margin-left: 15px;
            // /deep/ span{
            //     cursor: pointer;
            // }
            
        }
        
    // [@vue/compiler-sfc] the >>> and /deep/ combinators have been deprecated. Use :deep() instead.
        :deep(.bread span){
            cursor: pointer!important;
        }
    }
    .r-contents img{
        width: 25px;
    }
}

</style>
