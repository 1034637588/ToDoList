<template>
  <div class="box">note{{ note }}</div>
  <van-button icon="plus" type="primary" @click="add"/>
  <!-- <div v-model:a="a" v-model:b="b"></div>  可以多个v-model 相当于是 .sync 的操作-->
</template>

<script lang="ts">
// 平时开发的时候 都是插件给我们提示的 现在我们可以自带提示 通过defineComponent
import { GlobalState } from "@/store";
import { computed, defineComponent, PropType } from "vue";
import { useStore, Store } from "vuex";
import { Note } from "../../store/typings";
import * as Types from '../../store/action-types'

// 封装note vuex相关操作 这样就解决了options API中 计算属性 方法等等要写在固定位置
// 这样的写法 就可以把很多功能封装到一个函数中
function useNote(store: Store<GlobalState>) { 
  let notes = computed(() => store.state.note.notes);
  function addNotes(note: Note) {
    store.commit(`note/${Types.ADD_NOTES}`,note)
  }
  return {
    notes,
    addNotes,
  };
}

export default defineComponent({
  name: "Note",
  components: {},
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
    function add() {
      addNotes({title:'123'})
    }
    return { note ,add};
  },
});
</script>
