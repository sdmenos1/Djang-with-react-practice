import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navigation() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <nav className="bg-indigo-600 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-white text-xl font-bold">
                                TaskApp
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/login"
                                className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-indigo-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/tasks" className="text-white text-xl font-bold">
                            TaskApp
                        </Link>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/tasks"
                            className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Tareas
                        </Link>
                        <Link
                            to="/task-form"
                            className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Nueva Tarea
                        </Link>
                        
                        <div className="relative group">
                            <button className="text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                <span className="mr-2">👤</span>
                                {user?.names} {user?.lastname}
                            </button>
                            
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="py-1">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Mi Perfil
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
