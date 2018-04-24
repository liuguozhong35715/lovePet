<template>
<el-container style="height: 500px; border: 1px solid #eee">
    <el-header style="text-align: center">
      <h1>注册页面</h1>
    </el-header>
    <el-main>
      <el-row :gutter="20" style="marginTop:80px">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple">
            <el-form  status-icon  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" >
                <el-input v-model="userName"></el-input>
              </el-form-item>
              <el-form-item label="密码" >
                <el-input type="password"  auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input type="password" auto-complete="off"></el-input>
              </el-form-item>            
              <el-form-item>
                <el-button type="primary" @click="reg">提交</el-button>
                <el-button >重置</el-button>
              </el-form-item>
            </el-form>          
          </div>
        </el-col>
      </el-row>
    </el-main>  
</el-container>
</template>


<script>
export default {
  name: "reg",
  data(){
      return{
          userName:""
      }
  },
  methods: {
    reg() {
      this.$router.push(`/login/${this.userName}`);
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
</style>