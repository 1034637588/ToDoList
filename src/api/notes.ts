import axios from './idnex';

export function getNotes<T>() {
    return axios.get<T, T>('/notes/getList');
}

// getNotes<NoteState>().then(data=>{
//     data.title
// })