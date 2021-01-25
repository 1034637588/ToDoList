import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Note from '../views/Note/Note.vue'
import AddNote from '../views/Note/AddNote.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Note',
    component: Note
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: () => import (/* webpackChunkName: "ToDo" */'../views/ToDo/ToDo.vue')
  },
  {
    path: '/addNote',
    name: 'AddNote',
    component: () => import (/* webpackChunkName: "AddNote" */'../views/Note/AddNote.vue' ),
    // components:{
    //   addNote: AddNote
    // },
    meta:{
      isAllHeight:true
    }
  }
]

// 创建都变成了函数式的写法
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass:'active'
})

export default router
