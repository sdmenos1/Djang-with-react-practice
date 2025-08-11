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

export const getTaskById=(id:string):Promise<any>=>{
    return tasksAPI.get(`/${id}/`);
}

export const createTaks = (task: Task): Promise<any> => {
    return tasksAPI.post('/', task);
}

export const updateeTask= (task:Task): Promise<any> => {
    return tasksAPI.put(`/${task.id}/`, task);
}

export const deleteTask=(tasks:Task) : Promise<any> => {
    return tasksAPI.delete(`/${tasks.id}/`);
}