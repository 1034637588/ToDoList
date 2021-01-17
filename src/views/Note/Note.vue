<template>
  <div class="note-box">
    <van-search
      v-model="searchValue"
      placeholder="搜索便签"
      input-align="center"
    />
    <note-list></note-list>
    <van-button round icon="plus" class="button" type="primary" @click="goToAdd"></van-button>
  </div>
  <!-- <div v-model:a="a" v-model:b="b"></div>  可以多个v-model 相当于是 .sync 的操作-->
</template>

<script lang="ts">
// 平时开发的时候 都是插件给我们提示的 现在我们可以自带提示 通过defineComponent
import { GlobalState } from "@/store";
import { computed, defineComponent, PropType, reactive, toRefs } from "vue";
import { useStore, Store } from "vuex";
import { useRoute,useRouter } from 'vue-router'
import { Note } from "../../store/typings";
import * as Types from "../../store/action-types";
import NoteList from "../../components/NoteList.vue";
// 封装note vuex相关操作 这样就解决了options API中 计算属性 方法等等要写在固定位置
// 这样的写法 就可以把很多功能封装到一个函数中
function useNote(store: Store<GlobalState>) {
  let notes = computed(() => store.state.note.notes);
  function addNotes(note: Note) {
    store.commit(`note/${Types.ADD_NOTES}`, note);
  }
  const state = reactive({
    searchValue: "",
  });
  return {
    notes,
    addNotes,
    ...toRefs(state),
  };
}
export default defineComponent({
  name: "Note",
  components: {
    NoteList,
  },
  // props:{
  //   notes:{
  //     type:Object as PropType<Note> // 可以做类型断言
  //   }
  // },
  // emits:['addnotes'], // 这样通过context.emit 就可以做提示
  setup(props, context) {
    let store = useStore<GlobalState>();
    let { notes, addNotes } = useNote(store);
    let note = notes;
    let router = useRouter();
    function add() {
      addNotes({ title: "123" });
    }
// 路由跳转
    function goToAdd(){
      router.push({path:'/addNote'})
    }
    return { note, add, goToAdd };
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
    ::v-deep .van-search__content{
    background-color: rgb(237,237,237);
    border-radius: 0.15rem;
  }
  }
  .button{
    position: fixed;
    bottom: 0.2rem;
    right: 0.2rem;
  }
  .van-button{
    width: 0.44rem;
    height: 0.44rem;
  }
}
</style>

