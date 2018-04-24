import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/app/login.vue"
import info from "@/components/app/info.vue"

import userManage from "@/components/app/userManage/userManage.vue"
import customerManage from "@/components/app/customerManage/customerManage.vue"
import storeManage from "@/components/app/storeManage/storeManage.vue"
import petManage from "@/components/app/petManage/petManage.vue"
import commodityManage from "@/components/app/commodityManage/commodityManage.vue"
import serverManage from "@/components/app/serverManage/serverManage.vue"
import orderManage from "@/components/app/orderManage/orderManage.vue"

import userList from "@/components/app/userManage/userList.vue"
import userCould from "@/components/app/userManage/userCould.vue"

import customerList from "@/components/app/customerManage/customerList.vue"

import storeList from "@/components/app/storeManage/storeList.vue"

import petList from "@/components/app/petManage/petList.vue"

import commodityList from "@/components/app/commodityManage/commodityList.vue"

import serverList from "@/components/app/serverManage/serverList.vue"

import orderList from "@/components/app/orderManage/orderList.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/info',
      name: 'info',
      component: info,
      children: [
        { 
          path: 'userManage',
          component: userManage ,
          children: [
            {
              path: 'userList',
              component: userList 
            },
            {
              path: 'userCould',
              component: userCould 
            }
          ]
        },
        { 
          path: 'customerManage',
          component: customerManage,
          children: [
            {
              path: 'customerList',
              component: customerList 
            }
          ] 
        },
        { 
          path: 'storeManage',
          component: storeManage,
          children: [
            {
              path: 'storeList',
              component: storeList 
            }
          ] 
        },
        {
          path:'petManage',
          component: petManage,
          children: [
            {
              path: 'petList',
              component: petList 
            }
          ] 
        },
        {
          path:'commodityManage',
          component: commodityManage ,
          children: [
            {
              path: 'commodityList',
              component: commodityList 
            }
          ]
        },
        {
          path:'serverManage',
          component: serverManage,
          children: [
            {
              path: 'serverList',
              component: serverList 
            }
          ] 
        },
        {
          path:'orderManage',
          component: orderManage,
          children: [
            {
              path: 'orderList',
              component: orderList 
            }
          ] 
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
