import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import AllStudent from './components/student/AllStudent'
import AddStudent from './components/student/AddStudent'
import AddBatch from './components/batch/AddBatch'
import ShowBatches from './components/batch/ShowBatches'
import Batch from './components/batch/Batch'

const routes=createBrowserRouter([
  {
    path:"",
    element:<Layout/>,
    children:[
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
