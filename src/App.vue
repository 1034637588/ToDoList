<template>
  <div class="box">
    <Header v-if="!isFullHeight"></Header>
    <transition name="inout">
       <router-view></router-view>
    </transition>
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
.inout-enter-active,
.inout-leave-active {
  transition: all 0.8s ease;
}
.inout-enter-to, .inout-leave-form{
  opacity: 1;
  transform: scale(1);
  transform-origin: bottom right;
}
.inout-enter-from ,.inout-leave-to{
  opacity: 0;
  transform: scale(0);
  transform-origin: bottom right;
}

.box{
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
}
</style>