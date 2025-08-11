import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import { TaskPage } from './pages/TaskPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { Navigation } from './components/Navigation'
export default function App() {
  return (
    <BrowserRouter>
    <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Navigate to="/task" replace />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/task-form" element={<TaskFormPage />} />
        <Route path="/tasks/:id" element={<TaskFormPage />} />
      </Routes>
    </BrowserRouter>  
  )
}