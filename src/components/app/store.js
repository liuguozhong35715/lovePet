
export default {
    namespaced: true,
    state: {
        curpage: 1,
        eachpage: 10,
        maxpage: 1,
        rows: [],
        total: 1,
        update: false,
        updateMsg: {
            _id: 0,
            name: "0",
            job: "1",
            sal: "2"
        }
    },
    mutations: {

        renderMsg(state, payload) {
            Object.assign(state, payload)
        },
        willUpdate(state, id) {
            state.rows.map(item => {
                if (item._id == id) {
                    Object.assign(state.updateMsg, item)
                }
            })
            state.update = true;
        },
        setCurpage(state, curpage) {
            state.curpage = curpage;
        },
        setEachpage(state, eachpage) {
            state.eachpage = eachpage;
        },
        changeUpdateStyle(state){
            state.update = false;
        }
    },
    actions: {
        async getMsg(context) {
            const { curpage, eachpage } = context.state;
            const data = await fetch(`/emps?page=${curpage}&rows=${eachpage}`)
                .then(response => response.json())
            context.commit("renderMsg", data)
        },
        async updateing(context) {
            const { _id, name, job, sal } = context.state.updateMsg;
            await fetch(`/emps/${_id}`, {
                method: "Put",
                body: JSON.stringify({ name, job, sal})
              })
            await context.dispatch('getMsg')
            context.commit("changeUpdateStyle")
        },
        async toDelete(context,id) {
            await fetch(`/emps/${id}`, {
                method: "Delete"
              })
              await context.dispatch('getMsg')
        }
    }
}











