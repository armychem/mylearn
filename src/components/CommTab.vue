<template>
    <div class="tags">
        <el-tag v-for="(tag,index) in tags"
            :key="tag.name"
            :closable="tag.name !== 'myhome'"
            :disable-transitions="false"
            :effect=" $route.name === tag.name ? 'dark' : 'plain' "
            @click = "changeMenu(tag)"
            @close = "handleClose(tag, index)">
            {{tag.label}}
        </el-tag>
    </div>
</template>
<script>
import { useRoute ,useRouter} from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const tags = store.state.tabsList;
        const changeMenu = (item) => {
            router.push({
                name:item.name
            })
        }
        const handleClose = (tag, index) => {
            let length = tags.length - 1;
            // 出来vuex中的tabsList
            store.commit('closeTab',tag)
            //做第一个判断
            if(tag.name !== route.name ){
                return;
            }
            if( index === length ){
                router.push({
                    name: tags[index - 1].name
                })
            }else{
                router.push({
                    name: tags[index].name
                })
            }
        }
        //
        return{
            tags,
            changeMenu,
            handleClose
        };
    }
}
</script>
<style lang="less" scoped>
    .tags{
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        .el-tag{
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>