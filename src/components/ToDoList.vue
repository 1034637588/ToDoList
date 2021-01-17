<template>
    <div class="todo-list">
        <div class="todo-item" v-for="item in todoList" :key="item.content">
            <van-checkbox v-model="item.done"></van-checkbox>
            <p class="text">
               {{ item.content }}
            </p>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import * as Typeing from '../store/typings/index'
export default defineComponent({
  name: "ToDoList",
  props:{
    todoList:{
      type:Array as PropType<Typeing.ToDo[]> // 可以做类型断言
    }
  },
  components: {},
});
</script>
<style lang="scss">
.todo-list{
    .todo-item{
        height: 0.6rem;
        width: 100%;
        margin-top: 0.1rem;
        border-radius: 0.15rem;
        background-color: #fff;
        padding: 0 0.2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .text{
            font-size: 0.16rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
            margin-left: 0.1rem;
        }
    }
}
</style>
