import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'
import './style/reset.css'
// 以前是new Vue现在是函数的方式
createApp(App).use(Vant).use(store).use(router).mount('#app')
