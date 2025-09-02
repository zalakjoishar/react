import { Children, useState } from 'react'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Layout from './components/Layout'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import AllProducts from './components/products/AllProducts'
import ProductDetail from './components/products/ProductDetail'
import AddProduct from './components/products/AddProduct'

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
      path:"products",
      element:<AllProducts/>
      },
      {
      path:"products/:id",
      element:<ProductDetail/>
      },
      {
      path:"add-product",
      element:<AddProduct/>
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
