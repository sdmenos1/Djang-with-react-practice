import axios from 'axios';
import type { Task } from '../types/type';
const tasksAPI = axios.create(
    {
        baseURL: 'http://localhost:8000/tasks/api/v1/tasks/',
    }
)

export const getAllTasks=():Promise<any>=>{
    return tasksAPI.get('/');
}


export const createTaks = (task: Task): Promise<any> => {
    return tasksAPI.post('/', task);
}
