<template>
    <div class="searchLab">
      <el-form :inline="true" :model="formInfo">
        <el-form-item label="关键字：">
          <el-input v-model="formInfo.keyword"  placeholder="支持输入姓名进行搜索"  clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="dialogVisible = true">+新增</el-button>
    </div>
    <div class="table">
      <el-table :data="list" style="width: 100%"  border>
          <el-table-column
          v-for="(item,index) in listlabel"
          :key="index"
          :index="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : '180px'"
          align="center"
          fixed />
          <el-table-column fixed="right" align="center" min-width="180px" label="Operations">
            <template #default="scope">
              <el-button 
              type="primary" 
              size="small"
              @click="handleClick(scope.row)">
                编辑
              </el-button>
              <el-button type="danger" size="small"
              @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="config.total"
        @current-change="changepage"
        class="pagers mt-4"
      />
    </div>
    <el-dialog
    v-model="dialogVisible"
    :title="!actor ? '新增用户' : '编辑用户'"
    width="30%"
    :before-close="handleClose">
      <el-form
      :inline="true"
      :model="fromUser"
      ref="userform"
      :rules="rules">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="fromUser.name" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select
            v-model="fromUser.sex"
            placeholder="请选择"
            clearable
          >
            <el-option label="女" value="0" />
            <el-option label="男" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期"  prop="birth">
          <el-date-picker
            v-model="fromUser.birth"
            type="date"
            placeholder="请输入"
            clearable
          />
        </el-form-item>
        <el-form-item label="年龄"  prop="age">
          <el-input v-model.number="fromUser.age" placeholder="请输入年龄" clearable />
        </el-form-item>
        <el-form-item label="地址"  prop="addr">
          <el-input v-model="fromUser.addr" placeholder="请输入地址" clearable />
        </el-form-item>
        <el-row style="justify-content: flex-end;">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">
            确定
          </el-button>
        </el-row>
      </el-form>
      <!-- <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = true">
            确定
          </el-button>
        </div>
      </template> -->
    </el-dialog>
</template>
<script>
import { ref, defineComponent, getCurrentInstance, onMounted, reactive } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus'
  export default defineComponent({
    setup() {
      const { proxy } = getCurrentInstance();
      const list = ref([]);
      const listlabel = reactive(
        [
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'sexLabel',
            label: '性别'
          },
          
          {
            prop: 'age',
            label: '年龄'
          },
          {
            prop: 'birth',
            label: '出生日期',
            width: 200
          },
          {
            prop: 'addr',
            label: '住址',
            width: 320
          },
          
        ]
        
      );
      const config = reactive({
        total: 0,
        page: 1,
        name: ''
      });
      //点击分页
      const changepage = (page) => {
        console.log(page);
        config.page = page
        getUData(config);
      };
      
      //获取table数据
      const getUData = async (config) => {
        let res = await proxy.$api.getUserData(config)
        // console.log(res)
        list.value = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })
        config.total = res.count
      };
      //查询
      const formInfo = reactive({
        keyword: ''
      });
      const handleSearch = () => {
        config.name = formInfo.keyword
        getUData(config);
      };
      //控制模态框的显示隐藏
      const dialogVisible = ref(false)
      const handleClose = (done) => {
        ElMessageBox.confirm('确定关闭弹窗吗？')
          .then(() => {
            done()
            dialogVisible.value = false;
            proxy.$refs.userform.resetFields();
          })
          .catch(() => {
            // catch error
          })
      };
      //添加用户的数据
      const fromUser = reactive({
        name: '',
        sex: '',
        age: '',
        birth: '',
        addr: ''
      });
      //日期转换
      const timeFormat = (time) => {
        var time = new Date(time)
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        function add(m){
          return m < 10 ? "0" + m : m
        }
        return year + '-' + add(month) + '-' + add(date)
      };
      //表单验证
      const rules = reactive({
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'blur' },
          { type: 'number', message: '年龄必须是数字'}
        ],
        sex: [
          { required: true, message: '性别是必选项', trigger: 'blur' }
        ],
        birth: [
          { required: true, message: '出生日期是必选项', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
      });
      //添加用户
      const onSubmit = async () => {
        proxy.$refs.userform.validate( async (valid) => {
          if(valid){
            if(actor){
              fromUser.birth = timeFormat(fromUser.birth)
              let res = await proxy.$api.addUser(fromUser)
              if(res){
                dialogVisible.value = false;
                proxy.$refs.userform.resetFields();
              }
            }else{
              fromUser.birth = timeFormat(fromUser.birth)
              fromUser.sex === '男' ? (fromUser.sex = 1) : (fromUser.sex = 0)
              let res = await proxy.$api.editUser(fromUser);
              if(res){
                dialogVisible.value = false;
                proxy.$refs.userform.resetFields();
              }
            }
            getUData(config);
            
          }else{
            ElMessage({
              showClose: true,
              message:'请输入正确的内容',
              type: 'error'
            })
          }
        })
      };
      //取消
      const handleCancel = () => {
        dialogVisible.value = false;
        proxy.$refs.userform.resetFields();
      };
      //
      const actor = ref(false);
      //点击编辑
      const handleClick = (row) => {
        console.log(row)
        dialogVisible.value = true;
        actor.value = true;
        //浅拷贝
        row.sex === 0 ? (row.sex = '女') : (row.sex = '男')
        proxy.$nextTick(() => {
          Object.assign(fromUser, row)
        })
      };
      //点击删除
      const handleDelete =  (row) => {
        ElMessageBox.confirm('您确实删除吗？')
        .then( async () => {
          await proxy.$api.deleteUser({
            id: row.id
          });
          ElMessage({
            showClose:true,
            message: '删除成功！',
            type: 'success'
          })
          getUData(config);
        })
        .catch(() => {
          // catch error
        })
        
      }
      onMounted(() => {
        getUData(config);
        
        
      });
      return{
        list,
        listlabel,
        config,
        formInfo,
        dialogVisible,
        fromUser,
        rules,
        actor,
        timeFormat,
        changepage,
        handleClick,
        handleSearch,
        handleClose,
        onSubmit,
        handleCancel,
        handleDelete,

        
      }
    }
  })

</script>
<style lang="less" scoped>
.searchLab{
    display: flex;
    justify-content: space-between;
  }
  .table{
    height:calc(100% - 50px);
    position: relative;
    
    .el-table{
      height: calc(100% - 70px);
    }
    .pagers{
      position: absolute;
      left: 0;
      bottom: 25px;
    }
  }
</style>
