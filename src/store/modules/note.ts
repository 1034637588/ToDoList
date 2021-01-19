import { Module } from 'vuex'
import store, { GlobalState } from '../index'
import { NoteState,Note } from '../typings'
import * as Types from '../action-types'
const state: NoteState = {
    notes: [{
        _id:'10',
        dates:"2010/15/13",
        content:''
    }]
}
// 需要传入两个泛型 一个是 本身的state类型 和 全局的state类型 这样用的时候就可以提示了
const note: Module<NoteState, GlobalState> = {
    namespaced: true,
    state,
    mutations: {
        [Types.ADD_NOTES](state,payload:Note) { // 添加一条便签
            state.notes.push(payload)
        }
    }
}

export default note