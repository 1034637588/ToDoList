<template>
  <div class="list-box">
    <div class="list-left">
      <div class="list-item">
        <div class="item-content">
          <p class="item-text">
            我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我
            我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我
            我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我
            我我我我我我我我我我我我我我我我我我我我我我我我我我我我我我
          </p>
        </div>
        <div class="item-bottom">
          <p>2021年12月12日</p>
        </div>
      </div>
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
    box-sizing: border-box;
    width: 95%;
    height: 2rem;
    background-color: #fff;
    border-radius: 0.15rem;
    margin-top: 0.1rem;
    padding: 0.2rem;
    .item-content {
      height: 1.25rem;
      font-size: 0.16rem;
      line-height: 0.25rem;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      color: rgb(99, 99, 99);
      .item-text:first-line {
          color: rgb(27, 27, 27);
          font-weight: 600;
      }
    }
    .item-bottom {
      height: 0.35rem;
      color: rgb(151, 151, 151);
      display: flex;
      align-items: flex-end;
    }
  }
}
</style>