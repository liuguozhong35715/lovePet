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
            // console.log(payload.rows)
            Object.assign(state, payload)
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
                res = await axios.get(`/usersManage/?page=${curPage}&rows=${eachPage}&text=${search.text}&type=${search.type}`)
            }else{
                
                res = await axios.get(`/usersManage/?page=${curPage}&rows=${eachPage}`)
            }        
            // const data = await fetch(`/shopManagers/?page=${curPage}&rows=${eachPage}`).then(response => response.json())
            context.commit("getrows",res.data)
        },
        async del(context,id) {
            await axios.delete('/usersManage/' + id)
            context.dispatch("getMsg")
        },
        async updateMsg(context,{id,memberAdd,memberAcount, memberArea , memberImg ,memberName ,memberPhone , memberPoint , menberCard }){
            await axios.put('/usersManage/' + id ,{ memberAdd,memberAcount, memberArea , memberImg ,memberName ,memberPhone , memberPoint , menberCard })
            context.dispatch("getMsg")
        },
    }
}