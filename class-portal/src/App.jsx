import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
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

const routes=createBrowserRouter([
  {
    path:"",
    element:<Layout/>,
    children:[
      {
        path:"",
        element:<Dashboard />
      },
      {
        path:"student",
        element:<AllStudent />
      },
      {
        path:"add-student",
        element:<AddStudent />
      },
      {
        path:"add-batch",
        element:<AddBatch />
      },
      {
        path:"batch",
        element:<Batch />
      },
      {
        path:"batch/:id",
        element:<BatchDetails />
      },
      {
        path:"add-classRoom",
        element:<AddClassroom />
      },
      {
        path:"add-event",
        element:<AddEvent />
      },
      {
        path:"add-coordinator",
        element:<AddCoordinator />
      },
      {
        path:"add-trainer",
        element:<AddTrainer />
      },
      {
        path:"add-slot",
        element:<AddSlot />
      },
      {
        path:"reports",
        element:<Reports />
      }
    ]
  }
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
