<template>
 <el-container style="background-color:#f6f7f9">    
    <el-aside width="200px" :style="asideStyle" >
      <el-header style=" font-size: 12px; height: 71px;">
          <img src="../../assets/images/lovePetLogo.png" alt="" style="width:40px">
          <span class="logoText">爱宠邦<p class="logoEngText">LovePets System</p>
          </span>
      </el-header>
      <el-menu router>      
        <el-menu-item index="/info/userManage/userList" :disabled="isSuper">
          <i class="el-icon-service"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/info/customerManage/customerList" :disabled="isSuper">
          <i class="el-icon-setting"></i>
          <span slot="title">宠主管理</span>
        </el-menu-item>
        <el-menu-item index="/info/storeManage/storeList" :disabled="!isSuper">
        <i class="el-icon-menu"></i>
        <span slot="title">门店管理</span>
        </el-menu-item>
        <el-menu-item index="/info/petManage/petList" :disabled="!isSuper">
          <i class="el-icon-star-on"></i>
          <span slot="title">宠物管理</span>
        </el-menu-item>
        <el-menu-item index="/info/commodityManage/commodityList" :disabled="!isSuper">
          <i class="el-icon-goods"></i>
          <span slot="title">宠物商品</span>
        </el-menu-item>
         <el-menu-item index="/info/serverManage/serverList" :disabled="!isSuper">
          <i class="el-icon-time"></i>
          <span slot="title">服务管理</span>
        </el-menu-item>
        <el-menu-item index="/info/orderManage/orderList">
          <i class="el-icon-document"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
      <div id="userMsg">
        <img src="../../assets/images/lovePetLogo.png" alt="" style="width:25px;height:25px">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" style="color: #f56c6c;">
            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/">注销</el-dropdown-item>
            <el-dropdown-item command="/reg">注册新账号</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-main>
 </el-container>
</template>


<script>
export default {
  name: "info",
  data() {
    return {
      userName: sessionStorage.userName || "游客",
      asideStyle: {
        height: window.innerHeight + "px",
        backgroundColor: "#fff"
      },
      isSuper:true
    };
  },
  methods: {
    handleCommand(command) {
      this.$router.push(`${command}`);
    }
  },
  created() {
    if(sessionStorage.userType == "1"){
      this.isSuper = false
    }
  }
};
</script>

<style>
.el-header {
  background-color: #fff;
  color: #333;
  align-items: center;
  display: flex;
  align-items: center;
}

.logoText {
  font-size: 26px;
  margin-left: 20px;
  font-family: "黑体";
}

.logoEngText {
  font-size: 12px;
  color: lightgray;
  line-height: 12px;
  margin: 0;
}

.el-main {
  padding: 0;
}

.el-dropdown-link {
  cursor: pointer;
  color: #000;
  font-family: "黑体";
  font-weight: 700;
}
.el-icon-arrow-down {
  font-size: 12px;
}

#userMsg {
  position: absolute;
  right: 40px;
  top: 12px;
  display: flex;
  align-items: center;
}

#userMsg>img{
  margin-right: 12px;
  border-radius: 20px;
  border: 2px solid rgb(235, 226, 226);
  padding: 3px;
}

.el-menu-item {
  font-family: "方正准圆_GBK";
}

.el-tabs__item.is-active {
  color: #f56c6c;
}

.el-tabs__active-bar {
  background-color: #f56c6c;
}

.el-tabs__item:hover {
  color: #f56c6c;
}

.el-menu-item.is-active{
  color: #f56c6c;
}
</style>
