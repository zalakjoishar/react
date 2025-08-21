import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const routes=createBrowserRouter([])

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
