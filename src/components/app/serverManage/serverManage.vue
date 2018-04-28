<template>
    <el-tabs v-model="activeName" @tab-click="goToList">
        <el-tab-pane label="服务列表" name="serverList" ><router-view v-if="activeName=='serverList'"></router-view></el-tab-pane>
        <el-tab-pane label="新增服务" name="serverAdd"><router-view v-if="activeName=='serverAdd'"></router-view></el-tab-pane>
    </el-tabs> 
</template>

<script>
export default {
  name: "serverManage",
  data() {
    return {
      activeName: "serverList"
    };
  },
  methods: {
      goToList(tab, event) {
        this.$router.push(`/info/serverManage/${tab.name}`);
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