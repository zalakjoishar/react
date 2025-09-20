import React, { useState, useEffect, useCallback } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Layout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

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

  // Redirect to login if not authenticated
  useEffect(() => {
    console.log("Layout: Authentication state check - loading:", loading, "isAuthenticated:", isAuthenticated);
    if (!loading && !isAuthenticated) {
      console.log("Layout: Redirecting to login");
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="loading-spinner" style={{width: '40px', height: '40px'}}></div>
          <p className="text-muted mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render layout if not authenticated
  if (!isAuthenticated) {
    return null;
  }

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