import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import RoleGuard from './components/guards/RoleGuard'
import Dashboard from './components/Dashboard'
import AllStudent from './components/student/AllStudent'
import AddStudent from './components/student/AddStudent'
import AddBatch from './components/batch/AddBatch'
import ShowBatches from './components/batch/ShowBatches'
import Batch from './components/batch/Batch'
import BatchDetails from './components/batch/BatchDetails'
import AddClassroom from './components/AddClassroom'
import AddEvent from './components/AddEvent'
import AddCoordinator from './components/AddCoordinator'
import AddTrainer from './components/AddTrainer'
import AddSlot from './components/AddSlot'
import Reports from './components/Reports'
import { PERMISSIONS } from './utils/rbac'

const routes=createBrowserRouter([
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/register",
    element:<Register />
  },
  {
    path:"",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.REPORTS_READ]}><Dashboard /></RoleGuard></ProtectedRoute>
      },
      {
        path:"student",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.STUDENT_READ]}><AllStudent /></RoleGuard></ProtectedRoute>
      },
      {
        path:"add-student",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.STUDENT_CREATE]}><AddStudent /></RoleGuard></ProtectedRoute>
      },
      {
        path:"add-batch",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.BATCH_CREATE]}><AddBatch /></RoleGuard></ProtectedRoute>
      },
      {
        path:"batch",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.BATCH_READ]}><Batch /></RoleGuard></ProtectedRoute>
      },
      {
        path:"batch/:id",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.BATCH_READ]}><BatchDetails /></RoleGuard></ProtectedRoute>
      },
      {
        path:"classroom",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.CLASSROOM_READ]}><div>Classroom List Component</div></RoleGuard></ProtectedRoute>
      },
      {
        path:"add-classRoom",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.CLASSROOM_CREATE]}><AddClassroom /></RoleGuard></ProtectedRoute>
      },
      {
        path:"event",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.EVENT_READ]}><div>Event List Component</div></RoleGuard></ProtectedRoute>
      },
      {
        path:"add-event",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.EVENT_CREATE]}><AddEvent /></RoleGuard></ProtectedRoute>
      },
      {
        path:"coordinator",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.COORDINATOR_READ]}><div>Coordinator List Component</div></RoleGuard></ProtectedRoute>
      },
      {
        path:"add-coordinator",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.COORDINATOR_CREATE]}><AddCoordinator /></RoleGuard></ProtectedRoute>
      },
      {
        path:"trainer",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.TRAINER_READ]}><div>Trainer List Component</div></RoleGuard></ProtectedRoute>
      },
      {
        path:"add-trainer",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.TRAINER_CREATE]}><AddTrainer /></RoleGuard></ProtectedRoute>
      },
      {
        path:"slot",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.SLOT_READ]}><div>Slot List Component</div></RoleGuard></ProtectedRoute>
      },
      {
        path:"add-slot",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.SLOT_CREATE]}><AddSlot /></RoleGuard></ProtectedRoute>
      },
      {
        path:"reports",
        element:<ProtectedRoute><RoleGuard permissions={[PERMISSIONS.REPORTS_READ]}><Reports /></RoleGuard></ProtectedRoute>
      }
    ]
  }
])
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes}/>
    </AuthProvider>
  )
}

export default App
