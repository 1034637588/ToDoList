import { Module } from 'vuex'
import store, { GlobalState } from '../index'
import { NoteState,Note, Page, Result } from '../typings'
import * as NoteAPI from '../../api/notes'
import * as Types from '../action-types'
const state: NoteState = {
    notes: []
}
// 需要传入两个泛型 一个是 本身的state类型 和 全局的state类型 这样用的时候就可以提示了
const note: Module<NoteState, GlobalState> = {
    namespaced: true,
    state,
    mutations: {
        [Types.ADD_NOTES](state,payload:Note) { // 添加一条便签
            state.notes.push(payload)
        },
        [Types.INIT_NOTES](state,payload:Note[]){
            state.notes = payload
        }
    },
    actions:{
        [Types.INIT_NOTES]({commit},paylod:Page){
            NoteAPI.getNotes<Result<Note[]>>(paylod.page,paylod.size).then(data=>{
                commit(Types.INIT_NOTES,data.data)
            })
        }
    }
}

export default note