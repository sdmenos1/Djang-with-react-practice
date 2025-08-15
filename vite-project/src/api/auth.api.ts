import axios from 'axios';
import type { UserRegistration, UserLogin, AuthResponse, User } from '../types/auth';

const authAPI = axios.create({
    baseURL: 'http://localhost:8000/account/api/',
});

// Interceptor para añadir el token a las requests
authAPI.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// Interceptor para manejar errores de autenticación
authAPI.interceptors.response.use(
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

export const registerUser = (userData: UserRegistration): Promise<AuthResponse> => {
    return authAPI.post('/register/', userData).then(response => response.data);
};

export const loginUser = (credentials: UserLogin): Promise<AuthResponse> => {
    return authAPI.post('/login/', credentials).then(response => response.data);
};

export const logoutUser = (): Promise<{ message: string }> => {
    return authAPI.post('/logout/').then(response => response.data);
};

export const getUserProfile = (): Promise<User> => {
    return authAPI.get('/profile/').then(response => response.data);
};

export const getAllUsers = (): Promise<User[]> => {
    return authAPI.get('/users/').then(response => response.data);
};

export const getUserById = (id: string): Promise<User> => {
    return authAPI.get(`/users/${id}/`).then(response => response.data);
};
