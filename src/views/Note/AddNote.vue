<template>
  <div class="add-note-box">
    <van-nav-bar left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script lang="ts">
// 平时开发的时候 都是插件给我们提示的 现在我们可以自带提示 通过defineComponent
import router from "@/router";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ToDo",
  components: {},
  setup() {
    const routr = useRouter();
    function onClickLeft(){
      router.go(-1);
    }
    return {
      onClickLeft
    }
  },
});
</script>
<style lang="scss" scoped>
.add-note-box {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  background-color: #fff;
}
</style>