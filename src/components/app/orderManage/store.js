import axios from "axios"

export default {
    namespaced: true,
    state: {
        goodsCurpage: 1,
        goodsTotal: 1,
        PetCurpage: 1,
        PetTotal: 1,
        ServerCurpage: 1,
        ServerTotal: 1,
        goodsListAll:[],
        PetListAll:[],
        ServerListAll:[],
        orderListData: [],
        orderPetData: [],
        orderServerData: [],
        isList: true,
        isPetList: true,
        isServerList: true,
        goodsForm: {
            id:"错误订单",
            name: "猫粮1",
            price: 300,
            count: 3,
            region: "waitSend",
            address:"未留地址",
            phone:"未留电话"
        },
        petForm: {
            id:"错误订单",
            name: "猫粮1",
            price: 300,
            count: 3,
            region: "waitSend",
            address:"未留地址",
            phone:"未留电话"
        },
        serverForm: {
            id:"错误订单",
            name: "猫粮1",
            price: 300,
            count: 3,
            region: "waitSend",
            address:"未留地址",
            phone:"未留电话"
        }
    },
    mutations: {
        showDataAll(state, payload) {
            state.goodsListAll.splice(0);
            state.PetListAll.splice(0);
            state.ServerListAll.splice(0);
            for (let i = 0; i < payload.length; i++) {
                if (payload[i].status == "waitSend") {
                    payload[i].statusCN = "待发货";
                }else if(payload[i].status == "hasSend"){
                    payload[i].statusCN = "已发货";
                }else if(payload[i].status == "waitDiscuss"){
                    payload[i].statusCN = "待评价";
                }else if(payload[i].status == "complete"){
                    payload[i].statusCN = "已完成";
                }else{
                    console.log("error")
                }
                if (payload[i].type == "goods") {
                    payload[i].total = payload[i].goods.goodsPrice * payload[i].counts;
                    state.goodsListAll.push(payload[i]);                   
                } else if (payload[i].type == "servers") {
                    if (payload[i].status == "waitSend") {
                        payload[i].statusCN = "待服务";
                    }else if(payload[i].status == "hasSend"){
                        payload[i].statusCN = "已服务";
                    }
                    payload[i].total = payload[i].servers.serverPrice;
                    state.ServerListAll.push(payload[i]);                   
                } else if (payload[i].type == "pets") {
                    payload[i].total = payload[i].pets.price * payload[i].counts;
                    state.PetListAll.push(payload[i]);                    
                } else {
                    console.log("error")
                }
            };

            state.goodsTotal = state.goodsListAll.length;
            state.ServerTotal = state.ServerListAll.length;
            state.PetTotal = state.PetListAll.length;

            state.orderListData =  state.goodsListAll.slice(0,6)
            state.orderPetData =  state.PetListAll.slice(0,6)
            state.orderServerData =  state.ServerListAll.slice(0,6)
        },
        willUpdata(state, payload) {
            state[payload.type] = false;
            state[payload.whatForm].id = payload.data._id;
            state[payload.whatForm].region = payload.data.status;
            state[payload.whatForm].count = payload.data.counts || payload.data.serverTime;
            state[payload.whatForm].address = payload.data.address;
            state[payload.whatForm].phone = payload.data.phone;
            if (payload.type === "isList") {
                state[payload.whatForm].name = payload.data.goods.goodsName;
                state[payload.whatForm].price = payload.data.goods.goodsPrice;
            } else if (payload.type === "isPetList") {
                state[payload.whatForm].name = payload.data.pets.variety;
                state[payload.whatForm].price = payload.data.pets.price;
            } else if (payload.type === "isServerList") {
                state[payload.whatForm].name = payload.data.servers.serverType;
                state[payload.whatForm].price = payload.data.servers.serverPrice;
            } else {
                console.log("error")
            }
        },
        cancelUpdata(state, payload) {
            state[payload.type] = true;
        },
        goodsCurrentChange(state,payload){
            state.orderListData =  state.goodsListAll.slice((payload - 1) * 6,(payload - 1) * 6 + 6)
        },
        serverCurrentChange(state,payload){
            state.orderServerData =  state.ServerListAll.slice((payload - 1) * 6,(payload - 1) * 6 + 6)
        },
        petCurrentChange(state,payload){
            state.orderPetData =  state.PetListAll.slice((payload - 1) * 6,(payload - 1) * 6 + 6)
        }
    },
    actions: {
        async getOrder(context) {
            const { data } = await axios.get(`/orderManage?type=0&shopManagersId=5ae179ad881a16051f703dc4`);
            context.commit("showDataAll", data)
        },
        async upLoad(context, payload) {
            const { data } = await axios.put(`/orderManage/${context.state[payload.type].id}`,context.state[payload.type]);
            context.state[payload.isDisplay] = true;
            await context.dispatch('getOrder')
        },
        async del(context, payload) {
            const { data } = await axios.delete(`/orderManage/${payload.id}`);
            await context.dispatch('getOrder')
        }
    }
}