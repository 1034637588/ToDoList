/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

//就是个声明文件 就是说 如果引用了一共.vue的文件 就知道是一共组件类型 用来提示用的