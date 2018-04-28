<template>
 

  <div style="height:900px" >
   
    <div v-if="isList">
      <!-- 搜索框 -->
      <div>   
        <el-input v-model="input" placeholder="请输入内容" style="width:150px"></el-input>
        <el-button type="primary" plain   @click="handleSearch(input)">查询</el-button>
      </div>
       
      <el-table
        :data="tableData5"
        height="500px"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
               <el-form-item    label="营业执照图片" style="margin-top:60px;margin-bottom:10px">
                <div style="height:120px;width:120px;border:1px solid red;margin-top:-35px"> 
                    <img :src= props.row.shopLicenceImg alt="" style="height:120px;width:120px;">
                </div>
              </el-form-item>
              <el-form-item label="店铺头图"  style="margin-top:60px;margin-bottom:10px">
                  <div style="height:120px;width:120px;border:1px solid red; margin-top:-35px"> 
                    <img :src= props.row.shopImg alt="" style="height:120px;width:120px;">
                  </div>
              </el-form-item>
              <el-form-item label="门店名称">
                <span>{{ props.row.shopName }}</span>
              </el-form-item>
              <el-form-item label="店主ID">
                <span>{{ props.row.manageId }}</span>
              </el-form-item>
              <el-form-item label="营业执照号码">
                <span>{{ props.row.shopLicenceNum }}</span>
              </el-form-item>
                <el-form-item label="营业地址">
                <span>{{ props.row.shopAdd }}</span>
              </el-form-item>          
              <el-form-item label="法人">
                <span>{{ props.row.shopCorporate }}</span>
              </el-form-item>
                <el-form-item label="联系电话">
                <span>{{ props.row.shopTel }}</span>
              </el-form-item>
              <el-form-item label="特色">
                <span>{{ props.row.shopFeature }}</span>
              </el-form-item>
              <el-form-item label="店员属性">
                <span>{{ props.row.shopEmployee }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="店主ID"
          prop="manageId">
        </el-table-column>
        <el-table-column
          label="门店名称"
          prop="shopName">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="shopDes">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 开始隐藏，点击修改之后显示 -->
    <div v-else> 
        <el-form :label-position="labelPosition"
         ref="ruleForm2" 
         label-width="100px" 
         :model="formLabelAlign2"
         style=500px
        >
      <el-form-item label="店主ID">
        <el-input v-model="formLabelAlign2.manageId" style="width: 400px;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="门店名称">
        <el-input v-model="formLabelAlign2.shopName" style="width: 400px;"></el-input>
      </el-form-item>    
      <el-form-item label="营业执照号码">
        <el-input v-model="formLabelAlign2.shopLicenceNum" style="width:400px;" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="营业地址">
        <el-input v-model="formLabelAlign2.shopAdd" style="width: 400px;"></el-input>
      </el-form-item>

      <el-form-item label="法人">
        <el-input v-model="formLabelAlign2.shopCorporate" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="formLabelAlign2.shopTel" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="特色">
        <el-input v-model="formLabelAlign2.shopFeature" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="店员属性">
        <el-input v-model="formLabelAlign2.shopEmployee" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item label="店铺的描述">
        <el-input v-model="formLabelAlign2.shopDes" style="width: 400px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitSave('ruleForm2')">保存</el-button>
      </el-form-item>
    </el-form>  
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data(){
    return {
        formLabelAlign2: {       //增加的信息
              shopName: '',
              manageId: '5ae17ec646f20cde65de9f69',
              shopLicenceNum: '',   //营业执照号码
              // shopLicenceImg: '',//营业执照图片
              shopAdd: '',//营业地址
              shopCorporate: '',//法人
              shopTel: '', //联系电话
              // shopImg: '',//头图
              shopFeature: '',//特色
              shopEmployee: '',//店员属性
              shopDes:'',
              imageUrl: '',
              id:""
        },
        input: ''
    }
  },
  computed: {
    ...mapState("storeManage", ["tableData5", "isList", "obj", "labelPosition","formLabelAlign"])
  },
  mounted() {},
  created() {
    //初始化数据  ，一开始进来的时候没有数据，
    this.$store.dispatch("storeManage/getMsg"); //store 是  //storeManage命名空间    初始化列表数据
  },
   
  methods: {
    //方法
    ...mapMutations("storeManage", ["getIsList", "getObj"]), //同步
    ...mapActions("storeManage", ["changeMsg"]), //异步
    handleDelete(index, row) {
      //删除  index是下标  row是列表里面的信息
      const id = row._id;
      this.$store.dispatch("storeManage/delMsg", id);
      this.$store.dispatch("storeManage/getMsg"); //删除后重新渲染列表
      // this.tableData5.splice(index,1)    //假删除的方法，一刷新就恢复
    },
    handleEdit(index, row) {  //修改
      // this.changeMsg(row._id);
      this.getIsList(); //调用点了修改后的方法
      const id = row._id;
      // this.getObj();
      this.formLabelAlign2.id=row._id;
      this.formLabelAlign2.shopName=row.shopName;
      this.formLabelAlign2.shopLicenceNum=row.shopLicenceNum;
      this.formLabelAlign2.shopCorporate=row.shopCorporate;
      this.formLabelAlign2.shopTel=row.shopTel;
      this.formLabelAlign2.shopFeature=row.shopFeature;
      this.formLabelAlign2.shopEmployee=row.shopEmployee;
      this.formLabelAlign2.shopDes=row.shopDes;
      this.formLabelAlign2.shopAdd=row.shopAdd;

    },
    submitSave(formName) { //保存
      this.$store.dispatch("storeManage/changeMsg",this.formLabelAlign2)
    //  console.log(11,this.formLabelAlign2)
      this.$router.push({path:'/info/storeManage/storeAdd'})
      // this.islist=true
    },
    handleSearch(value){ //搜索
         this.$store.dispatch("storeManage/searchMsg",value);
         console.log(value)
    }    
  }
};
</script>


<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
