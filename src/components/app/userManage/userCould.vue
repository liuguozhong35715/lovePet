<template>
<div>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="搜索：">
      <el-select v-model="formInline.type" placeholder="搜索类型..">
        <el-option label="姓名" value="userName"></el-option>
        <el-option label="手机号码" value="userPhone"></el-option>
        <el-option label="用户名" value="userAcount"></el-option>
        <el-option label="身份" value="userType"></el-option>
      </el-select> 
    </el-form-item>
    <el-form-item>
      <el-input v-model="formInline.text" placeholder="内容.."></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="filterType"
    style="width: 100%">

    <el-table-column
      align="center"
      label="登录名"
      prop="userAcount">
      </el-table-column>
    <el-table-column
      align="center"
      label="头像"
      prop="head">
      <!-- <image src='{{head}}'/> -->
    </el-table-column>
    <el-table-column
      align="center"
      label="店主姓名"
      prop="userName">
    </el-table-column>
    <el-table-column
      align="center"
      label="手机号"
      prop="userPhone">
    </el-table-column>
    <el-table-column
      align="center"
      label="邮箱"
      prop="userMail">
    </el-table-column>
    <el-table-column
      align="center"
      label="状态"
      prop="userStatusChn">
    </el-table-column>
    <el-table-column
      align="center"
      label="身份"
      prop="userTypeChn">
    </el-table-column>
    <el-table-column
      align="center"
      width="260px"
      label="操作"
    >
      <template slot-scope="scope">
      <el-button
          icon="el-icon-success"
          size="mini"
          type="primary"
          @click="handleSuc(scope.row._id)">通过</el-button>
        <el-button
          icon="el-icon-error"
          size="mini"
          type="danger"
          @click="handleFail(scope.row._id)">未通过</el-button>
      </template>
    </el-table-column>
  </el-table> 

  <div class="block">
      <el-pagination
          @size-change="EachPage"
          @current-change="CurPage"
          :current-page="curPage"
          :page-sizes="[ 10, 15, 20]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
  </div>
</div>
</template>
<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  export default {
    name:"userList",
    data() {
      return {
        formInline: {
          type: '',
          text: ''
        }
      }
    },
    computed:{
      ...mapState('user',["eachPage", "curPage", "maxpage", "total"]),
      ...mapGetters("user",["filterType"])
    },
    methods:{
      ...mapActions('user',["getMsg","del"]),
      ...mapMutations('user',["setCurPage","setEachPage","del"]),
      handleFail(id){
        this.$store.dispatch("user/updateMsg",{id,userStatus:"2"})
        this.$notify({
            title: '提示',
            message: '已拒绝',
            type: 'warning'
        });
      },
      onSubmit() {
        this.$store.dispatch("user/getMsg",this.formInline.user)
      },     
      CurPage(curPage){
          this.$store.commit("user/setCurPage",curPage)
          this.$store.dispatch("user/getMsg")
      },
      EachPage(eachPage){
          this.$store.commit("user/setEachPage",eachPage)
          this.$store.dispatch("user/getMsg")
      },
      handleSuc(id) {
          this.$store.dispatch("user/updateMsg",{id,userStatus:"1"})
          this.$notify({
              title: '提示',
              message: '已通过',
              type: 'success'
          });
      }
    },
    created(){
      this.$store.dispatch("user/getMsg")
      // this.getMsg()
    }
  }
</script>
<style>
  .el-pagination{
    display: flex;
    justify-content: center;
  }
  .demo-form-inline{
    padding-left: 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>














