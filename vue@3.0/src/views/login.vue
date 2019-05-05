<template>
<!-- 登录机界面 -->
  <div class="login">
          <el-row style="margin-top:2%;">
              <el-col>
                  <el-col :span='2' :offset='1'>
                    <span>用户</span>
                  </el-col>
                  
                  <el-col :span='18' :offset='1'>
                      <el-input v-model="user"></el-input>
                  </el-col>
                  
              </el-col>
          </el-row>
          <el-row style="margin-top:2%;">
              <el-col>
                  <el-col :span='2' :offset='1'>
                    <span>密码</span>
                  </el-col>
                  
                  <el-col :span='18' :offset='1'>
                     <el-input v-model="password" show-password></el-input>
                  </el-col>
              </el-col>
          </el-row>
          <el-row type='flex' justify='left' style="margin-top:2%;">
              <el-button type='text' @click="toRegister">立即注册</el-button>
          </el-row>
          <el-row type='flex' justify='center' style="margin-top:2%;">
              <el-button type='primary' @click="toLogin">立即登录</el-button>
          </el-row>
  </div>

</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'login',
  data () {
    return {
        user: '',
        password: '',
    }
  },
  methods:{
    toRegister(){
        this.$router.push('/register');
    },
    toLogin(){
      this.$axios({
        url:'/api/login',
        method:'post',
        data:{
          user: this.user,
          paw:this.password
        }
      }).then((res)=>{
        if(res.data.err_code == 200){
            this.$message.success('登录成功！');
            sessionStorage.setItem("token",res.data.token);
            sessionStorage.setItem("user",this.user);
            setTimeout(()=>{
              this.$router.push('/home');
            },1000)
        }else{
          this.$message.error('登录失败！')
        }
      })
    },
  },
  created(){
    
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='scss' scoped>
    @import '../assets/scss/login.scss' 
</style>