
import { GlobalState } from "@/store";
import { Store } from 'vuex';
import { computed } from 'vue';
import { Page, Note } from '@/store/typings';
import * as Types from "../store/action-types";
// 封装note vuex相关操作 这样就解决了options API中 计算属性 方法等等要写在固定位置
// 这样的写法 就可以把很多功能封装到一个函数中
export default function useNote(store: Store<GlobalState>) {
    let notes = computed(() => store.state.note.notes); // 使用computed可以使数据变成响应式
    let isLoading = computed(()=>store.state.note.isLoading);
    function getNotesByPage(paylod:Page) {
      store.dispatch(`note/${Types.INIT_NOTES}`, paylod);
    }
    function addNote(paylod:Note) { // 为了获取返回值 使用异步函数封装
      return store.dispatch(`note/${Types.ADD_NOTES}`, paylod);
    }
    function updateNote(payload:any){
      return store.dispatch(`note/${Types.UPDATE_NOTES}`,payload);
    }
    function deleteNote(payload:string){
      return store.dispatch(`note/${Types.DELETE_NOTES}`,payload);
    }
    return {
      notes,
      getNotesByPage,
      addNote,
      updateNote,
      deleteNote,
      isLoading
    };
  }