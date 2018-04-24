<template>
    <el-tabs v-model="activeName" @tab-click="goToList">
        <el-tab-pane label="宠主列表" name="customerList" ><router-view></router-view></el-tab-pane>
    </el-tabs> 
</template>

<script>
export default {
  name: "customerManage",
  data() {
    return {
      activeName: "customerList"
    };
  },
  methods: {
      goToList(tab, event) {
        this.$router.push(`/info/customerManage/${tab.name}`);
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