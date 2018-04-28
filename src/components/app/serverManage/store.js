import axios from "axios"
const store = {
    namespaced: true,
    state: {
        isList: true,
        isAdd: true,
        service: [{}],
        add: {
            serviceName: "",
            serviceType: "",
            serviceTime: "",
            servicePrice: "",
            theStores: ""
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
            this.state.server.service = parm
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
                // context.$router.push({path:"/info/serverManage/serverList"})
                
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