<template>
  <div class="todo-box">
    <van-search
      v-model="searchValue"
      placeholder="搜索待办"
      input-align="center"
    />
    <div class="list-box">
      <todo-list></todo-list>
    </div>
    <van-button
      round
      icon="plus"
      class="button"
      type="primary"
      @click="addTodo"
    ></van-button>
  </div>
</template>

<script lang="ts">
// 平时开发的时候 都是插件给我们提示的 现在我们可以自带提示 通过defineComponent
import { defineComponent, reactive, toRefs } from "vue";
import TodoList from '../../components/ToDoList.vue'
export default defineComponent({
  name: "ToDo",
  components: {
    TodoList
  },
  setup() {
    const state = reactive({
      searchValue: "",
    });
    const addTodo = () => {
      console.log("add");
    };
    return {
      ...toRefs(state),
      addTodo,
    };
  },
});
</script>
<style lang="scss" scoped>
.todo-box {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0 0.1rem;
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
  .list-box{
    flex: 1;
    background-color: rgb(247, 247, 247);

  }
  .van-search {
    padding: 0;
    ::v-deep .van-search__content {
      background-color: rgb(237, 237, 237);
      border-radius: 0.15rem;
    }
  }
  .button {
    position: fixed;
    bottom: 0.2rem;
    right: 0.2rem;
  }
  .van-button {
    width: 0.44rem;
    height: 0.44rem;
  }
}
</style>