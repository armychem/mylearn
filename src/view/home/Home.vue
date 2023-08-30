<template>
    
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../../assets/pht.png" alt="">
                    <div class="userinfo">
                        <p class="name">admin</p>
                        <p class="role">超级管理员</p>
                    </div>
                </div>
                <div class="loginInfo">
                    <p>上次登录时间<span>2023-8-5</span></p>
                    <p>上次登录地点<span>北京</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" style="margin-top: 20px;" height="450px">
                <el-table :data="tableData"> 
                    <el-table-column 
                        v-for="(val, key) in tableheaderList" 
                        :key="key" 
                        :prop="key"
                        :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px;">
            <div class="countmodule">
                <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData">  
                    <el-icon style="color: #fff;" :style="{ background: item.color}">
                        <component
                            class="icon"
                            :is="item.icon"
                            ></component>
                    </el-icon>
                    <div class="prices">
                        <p class="numb">￥{{item.value}}</p>
                        <p class="nameb">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card >  
                <div ref="echart" style="height: 280px;"></div>
            </el-card>
            <div class="graph">
                <el-card>
                    <div ref="usercharts"  style="height: 240px;"></div>
                </el-card>
                <el-card>
                    <div ref="videocharts"  style="height: 240px;"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
    import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
    import axios from 'axios';
    import * as echarts from 'echarts';

    export default defineComponent({
        setup(){
            
            const { proxy } = getCurrentInstance()
            const tableData = ref([]);//
            const  tableheaderList = {
                name:'课程',
                todaybuy:'今日购买',
                monthbuy:'本月购买',
                totalbuy:'总购买'
            };
            //数据概览
            const countData = ref([]);
            //echarts图表数据渲染
            let xOptions = reactive({
                title: {
                    // text: 'Stacked Line'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                },
                yAxis: {
                    type: 'value',
                },
                series: []
            });
            let pieOptions = reactive({
                tooltip:{
                    trigger:"item"
                },
                color:[
                    "#of78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series:[],
            })
            let orderData = reactive({
                XData:[],
                series:[],
            })
            let userData = reactive({
                XData:[],
                series:[]
            })
            let videoData = reactive({
                series:[]
            })
            //获取数据
            const getTableList = async () => {
                //mock模拟
                //// await axios.get("https://www.fastmock.site/mock/cb4ce68e36492b2b4182ecd335babc43/api/home/getTableData").then((res) => {
                // await axios
                // .get("/home/getTableData")
                // .then((res) => {
                //     console.log(res);
                //     tableData.value = res.data.data.tableData;
                // })

                let res = await proxy.$api.getTableData()
                // console.log(res)
                tableData.value = res.tableData;
                countData.value = res.videoData;

                let order = res.orderData;
                let user = res.userData;
                let video = res.videoData;
                // console.log(order)
                orderData.XData = order.date;
                const keyarr = Object.keys(order.data[0])
                const series = []
                keyarr.forEach((key) => {
                    series.push({
                        name:key,
                        data:order.data.map((item) => item[key]),
                        type:"line",
                    })
                })
                orderData.series = series;
                xOptions.xAxis.data = orderData.XData;
                xOptions.series = orderData.series;
                //折线图进行渲染
                let hecharts = echarts.init(proxy.$refs['echart']);
                hecharts.setOption(xOptions);
                //柱状图渲染

                userData.XData = user.map((item) => item.data);
                userData.series = [
                    {
                        name: '新增用户',
                        data: user.map((item) => item.new),
                        type: 'bar',

                    },
                    {
                        name: '活跃用户',
                        data: user.map((item) => item.active),
                        type: 'bar',
                        
                    }
                ];
                xOptions.xAxis.data = userData.XData;
                xOptions.series = userData.series;
                let uecharts = echarts.init(proxy.$refs['usercharts']);
                uecharts.setOption(xOptions);
                //饼状图渲染
                videoData.series = [
                    {
                        data: video,
                        type: 'pie'
                    }
                ]
                pieOptions.series = videoData.series
                let pcharts = echarts.init(proxy.$refs["videocharts"])
                pcharts.setOption(pieOptions);
            };
            
            onMounted(() => {
                getTableList();
            });
            return{
                tableData,
                tableheaderList,
                countData,
            }
        }
    });
</script>
<style lang="less" scoped>
.home{
    .user{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #bfbfbf;
        padding-bottom: 20px;
        margin-bottom: 20px;
        img{
            width: 75px;
            height: 75px;
            border-radius: 50%;
            margin-right: 40px;
        }
    }
    .loginInfo{
        p{
            line-height: 30px;
            font-size: 14px;
            color: #999;
            span{
                color: #666;
                margin-left: 50px;
            }
        }
    }
    .countmodule{
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .el-card{
            width: 32%;
            margin-bottom: 10px;
            
        }
        .el-icon{
            width: 80px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            svg{
                width: 2rem;
                height: 2rem;
            }
        }
        .prices{
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .munb{
                font-size: 30px;
                margin-bottom: 10px;
            }
            .nameb{
                font-size: 14px;
                text-align: center;
                color: #999
            }
        }
    }
    .graph{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        .el-card{
            width: 48%;
        }
    }
}
</style>