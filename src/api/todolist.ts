import axios from './idnex';
import { ToDo } from '@/store/typings';

// 分页
export function getTodos<T>(page: number, size: number) {
    return axios.get<T, T>(`/todo/${page}/${size}`);
}

// 搜索API
export function getTodoListByContent<T>(content:string) {
    return axios.get<T,T>(`/todo/${content}`);
}

// 添加note
export function addTodo<T>(note:ToDo){
    return axios.post<T,T>('/todo',note);
}

// 删除note
export function deleteTodo<T>(id:string){
    return axios.delete(`/todo/${id}`);
}

// 修改note
export function updateTodo<T>(id:string,note:ToDo){
    return axios.put(`/todo/${id}`,note);
}
