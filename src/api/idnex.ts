import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    return config
});
axios.interceptors.response.use((response: AxiosResponse) => {
    return response.data
},err => {
    return Promise.reject(err)
});

export default axios;
