// 便签对象的接口
export interface Note{
    dates:string;
    content:string;
}
// 便签状态的接口
export interface NoteState {
    notes:Note[] // 数组也使用接口做一下规范
}

// 待办的接口
export interface ToDo {
    done:boolean;
    content:string;
}

// 待办状态的接口
export interface ToDoState {
    todo:ToDo[] // 数组也使用接口做一下规范
}