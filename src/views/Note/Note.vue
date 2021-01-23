<template>
  <div class="note-box">
    <van-search
      v-model="searchValue"
      placeholder="搜索便签"
      input-align="center"
    />
    <note-list 
    :notes="notes"
    @ToAddNote="clickItem" ></note-list>
    <van-button
      round
      icon="plus"
      class="button"
      type="primary"
      @click="clickAdd"
    ></van-button>
  </div>
  <!-- <div v-model:a="a" v-model:b="b"></div>  可以多个v-model 相当于是 .sync 的操作-->
</template>

<script lang="ts">
// 平时开发的时候 都是插件给我们提示的 现在我们可以自带提示 通过defineComponent
import { GlobalState } from "@/store";
import { computed, defineComponent, PropType, reactive, toRefs } from "vue";
import { useStore, Store } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { Note, Page } from "../../store/typings";
import * as Types from "../../store/action-types";
import NoteList from "../../components/NoteList.vue";
import useNoteState from '../../hooks/useNoteState';


export default defineComponent({
  name: "Note",
  components: {
    NoteList,
  },
  // emits: ["addnotes"], // 这样通过context.emit 就可以做提示
  setup(props, context) {
    let store = useStore<GlobalState>();
    let { notes, getNotesByPage } = useNoteState(store);
    let router = useRouter();
    const state = reactive({
      searchValue: "",
      noteList:[]
    });
    //获取初始化数据 并且缓存 如果store存在 就不重新请求
    if(store.state.note.notes.length === 0) {
       getNotesByPage({page:1,size:30});
    }
    // 路由跳转
    const clickAdd = ()=>{
      router.push({ path: "/addNote"});
    }
    const clickItem = (id:string)=>{
      router.push({ path: "/addNote",query:{id}});
    }
    return {
      notes, 
      clickAdd, 
      clickItem,
      ...toRefs(state)
   };
  },
});
</script>
<style lang="scss" scoped>
.note-box {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
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

