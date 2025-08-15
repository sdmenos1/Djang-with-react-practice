import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navigation } from './components/Navigation';
import { TaskPage } from './pages/TaskPage';
import { TaskFormPage } from './pages/TaskFormPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Rutas protegidas */}
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TaskPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/task-form"
                element={
                  <ProtectedRoute>
                    <TaskFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks/:id"
                element={
                  <ProtectedRoute>
                    <TaskFormPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              
              {/* Redirección por defecto */}
              <Route path="/" element={<Navigate to="/tasks" replace />} />
              
              {/* Ruta 404 */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                      <p className="text-gray-600 mb-8">Página no encontrada</p>
                      <Navigate to="/tasks" replace />
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
        
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
