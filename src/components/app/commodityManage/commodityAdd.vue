<template>
<div>
  <div v-if="isShow">
    <el-form ref="form" :model="form" label-width="100px" style="float:left">
      <el-form-item label="商品名称">
        <el-input class="put"  v-model="form.goodsName"></el-input>
      </el-form-item>
    
      <el-form-item label="制作方法">
        <el-input class="put"  v-model="form.goodsMaterial"></el-input>
      </el-form-item>

      <el-form-item label="专属规格">
        <el-input class="put"  v-model="form.goodsOnlyFor"></el-input>
      </el-form-item>
    
      <el-form-item label="口味">
        <el-input class="put"  v-model="form.goodsTaste"></el-input>
      </el-form-item>
      
        <el-form-item label="产地">
        <el-input class="put"  v-model="form.goodsRegion"></el-input>
      </el-form-item>
      
      <el-form-item label="保质期">
        <el-input class="put"  v-model="form.goodsTime"></el-input>
      </el-form-item>
    
      <el-form-item label="特色说明">
        <el-input class="put"  v-model="form.goodsIntro"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveMsg">保存</el-button>
        <el-button @click="handleClick">取消</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="140px" style="float:left">
      <el-form-item label="品类">
        <el-input class="put"  v-model="form.goodsType"></el-input>
      </el-form-item>
        <el-form-item label="适用规格">
        <el-input class="put"  v-model="form.goodsCanFor"></el-input>
      </el-form-item>
      <el-form-item label="包装规格">
        <el-input class="put"  v-model="form.goodsSize"></el-input>
      </el-form-item>
      <el-form-item label="特殊功用">
        <el-input class="put"  v-model="form.goodsSpecial"></el-input>
      </el-form-item>
      <el-form-item label="出厂日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.goodsDate" style="width: 300px;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="供应商">
        <el-input class="put"  v-model="form.goodsSupplier"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input class="put"  v-model="form.goodsPrice"></el-input>
      </el-form-item>
    </el-form>
  </div>
  <div v-else>
    <div slot="tip" class="el-upload__tip"  style="margin:15px">只能上传jpg/png文件，且不超过500kb</div>
    <el-upload  style="margin:15px"
      multiple
      class="upload-demo"
      action="goodsManage/upload"
      :data="this.goodsId"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      list-type="picture">
      <el-button size="small" type="primary" style="margin:15px 0">点击上传</el-button>
    </el-upload>
    <div style="margin:5px 15px">
        <el-button @click="backList">返回新增页</el-button>
    </div>

  </div>
</div>

</template>
<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("commodity", ["saveMsg", "delPic", "getimgID"]),
    ...mapMutations("commodity", ["cancleAdd","backList"]),
    
    // 取消保存
    handleClick() {
      // 调用取消保存的事件
      this.cancleAdd();
      // 点击取消之后跳转到列表页面
      this.$router.push("/info/commodityManage/commodityList");
    },
    // backList(){
    //    this.$router.push("/info/commodityManage/commodityAdd");
    // },
    handleSuccess(res, file) {
      this.getimgID();
    },
    // 删除图片
    handleRemove(file, fileList, picID) {
      this.delPic(picID);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  },
  computed: {
    ...mapState("commodity", ["isShow", "goodsId", "form", "picID"])
  }
};
</script>
<style>
.put {
  width: 300px;
}
</style>

