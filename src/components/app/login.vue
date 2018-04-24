<template>
  <transition name="bounce">
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-header style="text-align: center">
          <h1>登录页面</h1>
        </el-header>
        <el-main>
          <el-row :gutter="20" style="marginTop:80px">
            <el-col :span="12" :offset="6">
              <div class="grid-content bg-purple">
                <el-form  status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="用户名">
                    <el-input  v-model="username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" >
                    <el-input type="password"  auto-complete="off"></el-input>
                  </el-form-item>         
                  <el-form-item>
                    <el-button type="primary" @click="login">确认登录</el-button>
                    <el-button type="primary" @click="reg">注册</el-button>
                  </el-form-item>
                </el-form>          
              </div>
            </el-col>
          </el-row>
        </el-main>  
    </el-container>    
  </transition>
</template>


<script>
export default {
  name: "login",
  data(){
     return{
          username: this.$route.params.username
     }
  },
  methods: {
    login() {
      sessionStorage.userName= this.username;
      this.$router.push("/Info");    
    },
    reg() {
      this.$router.push("/register");
    }
  }
};
</script>


<style>
p {
  width: 240px;
  display: flex;
  justify-content: space-between;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
