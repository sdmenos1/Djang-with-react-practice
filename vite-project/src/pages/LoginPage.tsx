import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserLogin } from '../types/auth';

export const LoginPage: React.FC = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserLogin>();

    const onSubmit = async (data: UserLogin) => {
        try {
            await login(data);
            navigate('/tasks');
        } catch (error) {
            console.error('Error en login:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Iniciar Sesión
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <Link
                            to="/register"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Nombre de usuario
                            </label>
                            <input
                                {...register('username', {
                                    required: 'El nombre de usuario es requerido',
                                })}
                                type="text"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Nombre de usuario"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Contraseña
                            </label>
                            <input
                                {...register('password', {
                                    required: 'La contraseña es requerida',
                                })}
                                type="password"
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
