import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Navbar({ isSidebarCollapsed, onToggleSidebar, isMobile }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Generate breadcrumb from current path
  const generateBreadcrumb = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '')
    
    if (pathSegments.length === 0) {
      return [{ label: 'Dashboard', path: '/' }]
    }

    const breadcrumb = []
    let currentPath = ''

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Convert path segment to readable label
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      // Special cases for better readability
      if (segment === 'student') label = 'Students'
      if (segment === 'batch') label = 'Dance Classes'
      if (segment === 'classRoom') label = 'Studio'
      if (segment === 'coordinator') label = 'Coordinator'
      if (segment === 'trainer') label = 'Instructor'
      if (segment === 'event') label = 'Performance'
      if (segment === 'slot') label = 'Time Slot'

      breadcrumb.push({
        label,
        path: currentPath,
        isLast: index === pathSegments.length - 1
      })
    })

    return breadcrumb
  }

  const breadcrumb = generateBreadcrumb()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom shadow-sm" style={{backgroundColor: '#f8fafc'}}>
      <div className="container-fluid">
        {/* Sidebar Toggle Button */}
        <button 
          className={`btn btn-outline-secondary ${isSidebarCollapsed ? 'me-1' : 'me-3'}`}
          onClick={onToggleSidebar}
          style={{
            minWidth: '40px', 
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'normal',
            borderRadius: '8px',
            borderColor: '#8B5CF6',
            backgroundColor: 'white',
            color: '#8B5CF6',
            position: isSidebarCollapsed ? 'fixed' : 'relative',
            left: isSidebarCollapsed ? '90px' : 'auto',
            top: isSidebarCollapsed ? '1rem' : 'auto',
            zIndex: isSidebarCollapsed ? 1001 : 'auto',
            boxShadow: isSidebarCollapsed ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
          }}
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? '☰' : '☰'}
        </button>

        {/* Dantra Logo (when sidebar is collapsed) */}
        {isSidebarCollapsed && (
          <div className="d-flex align-items-center me-3">
          </div>
        )}
        {/* Breadcrumb */}
        {location.pathname !== '/' && (
          <div className="navbar-nav me-auto">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                {breadcrumb.map((item, index) => (
                  <li key={index} className="breadcrumb-item">
                    {item.isLast ? (
                      <span style={{color: '#475569'}}>{item.label}</span>
                    ) : (
                      <button 
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={() => navigate(item.path)}
                        style={{ 
                          color: '#64748b',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}

        {/* Admin Dropdown */}
        <div className="navbar-nav">
          <div className="nav-item dropdown">
            <button 
              className="btn btn-outline-primary dropdown-toggle d-flex align-items-center" 
              type="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
              style={{
                borderRadius: '8px',
                padding: '0.75rem 1.25rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                backgroundColor: 'white',
                borderColor: '#e2e8f0',
                color: '#475569',
                borderWidth: '1px'
              }}
            >
              <span className="me-2">👤</span>
              {user?.name || 'Admin'}
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0">
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <span className="me-2">⚙️</span>
                  Settings
                </a>
              </li>
              <li>
                <button 
                  className="dropdown-item d-flex align-items-center" 
                  onClick={() => navigate('/reports')}
                  style={{border: 'none', background: 'none', width: '100%', textAlign: 'left'}}
                >
                  <span className="me-2">📊</span>
                  Reports
                </button>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <span className="me-2">👥</span>
                  Users
                </a>
              </li>
              <li><hr className="dropdown-divider"/></li>
              <li>
                <button 
                  className="dropdown-item d-flex align-items-center text-danger" 
                  onClick={handleLogout}
                  style={{border: 'none', background: 'none', width: '100%', textAlign: 'left'}}
                >
                  <span className="me-2">🚪</span>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar