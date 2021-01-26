##### 此项目为vue3+vuex+vue-router+Ts的 小米手机便签

##### 1.前言
项目主要为了体验vue3+Ts的开发流程，使用vue3组合式的api进行体验开发。并且配备了node+koa+mongodb提供的数据接口（不过需要本地运行一下）
##### 2.主要功能模块有
1.新增便签
2.修改便签
3.删除便签（长按删除、修改为空删除）
4.搜索便签
5.瀑布流的布局方式，触底更新
##### 3.目录结构
  ├─api 请求接口的封装
  │  ├─index.ts 封装axios  
  │  ├─notes.ts 封装便签相关的请求  
  │  └─todolist.ts 封装代办相关的请求  
  ├─compontes 组件  
  │  ├─Header.vue 头部tab组件 
  │  ├─NoteList.vue 瀑布流列表组件
  │  └─ToDoList.vue 代办列表组件 
 ├─hooks 抽离公共逻辑  
  │  ├─useLoadMore.ts 抽离加载更多逻辑
  │  ├─useLongTouch.ts 瀑抽离长按逻辑
  │  └─useNoteState.ts 抽离vuex的使用
  ├─router 路由
  │  └─index.ts 导出路由
  ├─store vuex
  │  ├─moudles 模块 
  │  ├─typings  导出TS相关类型接口
  │  ├─action-types.ts 导出action 字符串
  │  └─index.ts 导出store
  ├─views 页面
  ├─tsconfig.json TS配置文件
  	
##### 3.使用到的VUE3中的API
1.希望给大家指出，大家可以方便对照开发使用
ref、toRefs、toRef、reactive、过渡类名的改变、defineComponent、watch、computed、生命周期等等。。 基本都使用到了常用的新增属性

##### Project setup
```
npm install
```
##### Compiles and hot-reloads for development
```
npm run serve
```
##### Compiles and minifies for production
```
npm run build
```