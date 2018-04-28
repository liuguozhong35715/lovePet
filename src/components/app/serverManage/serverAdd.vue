<template>
  <div>
    <div v-if="isAdd">
      <el-form :model="add" :rules="rules" ref="add" label-width="100px" class="demo-add">

        <el-form-item label="服务名称" prop="serviceName">
          <el-input style="width:45%" v-model="add.serviceName"></el-input>
        </el-form-item>

        <el-form-item label="服务类别" prop="serviceType">
          <el-input style="width:45%" v-model="add.serviceType"></el-input>
        </el-form-item>

        <el-form-item label="耗时(min)" prop="serviceTime">
          <el-col style="width:45%" :span="11">
            <el-radio-group v-model="add.serviceTime">
              <el-radio label="30"></el-radio>
              <el-radio label="60"></el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>

        <el-form-item label="价格(元)" prop="servicePrice">
          <el-input style="width:45%" v-model="add.servicePrice"></el-input>
        </el-form-item>
        
        <el-form-item label="所属门店" prop="theStores">
          <el-select style="width:45%" v-model="add.theStores">
            <el-option label="抚琴东路店" value="抚琴东路店"></el-option>
            <el-option label="宽窄巷子店" value="宽窄巷子店"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('add')">增加</el-button>
          <el-button @click="resetForm('add')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="adddiv" v-else>
      <h1>Increase Service Success</h1>
      <el-button type="primary" @click="sureadd">继续增加</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        id: [
          {
            required: true,
            message: "请输入服务ID",
            trigger: "blur"
          }
        ],
        serviceName: [
          {
            required: true,
            message: "请输入服务名称",
            trigger: "blur"
          }
        ],
        serviceType: [
          {
            required: true,
            message: "请输入服务类别",
            trigger: "blur"
          }
        ],
        serviceSchedule: [
          {
            required: true,
            message: "请输入服务时段",
            trigger: "blur"
          }
        ],
        serviceCanFor: [
          {
            required: true,
            message: "请输入适用规格",
            trigger: "blur"
          }
        ],
        serviceDetial: [
          {
            required: true,
            message: "请输入服务规格",
            trigger: "blur"
          }
        ],
        serviceTime: [
          {
            required: true,
            message: "请输入服务耗时",
            trigger: "blur"
          }
        ],
        serviceLevel: [
          {
            required: true,
            message: "请输入服务等级",
            trigger: "blur"
          }
        ],
        servicePrice: [
          {
            required: true,
            message: "请输入服务价格",
            trigger: "blur"
          }
        ],
        theStores: [
          {
            required: true,
            message: "请输入所属门店",
            trigger: "blur"
          }
        ],
        storesId: [
          {
            required: true,
            message: "请输入所属门店ID",
            trigger: "blur"
          }
        ],
        soresAddress: [
          {
            required: true,
            message: "请输入所属门店地址",
            trigger: "blur"
          }
        ],
        manageId: [
          {
            required: true,
            message: "请输入管理员ID",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapActions("server", ["submitForm"]),
    ...mapMutations("server", ["sureadd"])
  },
  // created() {
  //   this.submitForm();
  // },
  computed: {
    ...mapState("server", ["add", "isAdd"])
  }
};
</script>

<style>
  .adddiv{
    text-align: center;
    margin-top: 20%;
    color: #409EFF;
  }
</style>
