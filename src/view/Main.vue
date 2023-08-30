<template>
    <div class="common-layout">
        <el-container>  
                <comm-aside/>
            <el-container>
                <el-header>
                    <comm-top/>
                </el-header>
                <comm-tab/>
                <el-main class="laymain">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import { defineComponent } from 'vue'
    import CommAside from '../components/CommAside.vue';
    import CommTop from '../components/CommTop.vue';
    import CommTab from '../components/CommTab.vue';

    
    export default defineComponent({
        setup(){
            return{

            }
        },
        components:{
            CommTop,
            CommAside,
            CommTab
        }
    })
</script>
<style>
    .el-container{
        height: 100%;
    }
    .common-layout{
        height: 100%;
        & > .el-container{
            height: 100%;
            & > .el-aside{
                height: 100%;
            }
        }
        .laymain{
            height: calc(100% - 100px);
        }
    }
</style>
