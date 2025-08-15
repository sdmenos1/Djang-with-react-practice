import axios from 'axios';
import type { Task } from '../types/type';

const tasksAPI = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/',
});

// Interceptor para añadir el token a las requests
tasksAPI.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// Interceptor para manejar errores de autenticación
tasksAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const getAllTasks = (): Promise<any> => {
    return tasksAPI.get('/');
}

export const getTaskById = (id: string): Promise<any> => {
    return tasksAPI.get(`/${id}/`);
}

export const createTaks = (task: Task): Promise<any> => {
    return tasksAPI.post('/', task);
}

export const updateeTask = (task: Task): Promise<any> => {
    return tasksAPI.put(`/${task.id}/`, task);
}

export const deleteTask = (tasks: Task): Promise<any> => {
    return tasksAPI.delete(`/${tasks.id}/`);
}
