<template>
    <el-tabs v-model="activeName" @tab-click="goToList">
        <el-tab-pane label="宠物周边列表" name="commodityList" ><router-view></router-view></el-tab-pane>
    </el-tabs> 
</template>

<script>
export default {
  name: "commodityManage",
  data() {
    return {
      activeName: "commodityList"
    };
  },
  methods: {
      goToList(tab, event) {
        this.$router.push(`/info/commodityManage/${tab.name}`);
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