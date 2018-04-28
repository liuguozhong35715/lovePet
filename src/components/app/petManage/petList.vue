
<template>
<div>
  <div v-if="isAdd" >
    <el-table
      :data="tableData5"
     
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" >
            <el-form-item label="宠物图片">
                <div style=" width:100px;height:100px;border:1px  solid ">
                    <img  style=" width:100px;height:100px " :src = props.row.petImg alt="">
                </div>
            </el-form-item>
            <el-form-item label="品种">
              <span>{{ props.row.variety}}</span>
            </el-form-item>
            <el-form-item label="种类">
              <span>{{ props.row.kind }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="毛色">
              <span>{{ props.row.coatColor }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="kind">
      </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="updet(scope.row)"
            >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <div class="block">
    <span class="demonstration"></span>
  </div>
  </div>
  <div v-else>
   <el-form :model="formMsg" ref="formMsg" label-width="100px" class="demo-formMsg">
          <el-form   label-width="80px" :model="formMsg">
          <el-form-item label="门店管理"  style="width:500px">
              <el-input
                  placeholder="5ae1a36216886b0fbe29c62f"
                  v-model="input1"
                  :disabled="true">
              </el-input>
          </el-form-item>
          <el-form-item label="品种" name="variety" style="width:500px">
              <el-input v-model="formMsg.variety"></el-input>
          </el-form-item>
          <el-form-item label="种类" name="kind" style="width:500px" >
              <el-input v-model="formMsg.kind"></el-input>
          </el-form-item>
          <el-form-item label="毛色" name="coatColor"  style="width:500px" >
              <el-input v-model="formMsg.coatColor"></el-input>
          </el-form-item>
          <el-form-item label="性别">
          <el-select v-model="formMsg.gender" placeholder="请选择性别" style="width:420px" >
            <el-option label="公" value="公"></el-option>
            <el-option label="母" value="母"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="价格" name="price"  style="width:500px" >
              <el-input v-model="formMsg.price"></el-input>
          </el-form-item>
          <el-row>
              <el-form-item>
          <el-button type="primary" @click="edit2">修改</el-button>
          <el-button @click="resetForm('formMsg')">重置</el-button>
        </el-form-item>
          </el-row>
          </el-form>
          </el-form>
  </div>
</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "pet",
  data() {
    return {
      // formMsg: {
      //   id: "",
      //   variety: "",
      //   kind: "",
      //   gender: "",
      //   price: "",
      //   coatColor: "",
      //   img:""
      // }
    };
  },
  computed: {
    ...mapState("pet", ["tableData5", "isAdd", "formMsg"]) //获取仓库数据
    // ...mapMutations("pet",["add"])  //获取同步方法
  },
  methods: {
    async edit2() {
      await this.edit();
      this.getMsg();
    },
    ...mapActions("pet", ["getMsg", "edit"]), //获取异步方法
    ...mapMutations("pet", ["updet"]),
    Delete(index, row) {
      let id = row._id;
      this.$store.dispatch("pet/deletMsg", id);
      this.getMsg();
    }
  },
  created() {
    this.getMsg();
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
</style>