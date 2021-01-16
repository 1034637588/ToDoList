<template>
  <div class="list-box">
    <div class="list-left">
      <div class="list-item"></div>
      <div class="list-item"></div>
      <div class="list-item"></div>
      <div class="list-item"></div>
      <div class="list-item"></div>
    </div>
    <div class="list-right">
      <div class="list-item"></div>
      <div class="list-item"></div>
      <div class="list-item"></div>
      <div class="list-item"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "NoteList",
  components: {},
});
</script>
<style lang="scss" scoped>
.list-box {
  width: 100%;
  display: flex;
  .list-left {
    width: 50%;
  }
  .list-right {
    width: 50%;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
  }
  .list-item {
    width: 95%;
    height: 2rem;
    background-color: rosybrown;
    border-radius: 0.15rem;
    margin-top: 0.1rem;
  }
}
</style>