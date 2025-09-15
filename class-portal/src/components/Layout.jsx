import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <Sidebar onToggle={setIsSidebarCollapsed}/>
      <div 
        className="main-content-wrapper"
        style={{
          marginLeft: isMobile ? '0' : (isSidebarCollapsed ? '80px' : '280px'),
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh'
        }}
      >
        <Navbar />
        <main className="main-content" style={{ padding: '2rem' }}>
          <div className="fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout