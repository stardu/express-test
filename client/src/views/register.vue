<template>
<!-- 登录机界面 -->
  <div class="register">
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
              <el-button type='text' @click="toLogin">已有账户，立即登录</el-button>
          </el-row>
          <el-row type='flex' justify='center' style="margin-top:2%;">
              <el-button type='primary' @click="toRegister">注册</el-button>
          </el-row>
  </div>

</template>

<script>
export default {
  name: 'register',
  data () {
    return {
        user: '',
        password: '',
    }
  },
  methods:{
    toRegister(){
      this.$axios({
        url:'/api/register',
        method:'post',
        data:{
          user: this.user,
          paw:this.password
        }
      }).then((res)=>{
        if(res.data.err_code == 200){
          this.$message.success('注册成功！')
        }else{
          this.$message.error('注册失败！')
        }
      })
    },
    toLogin(){
       this.$router.push('/');
    },
  },
  created(){
    
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='scss' scoped>
    .register{
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -150px 0 0 -200px;
        width: 400px;
        height: 300px;
        border: 1px solid #008800;
    }
</style>