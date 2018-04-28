import axios from "axios"
const store = {
    namespaced: true,
    state: {
        isList: true,
        isAdd: true,
        service: [],
        // select:"",
        select:{
            sel:""
        },
        input:{
            zhi:""
        },
        add: {
            serviceName: "",
            serviceType: "",
            serviceTime: "",
            servicePrice: "",
            theStores: "",
            storeId:"0ae0cd0d0b000000dcdffc00",//门店ID
            manageId:"9ae9cd9d9b999999dcdffc99"//管理员ID
        },
        update: {
            serviceName: "",
            serviceType: "",
            serviceTime: "",
            servicePrice: "",
            theStores: "",
            id: ""
        },
    },
    mutations: {
        addPet(state, parm) {
            // let isFlag
            if(this.state.server.select.sel == "服务名称")
            {
                // isFlag = "serviceName"
                if(this.state.server.input.zhi){
                    for(let i = 0; i < parm.length; i++){
                        if(parm[i].serviceName == this.state.server.input.zhi){
                            this.state.server.service.push(parm[i])
                        }
                    }
                }
                else{
                    this.state.server.service = parm            
                }
            }
            else if(this.state.server.select.sel == "服务类型"){
                // isFlag = "serviceType"
                if(this.state.server.input.zhi){
                    for(let i = 0; i < parm.length; i++){
                        if(parm[i].serviceType == this.state.server.input.zhi){
                            this.state.server.service.push(parm[i])
                        }
                    }
                }
                else{
                    this.state.server.service = parm            
                }
            }else{
                // isFlag = "servicePrice"  
                if(this.state.server.input.zhi){
                    for(let i = 0; i < parm.length; i++){
                        if(parm[i].servicePrice == this.state.server.input.zhi){
                            this.state.server.service.push(parm[i])
                        }
                    }
                }  
                else{
                    this.state.server.service = parm            
                }            
            }
            // console.log("zhizhizhi:",isFlag)            
        },
        updateRow(state, rows) {//点击修改
            state.isList = !state.isList;
            this.state.server.update.id = rows._id
            this.state.server.update.serviceName = rows.serviceName
            this.state.server.update.serviceType = rows.serviceType
            this.state.server.update.serviceTime = rows.serviceTime
            this.state.server.update.servicePrice = rows.servicePrice
            this.state.server.update.theStores = rows.theStores
        },
        resetForm(state) {//修改里面点击取消
            state.isList = !state.isList;
        },
        sureadd(state) {//点击继续增加
            state.isAdd = !state.isAdd;
            this.state.server.add.serviceName = ""
            this.state.server.add.serviceType = ""
            this.state.server.add.serviceTime = ""
            this.state.server.add.servicePrice = ""
            this.state.server.add.theStores = ""
        }
    },
    actions: {
        async search(context){
            context.state.service = []
            await context.dispatch('getPet');
        },
        //显示
        async getPet(context) {
            const { data } = await axios("/serverManage");
            context.commit("addPet", data);
        },
        // 增加
        async submitForm(context) {
            let add = context.state.add
            if (context.state.add.serviceName) {
                context.state.isAdd = !context.state.isAdd
                // const data = await axios.post("/serverManage", serviceName, serviceType, serviceTime, servicePrice, theStores);
                // context.state[serviceName] = serviceName;
                await fetch("/serverManage", {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(add)
                }).then().catch()
                await context.dispatch('getPet')
            }
        },
        //删除
        async deleteRow(context, parm) {
            // await axios.delete(`/serverManage`,'id='+parm);
            await fetch("/serverManage", {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'id=' + parm
            })
            await context.dispatch('getPet')
        },
        //修改
        async sure(context) {
            let update = context.state.update
            await fetch("/serverManage", {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(update)
            }).then().catch()
            await context.dispatch('getPet');
            context.state.isList = !context.state.isList;
        },
    }
}
export { store as default }