import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/app/login.vue"
import register from "@/components/app/reg.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/register',
      name: 'register',
      component: register,
      children: [
        
      ]
    }]
})
