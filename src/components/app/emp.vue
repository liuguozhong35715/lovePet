<template>
   <div style="borderBottom:2px dashed;paddingBottom:30px">
     <h1 style="color:red">员工列表</h1> 
    <transition name="fade">
      <div style="width=100%" v-if="update">
          <form>
              <p>
                  <label htmlFor="number">员工编号: </label> <input type="text" id="number" readOnly 
                  v-model="updateMsg._id"/>
                  <label htmlFor="name">员工姓名: </label> <input type="text" id="name" 
                  v-model="updateMsg.name"/>
              </p>
              <p>
                  <label htmlFor="job">员工岗位: </label> <input type="text" id="job"
                  v-model="updateMsg.job"/>
                  <label htmlFor="sal">员工薪水: </label> <input type="text" id="sal" 
                  v-model="updateMsg.sal"/>
              </p>
              <input type="button" value="确认修改" style= "marginRight=15px" @click="updateing()"/>
              <input type="button" value="取消" @click="changeUpdateStyle"/>
          </form>
      </div>
    </transition>
    <el-table
      :data="rows"
      height="345"
      style="width: 100%;marginBottom:20px;text-align:center">
      <el-table-column
        prop="_id"
        label="员工编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="员工姓名">
      </el-table-column>
      <el-table-column
        prop="job"
        label="员工岗位">
      </el-table-column>
      <el-table-column
        prop="sal"
        label="员工薪水">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
        <template slot-scope="scope">
          <el-button @click="toDelete(scope.row._id)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="willUpdate(scope.row._id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table> 
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="~~curpage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="~~eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="~~total">
    </el-pagination>
  </div>
</template>


<script>
import { mapActions, mapState,mapMutations} from "vuex";

export default {
  name: "emp",
  created() {
    this.getMsg();
  },
  watch:{
    curpage(){
      this.getMsg();
    },
    eachpage(){
      this.getMsg();
    },
    
  }
  ,
  methods: {
    handleSizeChange(val) {
        this.setEachpage(val);
      },
      handleCurrentChange(val) {
        this.setCurpage(val);
      },
    ...mapActions("Emp", ["getMsg","updateing","toDelete"]),
    ...mapMutations("Emp",["willUpdate","setCurpage","setEachpage","changeUpdateStyle"])  
  },
  computed: {
    ...mapState("Emp", ["curpage", "eachpage", "maxpage", "rows", "total","update","updateMsg"])
  }
};
</script>


<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

th>div{
  text-align: center
}
</style>
