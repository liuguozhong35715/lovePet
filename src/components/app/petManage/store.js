import axios from 'axios'
export default {
    namespaced: true,  //命名空间
    state:{
        tableData5:[],
        isAdd:true,
        isList:true,
        dynamicValidateForm:{},
        input1:"",
        postId:{
            putId:""
        },
        formMsg:{
            variety:"",
            kind:"",
            gender:"",
            price:"",
            coatColor:"",
            id:""
        }
    },
    mutations: {   //写方法
      getlist(state,parm){
          this.state.pet.tableData5 = parm
      },
      addfn(state){
      state.isList = false;
    },
      updet(state,rows){
        state.isAdd = !state.isAdd
        this.state.pet.formMsg.variety=rows.variety
        this.state.pet.formMsg.kind=rows.kind
        this.state.pet.formMsg.gender=rows.gender
        this.state.pet.formMsg.price=rows.price
        this.state.pet.formMsg.coatColor=rows.coatColor
        this.state.pet.formMsg.id=rows._id
      },
      submitFanhui(state){
        state.isList = true;
      }
    },
    actions: {
        async edit(context ) {   //确认修改
            let xinxi = context.state.formMsg
            context.state.isAdd = !context.state.isAdd
            await axios.put("/pets",xinxi)            
        },
        async getMsg(context ) {   //把数据库的数据渲染到页面
            let userId = sessionStorage.userId;
            const {data} = await axios.get(`/pets?shopManagersId=${userId}`) 
            context.commit("getlist",data)
        },
        async postMsg(context,storeDate){  //新增
            const { data } = await axios.post("/pets",storeDate)
            context.state.postId.putId = data._id;
        },
        async deletMsg(context,id){  //删除
            await axios.delete("/pets/"+ id)
        },
        async updetMsg(context,updetid){  //修改
            await axios.put("/pets/"+ updetid)
            
            
        }
    }
}