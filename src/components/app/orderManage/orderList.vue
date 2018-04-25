<template>
  <el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="单价">
            <span>xxx</span>
          </el-form-item>
          <el-form-item label="顾客ID">
            <span>xxx</span>
          </el-form-item>
          <el-form-item label="数量" v-if="false">
            <span>xxx</span>
          </el-form-item>
          <el-form-item label="收货地址" v-if="false">
            <span>xxx</span>
          </el-form-item>
          <el-form-item label="服务时长"  v-if="true">
            <span>xxx</span>
          </el-form-item>
          <el-form-item label="预约时间"  v-if="true">
            <span>xxx</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="所属店铺"
      prop="storeName">
    </el-table-column>
    <el-table-column
      label="商品ID"
      prop="commodityId">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="commodityName">
    </el-table-column>
    <el-table-column
      label="下单时间"
      prop="shoppingTime">
    </el-table-column>
    <el-table-column
      label="订单状态"
      prop="status">
    </el-table-column>
    <el-table-column
      label="总价"
      prop="total">
    </el-table-column>
  </el-table>
</template>


<script>
export default {
  data() {
      return {
        tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
      }
  }
}
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
</style>

