<template>
  <div class="add-note-box">
    <van-nav-bar left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="success" size="18" />
      </template>
    </van-nav-bar>
    <van-field
      class="field"
      v-model="note.content"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入内容"
    />
  </div>
</template>

<script lang="ts">
// 平时开发的时候 都是插件给我们提示的 现在我们可以自带提示 通过defineComponent
import router from "@/router";
import { GlobalState } from "@/store";
import { Note, Result } from "@/store/typings";
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Store, useStore } from "vuex";
import * as Types from "../../store/action-types";
import useNoteStore from "../../hooks/useNoteState"; // 引入组定义store hooks
import * as NoteAPI from "../../api/notes";

export default defineComponent({
  name: "ToDo",
  components: {},
  setup(props, context) {
    let store = useStore<GlobalState>();
    let { notes, addNote ,updateNote ,deleteNote} = useNoteStore(store);
    const state = reactive({
      note: {
        content: "",
        dates: "",
      },
      id: "",
      oldContent:''
    });
    const routr = useRouter();
    const rout = useRoute();
    const date = new Date();

    // 点击返回提交数据(存在id为更新，并且如果存在id，内容修改为空则为删除，不存在id为添加)
    const onClickLeft = async() => {
      if (!state.note.content.trim()) {
        // 如果没有数据 判断是点击详情进入 还是点击添加进入
        if (state.id) {
          // 如果为点击详情进入，则删除
          await deleteNote(state.id);
        }
        router.go(-1);
        return;
      }
      // 有数据需要判断是添加 还是更新
      state.note.dates = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      if (state.id) {
        if (state.oldContent !== state.note.content){ // 如果点击进来没有改变就不更新
           // 更新
          await updateNote({
            id:state.id, note:state.note
          });
        }
      } else {
        await addNote(state.note);
      }
      router.go(-1);
    };
    // 初始化数据
    const initNote = () => {
      const notes = store.state.note.notes;
      const id = rout.query.id;
      if (!id) return; // 如果没有id说明是点击添加
      notes.forEach((item) => {
        // 首次从store中获取
        if (item._id === id) {
          state.note.content = item.content;
          state.oldContent = item.content; // 记录初始值
          state.id = id;
        }
      });
      if (!state.note.content) {
        //如果刷新页面从后端请求
        NoteAPI.getNoteById<Result<Note>>(id as string).then((data) => {
          state.note.content = data.data.content;
          state.oldContent = data.data.content;
          state.id = data.data._id!;
        });
      }
    };
    onMounted(() => {
      initNote();
    });
    return {
      onClickLeft,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.add-note-box {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  background-color: #fff;
}
.field{
  font-size: 0.22rem;
}
</style>