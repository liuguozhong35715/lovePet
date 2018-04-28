<template>
 <div class="block">
   <div v-if="isUpdate">
     <el-table
    :data="rows"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品品类">
            <span>{{ props.row.goodsType }}</span>
          </el-form-item>
          <el-form-item label="商品材质">
            <span>{{ props.row.goodsMaterial }}</span>
          </el-form-item>
          <el-form-item label="适用规格">
            <span>{{ props.row.goodsCanFor }}</span>
          </el-form-item>
          <el-form-item label="专属规格">
            <span>{{ props.row.goodsOnlyFor }}</span>
          </el-form-item>
          <el-form-item label="包装规格">
            <span>{{ props.row.goodsSize }}</span>
          </el-form-item>
          <el-form-item label="商品口味">
            <span>{{ props.row.goodsTaste }}</span>
          </el-form-item>
          <el-form-item label="特殊功能">
            <span>{{ props.row.goodsSpecial }}</span>
          </el-form-item>
          <el-form-item label="产地">
            <span>{{ props.row.goodsRegion }}</span>
          </el-form-item>
          <el-form-item label="出厂日期">
            <span>{{ props.row.goodsDate }}</span>
          </el-form-item>
          <el-form-item label="保质期">
            <span>{{ props.row.goodsTime }}</span>
          </el-form-item>
          <el-form-item label="供应商">
            <span>{{ props.row.goodsSupplier }}</span>
          </el-form-item>
          <el-form-item label="特色说明">
            <span>{{ props.row.goodsIntro }}</span>
          </el-form-item>
        </el-form>
      </template>
      </el-table-column>
      <el-table-column
        label="商品 ID"
        prop="_id">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="goodsName">
      </el-table-column>
      <el-table-column
        label="商品价格"
        prop="goodsPrice">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="willUpdata(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)">删除</el-button>
            <!-- <el-upload  
              multiple
              class="upload-demo"
              action="goodsManage/upload"
              :data="this.goodsId"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-exceed="handleExceed"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="setEachPages"
        @current-change="setCurPages"
        :current-page="~~curpage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
   </div>
  <div v-else>
    <el-form ref="forms" :model="forms" label-width="100px" style="float:left">
      <el-form-item label="商品名称">
        <el-input class="put"  v-model="forms.goodsName"></el-input>
      </el-form-item>
    
      <el-form-item label="制作方法">
        <el-input class="put"  v-model="forms.goodsMaterial"></el-input>
      </el-form-item>

      <el-form-item label="专属规格">
        <el-input class="put"  v-model="forms.goodsOnlyFor"></el-input>
      </el-form-item>
    
      <el-form-item label="口味">
        <el-input class="put"  v-model="forms.goodsTaste"></el-input>
      </el-form-item>
      
        <el-form-item label="产地">
        <el-input class="put"  v-model="forms.goodsRegion"></el-input>
      </el-form-item>
      
      <el-form-item label="保质期">
        <el-input class="put"  v-model="forms.goodsTime"></el-input>
      </el-form-item>
    
      <el-form-item label="特色说明">
        <el-input class="put"  v-model="forms.goodsIntro"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setUpdate(forms._id)">确认修改</el-button>
        <el-button @click="cancelUpdata">取消</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="forms" :model="forms" label-width="140px" style="float:left">
      <el-form-item label="品类">
        <el-input class="put"  v-model="forms.goodsType"></el-input>
      </el-form-item>
        <el-form-item label="适用规格">
        <el-input class="put"  v-model="forms.goodsCanFor"></el-input>
      </el-form-item>
      <el-form-item label="包装规格">
        <el-input class="put"  v-model="forms.goodsSize"></el-input>
      </el-form-item>
      <el-form-item label="特殊功用">
        <el-input class="put"  v-model="forms.goodsSpecial"></el-input>
      </el-form-item>
      <el-form-item label="出厂日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="forms.goodsDate" style="width: 300px;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="供应商">
        <el-input class="put"  v-model="forms.goodsSupplier"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input class="put"  v-model="forms.goodsPrice"></el-input>
      </el-form-item>
    </el-form>
  </div>
 </div>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "commodity",
  computed: {
    ...mapState("commodity", ["rows","eachpage","curpage","maxpage","total","isUpdate","form","forms","goodsId"])
  },
  watch: {
    curpage: {
      immediate: true,
      handler: "getMsg"
    },
    eachpage() {
      this.getMsg();
    }
  },
  methods: {
    ...mapActions("commodity", ["getMsg","setUpdate"]),
    ...mapMutations("commodity", ["setCurPage", "setEachPage", "setDel","willUpdata","cancelUpdata"]),
    setEachPages(val) {
      this.setEachPage(val);
    },
    setCurPages(val) {
      this.setCurPage(val);
    },
    // 删除
    handleDelete(id) {
      // console.log(id);
      this.$store.dispatch("commodity/setDel", id);
    }
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
.put {
  width: 300px;
}
</style>