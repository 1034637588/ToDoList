<template>
  <div class="box">
    <router-view name="addNote"/>
    <Header v-if="!isFullHeight"></Header>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed} from "vue"
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
export default defineComponent({
  components:{
    Header
  },
  setup(props,contxt){
    const route = useRoute();
    const isFullHeight = computed(()=>{
      return route.meta.isAllHeight
    });
    return {
      isFullHeight
    }
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