<template>
  <div>
    <div v-if="isList">
      <el-form :model="formLabelAlign" ref="formLabelAlign" label-width="100px" class="demo-formLabelAlign">
          <el-form   label-width="80px" :model="formLabelAlign">
          <el-form-item label="门店管理"  style="width:500px">
              <el-input
                  v-model="formLabelAlign.inputID"
                  :disabled="true">
              </el-input>
          </el-form-item>
          <el-form-item label="品种" name="variety" style="width:500px">
              <el-input v-model="formLabelAlign.variety"></el-input>
          </el-form-item>
          <el-form-item label="种类" name="kind" style="width:500px" >
              <el-input v-model="formLabelAlign.kind"></el-input>
          </el-form-item>
          <el-form-item label="毛色" name="coatColor"  style="width:500px" >
              <el-input v-model="formLabelAlign.coatColor"></el-input>
          </el-form-item>
          <el-form-item label="性别">
          <el-select v-model="formLabelAlign.gender" placeholder="请选择性别" style="width:420px" >
            <el-option label="公" value="公"></el-option>
            <el-option label="母" value="母"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="价格" name="price"  style="width:500px" >
              <el-input v-model="formLabelAlign.price"></el-input>
          </el-form-item>
          <el-row>
              <el-form-item>
          <el-button type="primary" @click="submitForm">新增</el-button>
          <el-button @click="resetForm('formLabelAlign')">重置</el-button>
        </el-form-item>
          </el-row>
          </el-form>
          </el-form>
    </div>
    <div v-else>
      <el-upload
        class="upload-demo"
        action="pets/upload"
        :data="postId"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>        
      </el-upload>
      <el-button type="primary" style="margin-top:20px;" @click="submitFanhui()">返回上一级</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "petAdd",
  data() {
    return {
      
      formLabelAlign: {
        id: "",
        variety: "",
        kind: "",
        gender: "",
        price: "",
        coatColor: "",
        img:"",
        inputID: sessionStorage.userId,
      }
    };
  },
  computed: {
    ...mapState("pet",["dynamicValidateForm","input1","isList","postId"]) , //获取仓库数据
    // ...mapMutations("pet",["add"])  获取同步方法
  },
  methods: {     
    ...mapMutations("pet",["addfn","submitFanhui"]),
    ...mapActions("pet", ["getMsg","postMsg"]), //获取异步方法
    submitForm(formName) {
      this.addfn()
      this.postMsg( this.formLabelAlign)
      // this.$store.dispatch("pet/postMsg", this.formLabelAlign);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>