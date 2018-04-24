<template>
 <el-container style="background-color:#f6f7f9">    
    <el-aside width="200px" style="height:600px;background-color:#fff">
      <el-header style=" font-size: 12px;">
          <img src="../../assets/images/lovePetLogo.png" alt="" style="width:30px">
          <span class="logoText">爱宠邦</span>
      </el-header>
      <el-menu router>      
        <el-menu-item index="/info/userManage/userList">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理(平台)</span>
        </el-menu-item>
        <el-menu-item index="/info/customerManage/customerList">
          <i class="el-icon-menu"></i>
          <span slot="title">宠主管理(平台)</span>
        </el-menu-item>
        <el-menu-item index="/info/storeManage/storeList">
        <i class="el-icon-menu"></i>
        <span slot="title">门店管理(门店)</span>
        </el-menu-item>
        <el-menu-item index="/info/petManage/petList">
          <i class="el-icon-menu"></i>
          <span slot="title">宠物管理(门店)</span>
        </el-menu-item>
        <el-menu-item index="/info/commodityManage/commodityList">
          <i class="el-icon-menu"></i>
          <span slot="title">宠物周边管理(门店)</span>
        </el-menu-item>
         <el-menu-item index="/info/serverManage/serverList">
          <i class="el-icon-menu"></i>
          <span slot="title">服务管理(门店)</span>
        </el-menu-item>
        <el-menu-item index="/info/orderManage/orderList">
          <i class="el-icon-menu"></i>
          <span slot="title">订单管理(门店)</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
 </el-container>
</template>


<script>
export default {
  name: "info",
  data() {
    return {
      userName: sessionStorage.userName || "游客"
    };
  }
};
</script>

<style>
.el-header {
  background-color: #fff;
  color: #333;
  height: 61px;
  align-items: center;
  display: flex;
  align-items: center;
}

.logoText {
  font-size: 26px;
  margin-left: 5px;
}

.el-main{
  padding: 0;
}
</style>
