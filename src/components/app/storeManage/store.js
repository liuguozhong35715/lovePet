import axios from "axios"
export default {
    namespaced: true,
    state: {
        tableData5: [      //列表的信息

        ],
        imgList:[],
     
        obj:{
            shopLicenceNum: '营业执照号码',   //营业执照号码
            shopLicenceImg: '',//营业执照图片
            shopAdd: '',//营业地址
            shopCorporate: '',//法人
            shopTel: '', //联系电话
            shopImg: '',//头图
            shopFeature: '',//特色
            shopEmployee: '',//店员属性
            shopDes:'',   //店铺的描述
        },
        isList: true,
        isAdd:true,
        labelPosition: 'right',
        
        formLabelAlign: {       //增加的信息
              shopName: '',
            manageId: '5ae17ec646f20cde65de9f69',
              shopLicenceNum: '',   //营业执照号码
              shopLicenceImg: '',//营业执照图片
              shopAdd: '',//营业地址
              shopCorporate: '',//法人
              shopTel: '', //联系电话
              shopImg: '',//头图
              shopFeature: '',//特色
              shopEmployee: '',//店员属性
              shopDes:'',
            imageUrl: '',

        },
        newDataId:{
            dataId:"",
            whatImg:"shopImg"  
        },
      
     
    },
    mutations: {         //方法
        getshops(state, payload) {
            // console.log(payload.rows);
            state.tableData5 = payload.rows
        },
        getIsList(state){    //点击修改后跳转页面，取反
            state.isList=!state.isList
        },
        searchData(){

        }
  
    },
    actions: {
        async postMsg(context, storeDate) {    //增加            
            const { data } = await axios.post("/storeManage", context.state.formLabelAlign)   //请求跨域，并且传了一个参数storeDat
            context.state.newDataId.dataId = data._id;
            context.state.isAdd = false;
            await context.dispatch("getMsg")  //触发 获取的
        },
        async getMsg(context) {    //获取
            const res = await axios.get("/storeManage")   //请求跨域
  
            context.commit("getshops", res.data)
        },
        async delMsg(context, id) {    //删除
            // console.log(111,id)
            await axios.delete("/storeManage/" + id)   //请求跨域
        },
        async changeMsg(context,item) {    //修改
            const { id,manageId, shopName, shopEmployee, shopLicenceNum, shopAdd, shopCorporate, shopTel, shopFeature, shopDes } = item
            await axios.put("/storeManage/" + id,item)   //请求跨域
        },
        async searchMsg(context,valueData) {    //搜索
            console.log(222,valueData)    //get传参数，后面不能用逗号加参数，post可以，必须是？后加参数
            await axios.get(`/storeManage/?type=shopName&value=${valueData}`).then(function(res){
                console.log(999,res.data)
                context.state.tableData5=res.data;
            })
          
           
        },

    }
}