<template>
  <div class="box">
    todo
  </div>
</template>

<script lang="ts">
// 平时开发的时候 都是插件给我们提示的 现在我们可以自带提示 通过defineComponent
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToDo',
  components: {
  },
  
});
</script>