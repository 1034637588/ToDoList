import { Module } from 'vuex'
import {GlobalState} from '../index'
interface Note{
    title:string
}
export interface NoteState {
    notes:Note[] // 数组也使用接口做一下规范
}
const state:NoteState = {
    notes:[]
}
// 需要传入两个泛型 一个是 本身的state类型 和 全局的state类型 这样用的时候就可以提示了
const note: Module<NoteState,GlobalState> = {
    namespaced:true,
    state,
    mutations:{
        addNote(){

        }
    }
}

export default note