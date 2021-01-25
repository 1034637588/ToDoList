import { Module } from 'vuex'
import store, { GlobalState } from '../index'
import { NoteState, Note, Page, Result } from '../typings'
import * as NoteAPI from '../../api/notes'
import * as Types from '../action-types'
const state: NoteState = {
    notes: [],
    isRequestError: false,
    isLoading: false
}
// 需要传入两个泛型 一个是 本身的state类型 和 全局的state类型 这样用的时候就可以提示了
const note: Module<NoteState, GlobalState> = {
    namespaced: true,
    state,
    mutations: {
        [Types.ADD_NOTES](state, payload: Note) { // 添加一条便签
            state.notes.push(payload)
        },
        [Types.INIT_NOTES](state, payload: Note[]) {
            state.notes.push(...payload)
        },
        [Types.SET_ERROR](state, payload: boolean) {
            state.isRequestError = payload
        },
        [Types.SET_LOADIBG](state,payload:boolean){
            state.isLoading = payload
        },
        [Types.UPDATE_NOTES](state, payload: any) {
            state.notes.forEach((note:Note) => {
                if(note._id === payload.id){
                    note.content = payload.note.content;
                    note.dates =  payload.note.dates;
                }
            });
        },
        [Types.DELETE_NOTES](state, payload: string) {
            const index = state.notes.findIndex((note:Note) => {
                return note._id === payload;
            });
            state.notes.splice(index,1);
        }
    },
    actions: {
        // 分页请求
        [Types.INIT_NOTES]({ commit }, payload: Page) {
            NoteAPI.getNotes<Result<Note[]>>(payload.page, payload.size).then(data => {
                commit(Types.INIT_NOTES, data.data)
            })
        },
        // 添加note
        [Types.ADD_NOTES]({ commit }, payload: Note) {
            return NoteAPI.addNote<Result<Note>>(payload).then(data => {
                commit(Types.ADD_NOTES, data.data);
            });
        },
        // 修改note
        [Types.UPDATE_NOTES]({commit,state},payload:any) {
            return NoteAPI.updateNote(payload.id,payload.note).then(data => {
                commit(Types.UPDATE_NOTES, {id:payload.id,note:payload.note}); // 更新数据
            });
        },
        // 删除note
        [Types.DELETE_NOTES]({ commit,state }, payload: string) {
            return NoteAPI.deleteNote<Result<number>>(payload).then(data => {
                commit(Types.DELETE_NOTES, payload); // 更新数据
            })
        },
    }
}

export default note