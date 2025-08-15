import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { UserRegistration } from '../types/auth';

export const RegisterPage: React.FC = () => {
    const { register: registerUser, loading } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<UserRegistration>();

    const password = watch('password');

    const onSubmit = async (data: UserRegistration) => {
        try {
            await registerUser(data);
            navigate('/tasks');
        } catch (error) {
            console.error('Error en registro:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Crear Cuenta
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Nombre de usuario *
                            </label>
                            <input
                                {...register('username', {
                                    required: 'El nombre de usuario es requerido',
                                    minLength: {
                                        value: 3,
                                        message: 'Mínimo 3 caracteres'
                                    }
                                })}
                                type="text"
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Usuario123"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo electrónico *
                            </label>
                            <input
                                {...register('email', {
                                    required: 'El correo es requerido',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Correo inválido'
                                    }
                                })}
                                type="email"
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="correo@ejemplo.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="names" className="block text-sm font-medium text-gray-700">
                                    Nombres *
                                </label>
                                <input
                                    {...register('names', {
                                        required: 'Los nombres son requeridos',
                                    })}
                                    type="text"
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Juan Carlos"
                                />
                                {errors.names && (
                                    <p className="mt-1 text-sm text-red-600">{errors.names.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                                    Apellidos *
                                </label>
                                <input
                                    {...register('lastname', {
                                        required: 'Los apellidos son requeridos',
                                    })}
                                    type="text"
                                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Pérez García"
                                />
                                {errors.lastname && (
                                    <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Teléfono
                            </label>
                            <input
                                {...register('phone')}
                                type="tel"
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="+505 8888-8888"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Dirección
                            </label>
                            <input
                                {...register('address')}
                                type="text"
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Managua, Nicaragua"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña *
                            </label>
                            <input
                                {...register('password', {
                                    required: 'La contraseña es requerida',
                                    minLength: {
                                        value: 8,
                                        message: 'Mínimo 8 caracteres'
                                    }
                                })}
                                type="password"
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700">
                                Confirmar Contraseña *
                            </label>
                            <input
                                {...register('password_confirm', {
                                    required: 'Debes confirmar la contraseña',
                                    validate: (value) =>
                                        value === password || 'Las contraseñas no coinciden'
                                })}
                                type="password"
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="••••••••"
                            />
                            {errors.password_confirm && (
                                <p className="mt-1 text-sm text-red-600">{errors.password_confirm.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
