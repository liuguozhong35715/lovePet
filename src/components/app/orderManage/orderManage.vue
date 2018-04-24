<template>
    <el-tabs v-model="activeName" @tab-click="goToList">
        <el-tab-pane label="宠物周边订单列表" name="orderList" ><router-view></router-view></el-tab-pane>
        <el-tab-pane label="服务订单列表" name="orderServerList"><router-view></router-view></el-tab-pane>
        <el-tab-pane label="宠物订单列表" name="orderPetList"><router-view></router-view></el-tab-pane>
    </el-tabs> 
</template>

<script>
export default {
  name: "orderManage",
  data() {
    return {
      activeName: "orderList"
    };
  },
  methods: {
      goToList(tab, event) {
        this.$router.push(`/info/orderManage/${tab.name}`);
      }
    }
};
</script>

<style>
.el-tabs__nav-scroll>div{
    height:60px;
}

.el-tabs__nav-scroll{
    background-color: #ffffff;
}

.el-tabs__item{
    height: 60px;
    line-height: 60px;
}
</style>