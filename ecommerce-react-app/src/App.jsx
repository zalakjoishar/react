import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

const routes=createBrowserRouter([
  {
    path:"",
    element:<Layout/>,
    children:[
      {
      index:true,
      element:<Home/>
      },
      {
      index:"about",
      element:<About/>
      },
      {
      index:"contact",
      element:<Contact/>
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
