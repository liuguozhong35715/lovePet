<template>
  <el-container :style="waitMainStyle">
      <div id="waitContent">
        <el-row style="height:100%;">
          <el-col :span="16" style="height:100%;">
            <div style="
                display: flex;
                align-items: center;
                height: 100%;
                width: 100%;
                flex-wrap:wrap; ">
                <el-steps :active="1" align-center finish-status="success" style="width: 100%;">
                    <el-step title="注册" description="恭喜你完成注册"></el-step>
                    <el-step title="审核中" description="您的账号正在审核中，请耐心等待"></el-step>
                    <el-step title="完成注册" ></el-step>
                </el-steps>
                <el-button type="danger" @click="onSubmit" >返回登录界面</el-button>                  
            </div>
        </el-col>
          <el-col :span="8" style="height:100%;">
              <img src="/loginImg/imgReg_03.png" alt="" style="width:100%;height:100%">
          </el-col>
        </el-row>
      </div>
  </el-container>
</template>


<script>
export default {
  name: "waitCheck",
  data(){
      return{
         waitMainStyle:{
             height: window.innerHeight + "px",
             backgroundImage: "url(" + require("../../assets/loginBg.jpg") + ")",
             backgroundSize:"100% 100%",
             backgroundRepeat:"no-repeat"
          }
      }
  },
  methods: {
    onSubmit(){
        this.$router.push("/");
    }
  }
};
</script>

<style>
#waitContent{
     width: 70%;
    height: 90%;
    background-color: white;
    margin: auto;
    box-shadow: 3px 3px 2px rgb(201, 191, 191);
    border-radius: 5px;
     position: relative;
}

#waitContent .el-button{
    position: absolute;
    top:65%;
    left:27%;
}
</style>