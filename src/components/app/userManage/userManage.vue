<template>
    <el-tabs v-model="activeName" @tab-click="goToList">
        <el-tab-pane label="用户列表" name="userList" ><router-view></router-view></el-tab-pane>
        <el-tab-pane label="待审核列表" name="userCould" tab-click="goToCould"><router-view></router-view></el-tab-pane>
    </el-tabs> 
</template>

<script>
export default {
  name: "userManage",
  data() {
    return {
      activeName: "userList"
    };
  },
  methods: {
      goToList(tab, event) {
        this.$router.push(`/info/userManage/${tab.name}`);
      }
    }
};
</script>

<style>
.el-tabs__nav-scroll > div {
  height: 60px;
}

.el-tabs__nav-scroll {
  background-color: #ffffff;
}

.el-tabs__item {
  height: 60px;
  line-height: 60px;
}
</style>