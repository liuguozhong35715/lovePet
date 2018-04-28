<template>
  <el-container :style="regMainStyle">
      <div id="regContent">
        <el-row style="height:100%;">
          <el-col :span="16" style="height:100%;">
            <div id="regContentMain">
              <p class="title">欢迎加入我们</p>
              <p class="smallTitle">爱宠邦,宠你所爱</p>
              <el-form label-position="left" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户昵称" prop="userAcount">
                  <el-input  v-model="ruleForm2.userAcount" auto-complete="off"></el-input>
                </el-form-item>                
                <el-form-item label="密码" prop="userPwd">
                  <el-input type="password" v-model="ruleForm2.userPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="userName">
                  <el-input  v-model="ruleForm2.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="userPhone">
                  <el-input  v-model="ruleForm2.userPhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="userMail">
                  <el-input  v-model="ruleForm2.userMail" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="submitForm('ruleForm2')"  icon="el-icon-edit-outline">注册</el-button>
                  <el-button @click="resetForm('ruleForm2')" icon="el-icon-refresh">重置</el-button>
                </el-form-item>
              </el-form>
              <p class="footer">&copy;2018  京icp证070791号 京公网安备11010502025545号</p>
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
import axios from "axios";
export default {
  name: "reg",
  data() {
    var validateAcount = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        const  {data}  = await axios.get(`/loginAndReg/reg?type=userAcount&userAcount=${this.ruleForm2.userAcount}`);
        
        if(data.status){
           callback();
        }else{
          callback(new Error("该昵称已存在"));
        }       
      }
    };
    var validatePhone = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入联系电话"));
      } else {
        if(/^[1]\d{10}$/.test(this.ruleForm2.userPhone)){
          const  {data}  = await axios.get(`/loginAndReg/reg?type=userPhone&userPhone=${this.ruleForm2.userPhone}`);
          
          if(data.status){
            callback();
          }else{
            callback(new Error("该手机号码已存在"));
          } 
        }else{
           callback(new Error("您的手机号码格式不正确"));
        }              
      }
    };
     var validateMail = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if(/[\w.-]+@([0-9a-zA-Z\w-]+\.)+[0-9a-zA-Z]{2,8}/.test(this.ruleForm2.userMail)){
          const {data}  = await axios.get(`/loginAndReg/reg?type=userMail&userMail=${this.ruleForm2.userMail}`);          
          if(data.status){
            callback();
          }else{
            callback(new Error("该邮箱已存在"));
          } 
        }else{
           callback(new Error("您的邮箱格式不正确"));
        }              
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入真实姓名"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.userPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      regMainStyle: {
        height: window.innerHeight + "px",
        backgroundImage: "url(" + require("../../assets/loginBg.jpg") + ")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      },
      ruleForm2: {
        userAcount:"",
        userPhone:"",
        userMail:"",
        userPwd: "",
        checkPass: "",
        userName: ""
      },
      rules2: {
        userAcount: [
          {
            validator: validateAcount,
            trigger: "blur"
          }
        ],
        userPhone: [
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        userMail: [
          {
            validator: validateMail,
            trigger: "blur"
          }
        ],
        userName: [
          {
            validator: validateName,
            trigger: "blur"
          }
        ],
        userPwd: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate( async (valid) => {
          if (valid) {
            const {data}  = await axios.post(`/loginAndReg`,{
              userAcount:this.ruleForm2.userAcount,
              userPhone:this.ruleForm2.userPhone,
              userMail:this.ruleForm2.userMail,
              userPwd:this.ruleForm2.userPwd,
              userName:this.ruleForm2.userName,});
            this.$router.push("/waitCheck");
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>

<style>
#regContent {
  width: 70%;
  height: 90%;
  background-color: white;
  margin: auto;
  box-shadow: 3px 3px 2px rgb(201, 191, 191);
  border-radius: 5px;
}

#regContentMain{
  width: 60%;
  margin: auto
}

#regContentMain .title{
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 5px;
  font-family: "黑体";
  line-height: 26px;
}
#regContentMain .smallTitle{
  margin-top: 0;
  margin-bottom: 25px;
  font-weight: normal;
  color: rgb(172, 171, 171);
  font-size: 12px;
  font-family: "黑体";
}
#regContentMain .footer{
   font-weight: normal;
  color: rgb(172, 171, 171);
  font-size: 12px;
  font-family: "黑体";
  text-align: center;
}
</style>