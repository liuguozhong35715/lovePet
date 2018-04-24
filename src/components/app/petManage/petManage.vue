<template>
    <el-tabs v-model="activeName" @tab-click="goToList">
        <el-tab-pane label="宠物列表" name="petList" ><router-view></router-view></el-tab-pane>
    </el-tabs> 
</template>

<script>
export default {
  name: "petManage",
  data() {
    return {
      activeName: "petList"
    };
  },
  methods: {
      goToList(tab, event) {
        this.$router.push(`/info/petManage/${tab.name}`);
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