import Vue from 'vue'
import Vuex from 'vuex'
import commodity from "../app/commodityManage/store"
import customer from "../app/customerManage/store"
import order  from "../app/orderManage/store"
import pet from "../app/petManage/store"
import server from "../app/serverManage/store"
import storeManage  from "../app/storeManage/store"
import user from "../app/userManage/store"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        customer,
        commodity,
        order,
        storeManage,
        server,
        pet,
        user
    }
})