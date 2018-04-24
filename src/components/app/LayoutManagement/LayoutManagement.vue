<template>
    <el-container>
        <el-header style="backgroundColor:#fff;height:200px;">
        <el-form ref="ruleForm"  label-width="90px" style="display:flex;flex-wrap:wrap" :rules="rules" >
             <el-form-item label="请选择电影">
                <el-select v-model="moviesValue" placeholder="请选择电影" prop="selectMovie">
                    <el-option
                    v-for="item in movies"
                    :key="item._id"
                    :label="item.movieName"
                    :value="item._id">
                    </el-option>
                </el-select>  
            </el-form-item>

             <el-form-item label="请选择影院">
                <el-select v-model="theatresValue" placeholder="请选择影院" @change="gethalls" prop="selectTheatre">
                    <el-option
                    v-for="item in theatres"
                    :key="item._id"
                    :label="item.theatreName"
                    :value="item._id">
                    </el-option>
                </el-select>  
            </el-form-item>

            <el-form-item label="请选择影厅">
                <el-select v-model="hallsValue" placeholder="请选择影厅" prop="selectHall" >
                    <el-option
                    v-for="item in halls"
                    :key="item._id"
                    :label="item.videohallName"
                    :value="item._id">
                    </el-option>
                </el-select>  
            </el-form-item>

            <el-form-item label="请选择时间">
                <el-date-picker
                    prop="chooseTime"
                    v-model="timeValue"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>  
            </el-form-item>

            <el-form-item label="请输入票价">
                 <el-input
                    prop="price"
                    placeholder="请输入票价"
                    v-model="priceValue"
                    clearable>
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>              
        </el-header>    
        <el-main>
            主体
        </el-main>
    </el-container>
</template>


<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "LayoutManagement",
  data() {
    return {
      rules: {
        price: [{ required: true, message: "请输入票价", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getMovies();
    this.getTheatres();
  },
  computed: {
    ...mapState("Layout", ["movies", "theatres", "halls", "priceValue"]),
    moviesValue: {
      get: function() {
        return this.$store.state.Layout.moviesValue;
      },
      set: function(newValue) {
        this.$store.state.Layout.moviesValue = newValue;
      }
    },
    theatresValue: {
      get: function() {
        return this.$store.state.Layout.theatresValue;
      },
      set: function(newValue) {
        this.$store.state.Layout.theatresValue = newValue;
      }
    },
    hallsValue: {
      get: function() {
        return this.$store.state.Layout.hallsValue;
      },
      set: function(newValue) {
        this.$store.state.Layout.hallsValue = newValue;
      }
    },
    timeValue: {
      get: function() {
        return this.$store.state.Layout.timeValue;
      },
      set: function(newValue) {
        this.$store.state.Layout.timeValue = newValue;
      }
    }
  },
  methods: {
    ...mapActions("Layout", ["getMovies", "getTheatres", "gethalls"]),
    ...mapMutations("Layout", []),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {        
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style>
.el-form-item {
  margin-right: 40px;
}
</style>
