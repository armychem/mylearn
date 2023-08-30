<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统登陆</span>
            </div>
            <el-form class="el-form" label-width="80px" :model="loginform" ref="form" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginform.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginform.password"></el-input>
                </el-form-item>
                <el-form-item class="loginbtn">
                    <el-button type="primary" @click="Login()">登录</el-button>
                </el-form-item>
                
            </el-form>
        </el-card>
    </div>
</template>
<script> 
    import { ref,reactive, defineComponent, getCurrentInstance} from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore  } from 'vuex'
    export default defineComponent({
        setup(){
            const loginform = reactive({
                username:'admin',
                password:'123456'
            });
            const rules = reactive({
                username:[{
                    required:true,
                    message: '账号不能为空',
                    trigger: 'blur'
                }],
                password:[{
                    required:true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }],
            });
            const router = useRouter();
            // const proxy = getCurrentInstance().proxy;
            const { proxy } = getCurrentInstance();
            const store = useStore();
            const Login = async () => {
                let res = await proxy.$api.getMenu(loginform)
                console.log(res,"菜单")
                store.commit('setMenu', res.menu)
                // console.log(router.options)
                store.commit('addMenu', router)
                // store.commit("setToken", router)
                router.push({
                    name: 'myhome'
                })
                
            };
            return {
                loginform,
                rules,
                Login
            }
        }
    })
</script>
<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    background: #409eff;
    position: absolute;
    display: flex;
    .box-card{
        width: 450px;
        margin: auto;
        .clearfix{
            text-align: center;
            margin-bottom: 20px;
        }
        .loginbtn{
            :deep .el-form-item__content{
                justify-content: center!important;
                margin-left: 0!important;
            }
            
            
        }
    }
}
</style>