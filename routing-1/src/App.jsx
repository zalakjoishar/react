import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import Contact from './components/Contact'
import Profile from './components/Profile'
import CategoryDetails from './components/CategoryDetails'
import Category from './components/Category'
import AddCategory from './components/AddCategory'

function App() {
  const [count, setCount] = useState(0)
  const routes=createBrowserRouter([
    {
      path:"",
      element:<Home/>
    },
    {
      path:"contact",
      element:<Contact/>
    },
    {
      path:"profile",
      element:<Profile/>
    },
    {
      path:"category",
      element:<Category/>,
      children:[
        {
          path:":id",
          element:<CategoryDetails/>
        },
        {
          path:"api/add-category",
          element:<AddCategory/>
        }
      ]
    },
    {
      path:"*",
      element:<h1>Not found</h1>
    }
  ])

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
