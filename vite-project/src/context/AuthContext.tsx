import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AuthState, User, UserLogin, UserRegistration } from '../types/auth';
import { loginUser, registerUser, logoutUser, getUserProfile } from '../api/auth.api';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
    login: (credentials: UserLogin) => Promise<void>;
    register: (userData: UserRegistration) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

type AuthAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: User };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
            };
        case 'LOGOUT':
            return {
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        case 'UPDATE_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const initialState: AuthState = {
    user: null,
    token: sessionStorage.getItem('authToken'),
    isAuthenticated: false,
    loading: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = async (credentials: UserLogin) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await loginUser(credentials);
            
            sessionStorage.setItem('authToken', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user: response.user, token: response.token },
            });
            
            toast.success(response.message || 'Inicio de sesión exitoso');
        } catch (error: any) {
            dispatch({ type: 'SET_LOADING', payload: false });
            const errorMessage = error.response?.data?.message || 
                               error.response?.data?.non_field_errors?.[0] ||
                               'Error en el inicio de sesión';
            toast.error(errorMessage);
            throw error;
        }
    };

    const register = async (userData: UserRegistration) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await registerUser(userData);
            
            sessionStorage.setItem('authToken', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user: response.user, token: response.token },
            });
            
            toast.success(response.message || 'Registro exitoso');
        } catch (error: any) {
            dispatch({ type: 'SET_LOADING', payload: false });
            const errorMessage = error.response?.data?.message || 
                               Object.values(error.response?.data || {})[0] as string ||
                               'Error en el registro';
            toast.error(errorMessage);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
            toast.success('Sesión cerrada correctamente');
        }
    };

    const checkAuth = async () => {
        const token = sessionStorage.getItem('authToken');
        const storedUser = sessionStorage.getItem('user');
        
        if (token && storedUser) {
            try {
                const user = await getUserProfile();
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user, token },
                });
            } catch (error) {
                sessionStorage.removeItem('authToken');
                sessionStorage.removeItem('user');
                dispatch({ type: 'LOGOUT' });
            }
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};
