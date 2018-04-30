<template>
  <div>
    <div  v-if="updated">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="搜索：">
          <el-select v-model="formInline.type" placeholder="搜索类型..">
            <el-option label="姓名" value="memberName"></el-option>
            <el-option label="手机号码" value="memberPhone"></el-option>
            <el-option label="用户名" value="memberAcount"></el-option>
            <el-option label="会员卡" value="memberCard"></el-option>
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
        :data="rows"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                {{props.row.memberName}}
              </el-form-item>
              <el-form-item label="店铺 Id">
                {{props.row.memberName}}
              </el-form-item>
              <el-form-item label="注册日期">
                {{props.row.memberName}}
              </el-form-item>
              <el-form-item label="商品分类">
                {{props.row.memberName}}
              </el-form-item>
              <el-form-item label="店铺地址">
                {{props.row.memberName}}
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="登录名"
          prop="memberAcount">
          </el-table-column>
        <el-table-column
          align="center"
          label="头像">
           <template slot-scope="props">
             <img :src="props.row.header" alt="">
              </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="姓名（实名认证）"
          prop="memberName">
        </el-table-column>
        <el-table-column
          align="center"
          label="手机号"
          prop="memberPhone">
        </el-table-column>
        <el-table-column
          align="center"
          label="会员卡"
          prop="menberCard">
        </el-table-column>
        <el-table-column
          align="center"
          label="区域"
          prop="memberArea">
        </el-table-column>
        <el-table-column
          align="center"
          label="拥有宠物"
          prop="pet">
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
            <h2 style="padding:'30px 0 40px 10px';font-family:'yahei'">客户信息：</h2>
            <el-form :label-position="labelPosition" label-width="80px" ref="updForm" :model="formLabelAlign">
              <el-form-item label="用户名:">
                <el-input v-model="formLabelAlign.memberAcount"></el-input>
              </el-form-item>
              <el-form-item label="姓名:">
                <el-input v-model="formLabelAlign.memberName"></el-input>
              </el-form-item>
              <el-form-item label="手机:">
                <el-input v-model="formLabelAlign.memberPhone"></el-input>
              </el-form-item>
              <el-form-item label="图片:">
                <el-input v-model="formLabelAlign.memberImg"></el-input>
              </el-form-item>
              <el-form-item label="会员卡:">
                <el-input v-model="formLabelAlign.menberCard"></el-input>
              </el-form-item>
              <el-form-item label="积分:">
                <el-input v-model="formLabelAlign.memberPoint"></el-input>
              </el-form-item>
              <el-form-item label="地区:">
                <el-input v-model="formLabelAlign.memberArea"></el-input>
              </el-form-item>
              <el-form-item label="地址:">
                <el-input v-model="formLabelAlign.memberAdd"></el-input>
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
          id:"",
          memberAdd: '',
          memberAcount: '',
          memberArea: '',
          memberImg: '',
          memberName: '',
          memberPhone: '',
          memberPoint: '',
          menberCard: ''
        }
      }
    },
    computed:{
      ...mapState('customer',["eachPage", "curPage", "maxpage", "total","updated","rows"]),
    },
    methods:{
      ...mapActions('customer',["getMsg","del"]),
      ...mapMutations('customer',["setCurPage","setEachPage","del"]),
      onSubmit() {
        this.$store.dispatch("customer/getMsg",this.formInline)
      },     
      CurPage(curPage){
          this.$store.commit("customer/setCurPage",curPage)
          this.$store.dispatch("customer/getMsg")
      },
      EachPage(eachPage){
          this.$store.commit("customer/setEachPage",eachPage)
          this.$store.dispatch("customer/getMsg")
      },
      handleEdit(row) {
          this.$store.commit("customer/updated")
          this.formLabelAlign.id = row._id;
          this.formLabelAlign.memberAcount = row.memberAcount;
          this.formLabelAlign.memberAdd = row.memberAdd;
          this.formLabelAlign.memberArea = row.memberArea;
          this.formLabelAlign.memberImg = row.memberImg;
          this.formLabelAlign.memberName = row.memberName;
          this.formLabelAlign.memberPhone = row.memberPhone;
          this.formLabelAlign.memberPoint = row.memberPoint;
          this.formLabelAlign.menberCard = row.menberCard;
      },
      handleDelete(id){
        this.$store.dispatch("customer/del",id)
        this.$notify({
            title: '成功',
            message: '成功删除',
            type: 'success'
        });
      },
      submitForm() {
          this.$store.dispatch("customer/updateMsg",this.formLabelAlign)
          this.$store.commit("customer/updated")
      },
      resetForm(formName) {
        this.$store.commit("customer/updated")
      }
    },
    created(){
      this.$store.dispatch("customer/getMsg")
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














