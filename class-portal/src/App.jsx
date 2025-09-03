import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'

const routes=createBrowserRouter([
  {
    path:"",
    element:<Layout/>
  }
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    </>
  )
}

export default App
