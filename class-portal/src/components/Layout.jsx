import React, { useState, useEffect, useCallback } from 'react'
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

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <Sidebar onToggle={setIsSidebarCollapsed} isCollapsed={isSidebarCollapsed}/>
      <div 
        className="main-content-wrapper"
        style={{
          marginLeft: isMobile ? '0' : (isSidebarCollapsed ? '80px' : '280px'),
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh'
        }}
      >
        <Navbar 
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />
        <main className="main-content" style={{ 
          padding: isSidebarCollapsed && !isMobile ? '2rem 2rem 2rem 5rem' : '2rem'
        }}>
          <div className="fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout