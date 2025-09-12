import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Student from './components/student/Student'
import AllStudent from './components/student/AllStudent'
import AddStudent from './components/student/AddStudent'

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
