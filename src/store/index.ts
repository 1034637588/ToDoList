import { createStore } from 'vuex'
import { NoteState } from './typings'
import note from './modules/note'
export interface GlobalState {
  note: NoteState
}
// 同样也变成了函数的写法
const store = createStore<GlobalState>({
  mutations: {
  },
  actions: {
  },
  modules: {
    note
  }
})
export default store