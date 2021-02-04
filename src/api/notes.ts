import axios from '.';
import { Note } from '@/store/typings';

// 分页
export function getNotes<T>(page: number, size: number) {
    return axios.get<T, T>(`/note/page/${page}/${size}`);
}

// 搜索API
export function getNoteListByContent<T>(content:string) {
    return axios.get<T,T>(`/note/content/${content}`);
}
// id 查询
export function getNoteById<T>(id:string){
    return axios.get<T,T>(`/note/id/${id}`);
}

// 添加note
export function addNote<T>(note:Note){
    return axios.post<T,T>('/note',note);
}

// 删除note
export function deleteNote<T>(id:string){
    return axios.delete(`/note/${id}`);
}

// 修改note
export function updateNote<T>(id:string,note:Note){
    return axios.put(`/note/${id}`,note);
}
