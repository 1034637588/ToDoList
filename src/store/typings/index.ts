// 便签对象的接口
export interface Note{
    _id?:string;
    dates:string;
    content:string;
}
// 便签状态的接口
export interface NoteState {
    notes:Note[] // 数组也使用接口做一下规范
}

// 待办的接口
export interface ToDo {
    _id?:string;
    done:boolean;
    content:string;
}

// 待办状态的接口
export interface ToDoState {
    todo:ToDo[] // 数组也使用接口做一下规范
}

// 分页payload
export interface Page {
  page:number,
  size:number
}

// 请求结果
export interface Result<T> {
    status:number;
    data:T;
    message:string;
}