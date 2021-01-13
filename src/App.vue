<template>
  <div id="nav">
    <div class="header">
      <div class="h-left">
        <router-link :to="{name:'Note'}">便签</router-link>
      </div>
      <div class="h-right">
        <router-link :to="{name:'ToDo'}">待办</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.header{
  height: 5vh;
  background-color: aquamarine;
  display: flex;
  align-items: center;
}
</style>
