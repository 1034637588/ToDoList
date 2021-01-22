<template>
  <div class="list-box">
    <div class="list-left">
      <div class="list-item" :ref="itembox" v-for="item in leftList" :key="item.id">
        <div class="item-content">
          <p class="item-text">
            {{ item.content }}
          </p>
        </div>
        <div class="item-bottom">
          <p>{{ item.dates }}</p>
        </div>
      </div>
    </div>
    <div class="list-right">
      <div class="list-item" v-for="item in rightList" :key="item.id">
        <div class="item-content">
          <p class="item-text">
            {{ item.content }}
          </p>
        </div>
        <div class="item-bottom">
          <p>{{ item.dates }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUpdated, PropType, reactive, ref, toRefs, watch } from "vue";
import * as Typeing from "../store/typings/index";
export default defineComponent({
  name: "NoteList",
  props: {
    notes: {
      type: Array as PropType<Typeing.Note[]>, // 可以做类型断言
    },
  },
  setup(props, context) {
    let items:any[] = []; // 存储列表的元素
    // 获取多个dom元素的用法
    const itembox = (el = null)=>{
      items.push(el);
    };
    const noteListSate: Typeing.noteListSate = {
      leftList: [],
      rightList: [],
      notes: []
    };
    const state = reactive(noteListSate);
    // 初始化瀑布流列表
    const initList = ()=>{
      let leftHeightSum = 0;
      let rightHeightSum = 0;
      let leftArr:any[] = [];
      let rightArr:any[] = [];
      nextTick(()=>{ // 先渲染出来，然后再获取元素的高度进行分区
        items.forEach((item,index) => {
        if(leftHeightSum <= rightHeightSum) { // 哪边高度低 就放哪边
          leftArr.push(props.notes![index]);
          leftHeightSum += item.clientHeight;
        } else {
          rightArr.push(props.notes![index]);
          rightHeightSum += item.clientHeight;
        }
      });
      state.leftList = leftArr;
      state.rightList = rightArr;
      })
    }

    watch(props!,()=>{
     state.leftList = props.notes!
     initList();
    });
    return {
      ...toRefs(state),
      itembox
    };
  },
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
    max-height: 2rem;
    background-color: #ccc;
    border-radius: 0.15rem;
    margin-top: 0.1rem;
    padding: 0.2rem;
    .item-content {
      max-height: 1.25rem;
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