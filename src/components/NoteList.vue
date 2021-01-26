<template>
  <div class="list-box" ref="refListBox">
    <div
      class="list-left"
      ref="leftDom"
      @click="clickItem"
    >
    <!-- 左边列表 -->
      <div class="list-item" v-for="item in leftList" :key="item['_id']">
        <div class="item-content">
          <p class="item-text">
            {{ item.content }}
          </p>
        </div>
        <div class="item-bottom">
          <p>{{ item.dates }}</p>
        </div>
        <div class="click-model" :id="item['_id']"></div>
      </div>
    </div>
    <div
      class="list-right"
      ref="rightDom"
      @click="clickItem"
    >
    <!-- 右边列表 -->
      <div class="list-item" v-for="item in rightList" :key="item['_id']">
        <div class="item-content">
          <p class="item-text">
            {{ item.content }}
          </p>
        </div>
        <div class="item-bottom">
          <p>{{ item.dates }}</p>
        </div>
        <div class="click-model" :id="item['_id']"></div>
      </div>
    </div>
    <!-- 用来初次渲染获取高度 -->
    <div class="init-list">
      <div
        class="list-item"
        :ref="(el) => {if(el != null) items.push(el) }"
        v-for="item in notes"
        :key="item['_id']"
      >
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
import {
  defineComponent,
  nextTick,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  PropType,
  reactive,
  ref,
  toRef,
  toRefs,
  watch,
} from "vue";
import * as Typeing from "../store/typings/index";
import useLongTouch from "../hooks/useLongTouch";
import useLoadMore from "../hooks/useLoadMore";
import store from "@/store";
import * as Types from "../store/action-types";
import useNoteState from "../hooks/useNoteState";

export default defineComponent({
  name: "NoteList",
  props: {
    notes: {
      type: Array as PropType<Typeing.Note[]>, // 可以做类型断言
    }
  },
  setup(props, context) {
    // 存储列表的元素
    const items = ref<null | HTMLElement[]>([]); 
    // 获取多个dom元素的用法 ref
    const refListBox = ref<null | HTMLElement>(null);
    useLoadMore(refListBox, context); // 处理触底加载
    const noteListSate: Typeing.noteListSate = {
      leftList: [],
      rightList: []
    };
    // 可以变成相应式的ref
    const notes = toRef(props,'notes');
    const state = reactive(noteListSate);
    // 初始化瀑布流列表
    const initList = () => {
      // 用来分别记录左边当前高度 和右边当前高度
      let leftHeightSum = 0; 
      let rightHeightSum = 0;
      let leftArr: any[] = [];
      let rightArr: any[] = [];
      nextTick(() => {
        // 先渲染出来，然后再获取元素的高度进行分区
        items.value!.forEach((item: any, index) => {
          if (leftHeightSum <= rightHeightSum) {
            // 哪边高度低 就放哪边
            leftArr.push(props.notes![index]);
            leftHeightSum += item?.clientHeight;
          } else {
            rightArr.push(props.notes![index]);
            rightHeightSum += item?.clientHeight;
          }
        });
        // 使倒叙 这样后添加的在上面
        state.leftList = leftArr.reverse(); 
        state.rightList = rightArr.reverse();
      });
    };
    // 通过事件委托监听item的点击，进行跳转详情
    const clickItem = (e: any) => {
      if (e.target.className == "click-model") {
        context.emit("ToAddNote", e.target.id);
      }
    };
    const leftDom = ref<null | HTMLElement>(null);
    const rightDom = ref<null | HTMLElement>(null);
    // 获取长按事件 交给父组件处理
    useLongTouch([leftDom,rightDom],(id: string) => {
      context.emit("longTouch", id);
    });
    onMounted(() => {
      // 赋初值
      initList();
    });
    onUnmounted(() => {
      items.value = []; 
    });
    onBeforeUpdate(()=>{
      // 更新前要清空ref的数组
      items.value = []; 
    })
    watch(props!, () => {
      // 参数改变后重新渲染
      notes.value = props.notes!;
      initList();
    });
    return {
      ...toRefs(state),
      items,
      clickItem,
      refListBox,
      leftDom,
      rightDom,
      notes
    };
  },
});
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list {
  width: 100%;
}
.list-box {
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    /* 滚动条宽 */
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    /* 滚动条 拖动条 */
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    /* 滚动条背景槽 */
    background-color: #eee;
    border-radius: 6px;
  }
  .list-left {
    width: 50%;
    float: left;
    padding-bottom: 50px;
  }
  .list-right {
    width: 50%;
    float: left;
    display: flex;
    flex-flow: column wrap;
    align-items: flex-end;
    padding-bottom: 50px;
  }
  .init-list {
    width: 50%;
    background-color: rgb(122, 129, 127);
    position: absolute;
    visibility: hidden;
    height: 2rem;
    overflow: hidden;
  }
  .list-item {
    box-sizing: border-box;
    width: 95%;
    max-height: 2rem;
    background-color: rgb(245, 245, 245);
    border-radius: 0.15rem;
    margin-top: 0.1rem;
    padding: 0.2rem;
    position: relative;
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
    .click-model {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
}
</style>