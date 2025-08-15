import React from 'react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="bg-indigo-600 px-6 py-8">
                        <div className="flex items-center">
                            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center">
                                <span className="text-3xl font-bold text-indigo-600">
                                    {user.names?.charAt(0)}{user.lastname?.charAt(0)}
                                </span>
                            </div>
                            <div className="ml-6">
                                <h1 className="text-2xl font-bold text-white">
                                    {user.names} {user.lastname}
                                </h1>
                                <p className="text-indigo-200">@{user.username}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-8">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Nombre completo
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {user.names} {user.lastname}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Nombre de usuario
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {user.username}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Correo electrónico
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {user.email}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Teléfono
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {user.phone || 'No especificado'}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Dirección
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {user.address || 'No especificada'}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Fecha de registro
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900">
                                    {user.date ? new Date(user.date).toLocaleDateString('es-ES') : 'No disponible'}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">
                                    Estado
                                </dt>
                                <dd className="mt-1">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        user.is_active 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {user.is_active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-8 flex justify-center">
                            <button className="btn btn-primary">
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
