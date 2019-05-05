<template>
<!-- 登录机界面 -->
  <div class="home">
    <el-container>
        <el-header class="head">
            <el-row>
                <el-col style="padding:8px 60px;">
                   <el-col :span="4" style="font-size:18px;font-weight:bold;">后台管理系统</el-col>
                   <el-col :span="12" style="float:right;">
                       <el-col :span="9" :offset="2">欢迎，{{user}}</el-col>
                       <el-col :span="9" :offset="2">
                           <el-button type="text" style="color:white" @click="exit">退出</el-button>
                       </el-col>
                   </el-col>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="300px" style="padding：0；margin: 0;height:100%;">
                <el-menu
                default-active="2"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
                @open="handleOpen"
                @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="/home/form">
                    <i class="el-icon-menu"></i>
                    <span slot="title">表单</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>     
  </div>

</template>

<script>
export default {
  name: 'home',
  data () {
    return {
        user: '',
    }
  },
  methods:{
    exit(){
       this.$router.push('/');
       sessionStorage.setItem('token','')
    }
  },
  created(){
    this.user = sessionStorage.getItem('user');
    this.$axios({
        url:'/api/message',
        method:'post',

      }).then((res)=>{
        if(res.data.err_code == 200){

        }
      }) 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='scss' scoped>
    .head{
        color: white;
        background-color: #1d1d1f7d;
    } 
</style>