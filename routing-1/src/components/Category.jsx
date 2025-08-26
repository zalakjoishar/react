import React from 'react'
import { Outlet } from 'react-router-dom'

function Category() {
  return (
    <div>
        <p className=''>
            <Outlet/>
        </p>
        <h1>Category</h1>
    </div>
  )
}

export default Category