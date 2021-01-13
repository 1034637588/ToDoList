// 便签对象的接口
export interface Note{
    title:string,
}
// 便签状态的接口
export interface NoteState {
    notes:Note[] // 数组也使用接口做一下规范
}