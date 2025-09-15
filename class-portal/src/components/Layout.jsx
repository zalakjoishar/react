import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar/>
      <main className="container-fluid py-4">
        <div className="fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout