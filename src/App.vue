<template>
  <div class="box">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Header from './components/Header.vue'
export default defineComponent({
  components:{
    Header
  }
})
</script>
<style lang="scss">
.box{
  width: 100vw;
  height: 100vh;
  padding: 0.1rem;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
}
</style>