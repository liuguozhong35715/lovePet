import axios from 'axios'
export default {
    namespaced: true,
    state: {
        curPage: 1,
        eachPage: 10,
        maxpage: 0,
        total: 0,
        rows: [],
        type:true,
        updated:true
    },
    mutations: {
        getrows(state,payload){
            
            Object.assign(state, payload)
            for(let i = 0; i < state.rows.length; i++){
                if( state.rows[i].userType == 0){
                    state.rows[i].userTypeChn = "门店管理员"
                }else{
                    state.rows[i].userTypeChn = "后台管理员"
                }
                if( state.rows[i].userStatus == 0){
                    state.rows[i].userStatusChn = "未审核"
                }else{
                    state.rows[i].userStatusChn = "已审核"
                }
            }
            // console.log(payload.rows) 
        },
        setCurPage(state, curPage) {
            state.curPage = curPage
        },
        setEachPage(state, eachPage) {
            state.eachPage = eachPage
        },
        changeType(state){
            state.type = !state.type
  
        },
        updated(state){
            state.updated = !state.updated
        }
        
    },
    actions: {
        async getMsg(context,search) {
            const { curPage, eachPage } = context.state                 
            let res;
            if(search){
                res = await axios.get(`/shopManagers/?page=${curPage}&rows=${eachPage}&text=${search.text}&type=${search.type}`)
            }else{
                res = await axios.get(`/shopManagers/?page=${curPage}&rows=${eachPage}`)
            }        
            // const data = await fetch(`/shopManagers/?page=${curPage}&rows=${eachPage}`).then(response => response.json())
            context.commit("getrows",res.data)
        },
        async del(context,id) {
            await axios.delete('/shopManagers/' + id)
            context.dispatch("getMsg")
        },
        async updateMsg(context,{id,userStatus,userName,userPhone,userMail,userAcount,userType}){
            // console.log({id,userStatus,userName,userPhone,userMail,userAcount,userType})
            await axios.put('/shopManagers/' + id ,{userStatus,userName,userPhone,userMail,userAcount,userType})
            context.dispatch("getMsg")
        },

    },
    getters:{
        filterType:function(state){
            console.log("in",state.rows)
            switch(state.type){
                case true:
                return state.rows.filter(item => item.userStatusChn === "已审核")
                case false:
                return state.rows.filter(item => item.userStatusChn === "未审核")
            }
        }
    }
}