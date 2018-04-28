<template>
<div>
  <div v-if="isList">
    <el-table
      :data="service"
      height="530"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="服务名称">
              <span>{{ props.row.serviceName }}</span>
            </el-form-item>
            <el-form-item label="服务类型">
              <span>{{ props.row.serviceType }}</span>
            </el-form-item>
            <!-- <el-form-item label="预约时间">
              <span>{{ props.row.serviceSchedule }}</span>
            </el-form-item>
            <el-form-item label="宠物规格">
              <span>{{ props.row.serviceCanFor }}</span>
            </el-form-item> -->
            <el-form-item label="服务时间">
              <span>{{ props.row.serviceTime }}</span>
            </el-form-item>
            <!-- <el-form-item label="服务等级">
              <span>{{ props.row.serviceLevel }}</span>
            </el-form-item> -->
            <el-form-item label="服务价格">
              <span>{{ props.row.servicePrice }}</span>
            </el-form-item>
            <!-- <el-form-item label="服务规格">
              <span>{{ props.row.serviceDetail }}</span>
            </el-form-item> -->
            <el-form-item label="id">
              <span>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="所属门店">
              <span>{{ props.row.theStores }}</span>
            </el-form-item>
            <!-- <el-form-item label="门店id">
              <span>{{ props.row.storeId }}</span>
            </el-form-item>
            <el-form-item label="门店地址">
              <span>{{ props.row.address }}</span>
            </el-form-item> -->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="服务名称"
        prop="serviceName">
      </el-table-column>
      <el-table-column
        label="服务类型"
        prop="serviceType">
      </el-table-column>
      <el-table-column
        label="操作"
        prop="desc">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row._id)"
            type="text"
            size="small">
            移除
          </el-button>
          <el-button
            @click.native.prevent="updateRow(scope.row)"
            type="text"
            size="small">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div v-else>
    <el-form ref="ruleForms" label-width="100px" class="demo-ruleForms">
      
      <el-form-item label="服务名称">
        <el-input style="width:45%" v-model="update.serviceName"></el-input>
      </el-form-item>

      <el-form-item label="服务类别" prop="serviceType">
        <el-input style="width:45%" v-model="update.serviceType"></el-input>
      </el-form-item>

      <el-form-item label="耗时(min)" prop="serviceTime">
        <el-col style="width:45%" :span="11">
          <el-radio-group v-model="update.serviceTime">
            <el-radio label="30"></el-radio>
            <el-radio label="60"></el-radio>
          </el-radio-group>
        </el-col>
      </el-form-item>

      <el-form-item label="价格(元)" prop="servicePrice">
        <el-input style="width:45%" v-model="update.servicePrice"></el-input>
      </el-form-item>

      <el-form-item label="所属门店" prop="theStores">
        <el-select style="width:45%" v-model="update.theStores" placeholder="请选择具体门店">
          <el-option label="抚琴东路店" value="抚琴东路店"></el-option>
          <el-option label="宽窄巷子店" value="宽窄巷子店"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primarys" @click="sure">修改</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</div>
</template>

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

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "server",
  methods: {
    ...mapActions("server", ["getPet"]),
    ...mapActions("server", ["deleteRow","sure"]),
    ...mapMutations("server", ["updateRow","resetForm"])
  },
  created() {
    this.getPet();
  },
  computed: {
    ...mapState("server", ["service","isList","update"])
  }
};
</script>

