export interface User {
    id?: string;
    username: string;
    email: string;
    names: string;
    lastname: string;
    phone?: string;
    address?: string;
    date?: string;
    is_active?: boolean;
}

export interface UserRegistration {
    username: string;
    email: string;
    names: string;
    lastname: string;
    phone?: string;
    address?: string;
    password: string;
    password_confirm: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    message: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
}
