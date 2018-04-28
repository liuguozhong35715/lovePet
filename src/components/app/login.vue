<template>
  <transition name="bounce">
    <el-container :style="loginMainStyle">
         <div id="content">
            <h1 style="margin-top:60px; font-family: Aharoni;margin-left: 5px;">Login LovePets</h1>
            <el-row style="border:1px solid transparent;border-radius: 5px;overflow: hidden;box-shadow: 3px 3px 2px rgb(201, 191, 191);">
              <el-col :span="10">
                <el-carousel height="420px">
                  <el-carousel-item v-for="item in imgUrl" :key="item">
                    <img :src="item" alt="" style="width:100%;height:420px">
                  </el-carousel-item>
                </el-carousel>
              </el-col>
              <el-col :span="14">
                <div id="rightContent">
                  <p><i class="el-icon-question"></i>忘记密码？点我找回</p>
                  <div id="rightContentForm">
                    <h2>Sign in to PetLoves</h2>
                    <h6>爱宠邦，宠你所爱！</h6>
                    <el-form  :model="formData" label-width="80px" label-position="left">
                      <el-form-item label="用户名：">
                        <el-input v-model="formData.userName" prefix-icon="el-icon-service" placeholder="手机号 / 邮箱 / 用户名"></el-input>
                      </el-form-item>
                      <el-form-item label="密码：">
                        <el-input v-model="formData.passWord" type="password" prefix-icon="el-icon-goods" placeholder="请输入密码"></el-input>
                      </el-form-item>
                      <p style="color: red;font-size: 12px;height:12px; text-align: center" v-if="isAcc">您的账号正在审核请耐心等待</p>
                      <p style="color: red;font-size: 12px;height:12px; text-align: center" v-else-if="isError">您的账号信息有误！请重新输入</p>
                      <p style="color: red;font-size: 12px;height:12px; text-align: center" v-else-if="isRefuse">您的账号审核未通过请重新注册</p>                      
                      <el-form-item>
                        <span class="toReg" @click="reg">没有账号？点我注册</span>
                        <el-button type="danger" @click="onSubmit" >登录</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </el-col>
            </el-row>
         </div>
    </el-container>    
  </transition>
</template>


<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      loginMainStyle: {
        height: window.innerHeight + "px",
        backgroundImage: "url(" + require("../../assets/loginBg.jpg") + ")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      },
      imgUrl: [
        "/loginImg/img1.jpg",
        "/loginImg/img2.jpg",
        "/loginImg/img3.jpg"
      ],
      formData: {
        userName: "",
        passWord: ""
      },
      isError: false,
      isAcc: false,
      isRefuse: false
    };
  },
  methods: {
    async onSubmit() {
      const { data } = await axios.get(
        `/loginAndReg?userName=${this.formData.userName}&passWord=${
          this.formData.passWord
        }`
      );
      if (data.length > 0 && this.formData.userName && this.formData.passWord) {
        if (data[0].userStatus === "未审核") {
          this.isAcc = true;
          this.isError = false;
          this.isRefuse = false;
        } else if (data[0].userStatus === "未通过") {
          this.isAcc = false;
          this.isError = false;
          this.isRefuse = true;
        } else {
          this.$router.push("/info");
          sessionStorage.userName = data[0].userAcount;
          sessionStorage.userType = data[0].userType;
          sessionStorage.userId = data[0]._id;
        }
      } else {
        this.isError = true;
        this.isAcc = false;
        this.isRefuse = false;
      }
    },
    reg() {
      this.$router.push("/reg");
    }
  }
};
</script>


<style>
#rightContent > p {
  margin: 0;
  text-align: end;
  color: gray;
  cursor: pointer;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  padding-right: 20px;
}

#rightContent .el-button--danger {
  width: 120px;
}

#rightContent .toReg {
  color: rgb(143, 143, 182);
  cursor: pointer;
  font-size: 12px;
  margin-right: 31px;
  font-family: "黑体";
}

#rightContent .toReg:hover {
  text-decoration: underline;
}

#rightContent {
  width: 100%;
  height: 420px;
  background-color: #fff;
}

#rightContentForm {
  width: 70%;
  margin: 67px auto 0;
}

#rightContentForm > * {
  margin: 0;
}

#rightContentForm > h2 {
  font-family: "Segoe Print";
}

#rightContentForm > h6 {
  margin-bottom: 40px;
  font-weight: normal;
  color: lightgray;
  font-size: 14px;
  font-family: "黑体";
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
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

#content {
  width: 850px;
  margin: auto;
  height: 100%;
}

.grid-content {
  background-color: black;
}
</style>
