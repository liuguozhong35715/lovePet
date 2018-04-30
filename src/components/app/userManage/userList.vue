<template>
  <div>
    <div  v-if="updated">
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
        style="width: 100%"
        height="445px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                {{props.row.shop}}
              </el-form-item>
              <el-form-item label="店铺 Id">
                {{props.row.shop}}
              </el-form-item>
              <el-form-item label="注册日期">
                {{props.row.shop}}
              </el-form-item>
              <el-form-item label="商品分类">
                {{props.row.shop}}
              </el-form-item>
              <el-form-item label="店铺地址">
                {{props.row.shop}}
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="登录名"
          prop="userAcount">
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

      <el-table
        :data="filterType"
        style="width: 100%">
        <el-table-column
          align="center"
          label="身份">         
        </el-table-column>
      </el-table>
        
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
              icon="el-icon-edit"
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table> 

      <div class="block">
          <el-pagination
              @size-change="EachPage"
              @current-change="CurPage"
              :current-page="curPage"
              :page-sizes="[10, 15, 20]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
      </div>
    </div>
    <div v-else>
      <el-row>
        <el-col :span="10" :offset="5">
            <h2 style="padding:'30px 0 40px 10px';font-family:'yahei'">更新用户信息</h2>
            <el-form :label-position="labelPosition" label-width="80px" ref="updForm" :model="formLabelAlign">
              <el-form-item label="用户名:">
                <el-input v-model="formLabelAlign.userAcount"></el-input>
              </el-form-item>
              <el-form-item label="姓名:">
                <el-input v-model="formLabelAlign.userName"></el-input>
              </el-form-item>
              <el-form-item label="手机:">
                <el-input v-model="formLabelAlign.userPhone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:">
                <el-input v-model="formLabelAlign.userMail"></el-input>
              </el-form-item>
              <el-form-item label="身份:">
                <el-input v-model="formLabelAlign.userType"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">立即修改</el-button>
                <el-button @click="resetForm">取消</el-button>
              </el-form-item>
            </el-form>
        </el-col>
      </el-row>
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
        },
        labelPosition: 'left',
        formLabelAlign: {
          userStatus:"",
          id:"",
          userName: '',
          userPhone: '',
          userMail: '',
          userAcount: '',
          userType: ''
        }
      }
    },
    computed:{
      ...mapState('user',["eachPage", "curPage", "maxpage", "total","updated"]),
      ...mapGetters("user",["filterType"])
    },
    methods:{
      ...mapActions('user',["getMsg","del"]),
      ...mapMutations('user',["setCurPage","setEachPage","del"]),
      onSubmit() {
        this.$store.dispatch("user/getMsg",this.formInline)
        
      },     
      CurPage(curPage){
          this.$store.commit("user/setCurPage",curPage)
          this.$store.dispatch("user/getMsg")
      },
      EachPage(eachPage){
          this.$store.commit("user/setEachPage",eachPage)
          this.$store.dispatch("user/getMsg")
      },
      handleEdit(row) {
          this.$store.commit("user/updated")
          this.formLabelAlign.id = row._id;
          this.formLabelAlign.userStatus = row.userStatus;
          this.formLabelAlign.userName = row.userName;
          this.formLabelAlign.userPhone = row.userPhone;
          this.formLabelAlign.userMail = row.userMail;
          this.formLabelAlign.userAcount = row.userAcount;
          this.formLabelAlign.userType = row.userType;
      },
      handleDelete(id){
         this.$store.dispatch("user/del",id)
          this.$notify({
              title: '成功',
              message: '成功删除',
              type: 'success'
          });
      },
      submitForm() {
          this.$store.dispatch("user/updateMsg",this.formLabelAlign)
          console.log(123)
          this.$store.commit("user/updated")
      },
      resetForm(formName) {
        this.$store.commit("user/updated")
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














