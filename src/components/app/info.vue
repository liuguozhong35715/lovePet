<template>
 <el-container style="height: 600px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '3']" router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>临时占用</template>
        <el-menu-item-group>
          <template slot="title">列表类</template>
          <el-menu-item index="/info/todolist">待办列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="表格类">
          <el-menu-item index="/info/shoppingCar">购物清单</el-menu-item>
          <el-menu-item index="/info/emp">员工清单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-setting"></i>电影管理</template>        
          <el-menu-item index="2-1"><i  class="el-icon-edit"></i>新增电影</el-menu-item>
          <el-menu-item index="2-2" ><i  class="el-icon-view"></i>电影列表</el-menu-item>             
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>影院管理</template>
          <el-menu-item index="2-1" ><i  class="el-icon-edit"></i>新增影院</el-menu-item>
          <el-menu-item index="2-2" ><i  class="el-icon-view"></i>影院列表</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>影厅管理</template>
          <el-menu-item index="2-1"><i  class="el-icon-edit"></i>新增影厅</el-menu-item>
          <el-menu-item index="2-2" ><i  class="el-icon-view"></i>影厅列表</el-menu-item>
      </el-submenu>
       <el-menu-item index="/info/LayoutManagement">
        <i class="el-icon-star-on"></i>
        <span slot="title">排片管理</span>
      </el-menu-item>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
          <el-menu-item index="2-1"><i  class="el-icon-edit"></i>新增用户</el-menu-item>
          <el-menu-item index="2-2"><i  class="el-icon-view"></i>用户列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{userName}}</span>
    </el-header>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>


<script>
export default {
  name: "info",
  data(){
    return{
      userName:sessionStorage.userName || "游客"
    }
  }
};
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
.el-aside {
  color: #333;
}
</style>
