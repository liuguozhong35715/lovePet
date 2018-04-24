// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false


import App from "./components/counter/counter.vue"
import Show from "./components/counter/show.vue"
import IButton from "./components/counter/iButton.vue"

import TodoList from "./components/todoList/todoList.vue"
import AddTodo from "./components/todoList/addTodo.vue"
import Todos from "./components/todoList/todos.vue"
import Filters from "./components/todoList/filters.vue"

import ShoppingCar from "./components/ShoppingCar/ShoppingCar.vue"
import ShoppingList from "./components/ShoppingCar/ShoppingList.vue"
import ShoppingTotal from "./components/ShoppingCar/ShoppingTotal.vue"

import WheatherMain from "./components/wheather/wheatherMain.vue"

import ShoppingStoreCar from "./components/storeCar/ShoppingCar.vue"
import ShoppingStoreList from "./components/storeCar/ShoppingList.vue"
import ShoppingStoreTotal from "./components/storeCar/ShoppingTotal.vue"

import store from "./components/store/store"

import message from "./components/test/message.vue"
import inputMes from "./components/test/inputMes.vue"
import showMsg from "./components/test/showMsg.vue"


Vue.component("message", message)
Vue.component("inputMes", inputMes)
Vue.component("showMsg", showMsg)



Vue.component("App", App)
Vue.component("IButton", IButton)
Vue.component("Show", Show)

Vue.component("TodoList", TodoList)
Vue.component("AddTodo", AddTodo)
Vue.component("Todos", Todos)
Vue.component("Filters", Filters)

Vue.component("ShoppingCar", ShoppingCar)
Vue.component("ShoppingList", ShoppingList)
Vue.component("ShoppingTotal", ShoppingTotal)

Vue.component("WheatherMain", WheatherMain)

Vue.component("ShoppingStoreCar", ShoppingStoreCar)
Vue.component("ShoppingStoreList", ShoppingStoreList)
Vue.component("ShoppingStoreTotal", ShoppingStoreTotal)



new Vue({
  el: '#app',
  router,
  store,
  template: `<router-view />`
})



