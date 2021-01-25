<template>
  <div class="note-box">
    <van-search
      v-model="searchValue"
      placeholder="搜索便签"
      input-align="center"
    />
    <note-list 
    :notes="notes"
    @ToAddNote="clickItem"
    @longTouch="longTouch"
    @loadMore="loadMore" ></note-list>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '10%' }" >
      <div class="delete-box" @click="handleDel">
        删除
      </div>
    </van-popup>
    <div class="loading-box">
      <van-loading size="24px" v-show="isLoading" vertical>加载中...</van-loading>
    </div>
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
import { computed, defineComponent, PropType, reactive, ref, toRefs, watch } from "vue";
import { useStore, Store } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { Note, Page } from "../../store/typings";
import * as Types from "../../store/action-types";
import NoteList from "../../components/NoteList.vue";
import useNoteState from '../../hooks/useNoteState';
import { Notify } from 'vant';

export default defineComponent({
  name: "Note",
  components: {
    NoteList,
  },
  // emits: ["addnotes"], // 这样通过context.emit 就可以做提示
  setup(props, context) {
    let store = useStore<GlobalState>();
    let { notes, getNotesByPage,deleteNote,isLoading } = useNoteState(store);
    let router = useRouter();
    const state = reactive({
      searchValue: "",
      page: 1,
      size: 15,
      delId: ''
    });
    //获取初始化数据 并且缓存 如果store存在 就不重新请求
    if(store.state.note.notes.length === 0) {
       getNotesByPage({
         page:state.page,
         size:state.size
       });
    }
    // 路由跳转
    const clickAdd = ()=>{
      router.push({ path: "/addNote"});
    }
    const clickItem = (id:string)=>{
      router.push({ path: "/addNote",query:{id}});
    }

    // 处理长按
    const show = ref(false);
    let id:string;
    const longTouch =async (id:string)=>{
        show.value = true;
        state.delId = id;
    }
    // 处理删除
    const handleDel= async()=>{
      await deleteNote(state.delId);
      show.value = false;
    }
    // 处理加载更多
    const loadMore = async () => {
       store.commit(`note/${Types.SET_LOADIBG}`,true);
       state.page++;
       await getNotesByPage({
         page:state.page,
         size:state.size
       });
      store.commit(`note/${Types.SET_LOADIBG}`,false);
    }
    return {
      notes, 
      clickAdd, 
      clickItem,
      longTouch,
      ...toRefs(state),
      show,
      handleDel,
      loadMore,
      isLoading
   };
  },
});
</script>
<style lang="scss" scoped>
.note-box {
  width: 100%;
  overflow: hidden;
  flex: 1;
  padding:0 0.1rem;
  box-sizing: border-box;
  .van-search {
    padding: 0;
    ::v-deep .van-search__content {
      background-color: rgb(237, 237, 237);
      border-radius: 0.15rem;
    }
    background-color: rgb(247, 247, 247);
  }
  .delete-box{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1989fa;
    font-size: 0.23rem;
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
  .loading-box{
    width: 100%;
    height: 30px;
    position: fixed;
    bottom: 0rem;
  }
}
</style>

