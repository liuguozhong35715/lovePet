<template>
  <div>
    <div v-if="isServerList">
      <el-form :inline="true" :model="serverFormInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="serverFormInline.search" placeholder="服务名称/所属店铺"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
        <el-select v-model="serverFormInline.region" placeholder="请选择活动区域">
          <el-option label="全部" value="all"></el-option>
          <el-option label="待服务" value="waitSend"></el-option>
          <el-option label="已服务" value="hasSend"></el-option>
          <el-option label="待评价" value="waitDiscuss"></el-option>
          <el-option label="已完成" value="complete"></el-option>
        </el-select>
      </el-form-item> 
        <el-form-item>
          <el-button type="primary" @click="searchData({type:'serverFormInline',listData:'ServerListAll',whatType:'servers',whatName:'serverType'})" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="orderServerData"
        style="width: 100%"
         height="445px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="服务价格">
                <span>{{props.row.servers.serverPrice}}</span>
              </el-form-item>
              <el-form-item label="顾客ID">
                <span>{{props.row.customers._id}}</span>
              </el-form-item>
              <el-form-item label="顾客昵称">
                <span>{{props.row.customers.memberAcount}}</span>
              </el-form-item>
              <el-form-item label="顾客电话">
                <span>{{props.row.customers.memberPhone}}</span>
              </el-form-item>
              <el-form-item label="预约电话">
                <span>{{props.row.phone}}</span>
              </el-form-item>
              <el-form-item label="服务时长"  v-if="true">
                <span>{{props.row.servers.serverTime}}</span>
              </el-form-item>
              <el-form-item label="预约时间"  v-if="true">
                <span>{{props.row.serverTime}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="所属店铺"
          prop="shops.shopName">
        </el-table-column>
        <el-table-column
          label="服务ID"
          prop="servers._id">
        </el-table-column>
        <el-table-column
          label="服务名称"
          prop="servers.serverType">
        </el-table-column>
        <el-table-column
          label="下单时间"
          prop="time">
        </el-table-column>
        <el-table-column
          label="订单状态"
          prop="statusCN">
        </el-table-column>
        <el-table-column
          label="总价"
          prop="total">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="willUpdata({type:'isServerList',data:scope.row,whatForm:'serverForm'})">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del({id:scope.row._id})">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="ServerCurpage"
        layout="total,  prev, pager, next, jumper"
        :total="ServerTotal"
        @current-change="serverCurrentChange"
        :page-size="6">
      </el-pagination>
    </div>

    <el-form ref="form" :model="serverForm" label-width="80px" v-else id="serverForm">
        <el-form-item label="订单号">
          <el-input v-model="serverForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="serverForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="serverForm.price" disabled></el-input>
        </el-form-item>
      <el-form-item label="预约时间">
        <el-input v-model="serverForm.count"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="serverForm.region" placeholder="请选择活动区域">
          <el-option label="待服务" value="waitSend"></el-option>
          <el-option label="已服务" value="hasSend"></el-option>
          <el-option label="待评价" value="waitDiscuss"></el-option>
          <el-option label="已完成" value="complete"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="顾客电话">
        <el-input v-model="serverForm.phone"></el-input>
      </el-form-item>       
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即修改</el-button>
          <el-button @click="cancelUpdata({type:'isServerList'})">取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  created() {},
  watch: {},
  methods: {
    ...mapActions("order", ["getOrder","upLoad","del"]),
    ...mapMutations("order", ["willUpdata", "cancelUpdata","serverCurrentChange","searchData"]),
    onSubmit() {
      this.upLoad({type:"serverForm",isDisplay:"isServerList"});
    }
  },
  computed: {
    ...mapState("order", ["orderServerData", "isServerList", "serverForm","ServerCurpage","ServerTotal","serverFormInline"])
  }
};
</script>

<style>
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



#serverForm .el-input{
  width: 400px;
}
</style>