import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style/reset.css'
import './style/globle.css'


// 以前是new Vue现在是函数的方式
const app = createApp(App).use(Vant).use(store).use(router).mount('#app')

// 处理dev-tools无法使用问题