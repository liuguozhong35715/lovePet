
<template>
 <div>
   <!-- <h1>新增列表</h1> -->
  <div v-if="isAdd">
    <el-form :label-position="labelPosition" ref="ruleForm2" label-width="100px" :model="formLabelAlign">
  
      <el-form-item label="店主ID">
        <el-input v-model="formLabelAlign.manageId" style="width: 400px;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="门店名称">
        <el-input v-model="formLabelAlign.shopName" style="width: 400px;"></el-input>
      </el-form-item>    
      <el-form-item label="营业执照号码">
        <el-input v-model="formLabelAlign.shopLicenceNum" style="width:400px;"></el-input>
      </el-form-item>
      <el-form-item label="营业地址">
        <el-input v-model="formLabelAlign.shopAdd" style="width: 400px;"></el-input>
      </el-form-item>

      <el-form-item label="法人">
        <el-input v-model="formLabelAlign.shopCorporate" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="formLabelAlign.shopTel" style="width: 400px;"></el-input>
      </el-form-item>

      <el-form-item label="特色">
        <el-input v-model="formLabelAlign.shopFeature" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="店员属性">
        <el-input v-model="formLabelAlign.shopEmployee" style="width: 400px;"></el-input>
      </el-form-item>
        <el-form-item label="店铺的描述">
        <el-input v-model="formLabelAlign.shopDes" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button  @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div v-else>
    <el-upload
      class="upload-demo"
      action="/storeManage/upload"
      :data = "newDataId"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="imgList"
      list-type="picture">
       <div style="margin-bottom:20px;width:120px" >
        <el-select v-model="newDataId.whatImg"  placeholder="请选择">
          <el-option value="shopLicenceImg" label="营业执照"></el-option>
          <el-option value="shopImg" label="店铺头图"></el-option>
        </el-select>    
      </div>
      <el-button size="small" type="primary">点击上传</el-button>
     
           
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
        <el-button type="primary" style="margin-top:20px;" @click="submitFanhui()">返回用户列表</el-button>
  </div>
 
</div>
  
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import storeListVue from './storeList.vue';
export default {
  // data() {
  // return {
  // labelPosition: 'right',
  // formLabelAlign: {
  //   shopName: '',
  //   manageId: '',
  //   shopLicenceNum: '',   //营业执照号码
  //   shopLicenceImg: '',//营业执照图片
  //   shopAdd: '',//营业地址
  //   shopCorporate: '',//法人
  //   shopTel: '', //联系电话
  //   shopTel: '',//头图
  //   shopFeature: '',//特色
  //   shopEmployee: '',//店员属性
  //   shopDes:''

  // }
  // };
  // },
  computed: {
    ...mapState("storeManage", [
      "labelPosition",
      "formLabelAlign",
      "isAdd",
      "imgList",
      "newDataId"
    ]),

  },
  methods: {
    ...mapActions("storeManage", ["postMsg","getMsg"]),
    submitForm(formName) {  //提交
      this.postMsg();   //控制新增的某个列表的出现
    },
    submitFanhui(){  //返回到用户列表
      this.$router.push({path:'/info/storeManage/storeList'})
    },
    resetForm(formName) {
      //重置
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    }
  }
};
</script>



 <style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>