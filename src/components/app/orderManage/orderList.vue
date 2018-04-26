<template>
  <div>
    <div  v-if="isList">
      <el-form :inline="true" :model="goodsFormInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="goodsFormInline.search" placeholder="商品名/所属店铺"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
        <el-select v-model="goodsFormInline.region" placeholder="请选择活动区域">
          <el-option label="全部" value="all"></el-option>
          <el-option label="待发货" value="waitSend"></el-option>
          <el-option label="已发货" value="hasSend"></el-option>
          <el-option label="待评价" value="waitDiscuss"></el-option>
          <el-option label="已完成" value="complete"></el-option>
        </el-select>
      </el-form-item> 
        <el-form-item>
          <el-button type="primary" @click="searchData({type:'goodsFormInline',listData:'goodsListAll',whatType:'goods',whatName:'goodsName'})" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="orderListData"
        style="width: 100%"
        height="445px"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="单价">
                <span>{{ props.row.goods.goodsPrice }}</span>
              </el-form-item>
              <el-form-item label="顾客ID">
                <span>{{ props.row.customers._id }}</span>
              </el-form-item>
              <el-form-item label="顾客昵称">
                <span>{{props.row.customers.memberAcount}}</span>
              </el-form-item>
              <el-form-item label="顾客电话">
                <span>{{props.row.customers.memberPhone}}</span>
              </el-form-item>
              <el-form-item label="收货电话">
                <span>{{props.row.phone}}</span>
              </el-form-item>
              <el-form-item label="数量" v-if="true">
                <span>{{ props.row.counts }}</span>
              </el-form-item>
              <el-form-item label="收货地址" v-if="true">
                <span>{{props.row.address}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="所属店铺"
          prop="shops.shopName">
        </el-table-column>
        <el-table-column
          label="商品ID"
          prop="goods._id">
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="goods.goodsName">
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
              @click="willUpdata({type:'isList',data:scope.row,whatForm:'goodsForm'})">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="del({id:scope.row._id})">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="goodsCurpage"
        @current-change="goodsCurrentChange"
        layout="total,  prev, pager, next, jumper"
        :total="goodsTotal"
        :page-size="6">
      </el-pagination>
    </div>

    <el-form ref="form" :model="goodsForm" label-width="80px" v-else>
      <el-form-item label="订单号">
          <el-input v-model="goodsForm.id" disabled></el-input>
        </el-form-item>
      <el-form-item label="商品名称" >
        <el-input v-model="goodsForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="商品价格" >
        <el-input v-model="goodsForm.price" disabled></el-input>
      </el-form-item>  
      <el-form-item label="商品数量">
        <el-input v-model="goodsForm.count"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="goodsForm.region" placeholder="请选择活动区域">
          <el-option label="待发货" value="waitSend"></el-option>
          <el-option label="已发货" value="hasSend"></el-option>
          <el-option label="待评价" value="waitDiscuss"></el-option>
          <el-option label="已完成" value="complete"></el-option>
        </el-select>
      </el-form-item> 
      <el-form-item label="收货地址">
        <el-input v-model="goodsForm.address"></el-input>
      </el-form-item>
      <el-form-item label="顾客电话">
        <el-input v-model="goodsForm.phone"></el-input>
      </el-form-item>   
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="cancelUpdata({type:'isList'})">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  created() {
    this.getOrder();
  },
  watch: {},
  methods: {
    ...mapActions("order", ["getOrder", "upLoad", "del"]),
    ...mapMutations("order", ["willUpdata", "cancelUpdata","goodsCurrentChange","searchData"]),
    onSubmit() {
      this.upLoad({ type: "goodsForm", isDisplay: "isList" });
    }
  },
  computed: {
    ...mapState("order", ["orderListData", "isList", "goodsForm","goodsCurpage","goodsTotal","goodsFormInline"])
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
.el-input {
  width: 400px;
}

.el-pagination{
  display: flex;
  justify-content: center;
}

.demo-form-inline{
  margin-left: 30px;
}

.demo-form-inline .el-input{
  width: 200px;
}
</style>

