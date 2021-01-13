import { createStore } from 'vuex'
import note, { NoteState } from './modules/note'

export interface GlobalState {
  note: NoteState
}
// 同样也变成了函数的写法
const store = createStore<GlobalState>({
  // state: {
  // },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
export default store