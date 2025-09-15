import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

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
      if (segment === 'batch') label = 'Batches'
      if (segment === 'classRoom') label = 'Classroom'
      if (segment === 'coordinator') label = 'Coordinator'
      if (segment === 'trainer') label = 'Trainer'
      if (segment === 'event') label = 'Event'
      if (segment === 'slot') label = 'Slot'

      breadcrumb.push({
        label,
        path: currentPath,
        isLast: index === pathSegments.length - 1
      })
    })

    return breadcrumb
  }

  const breadcrumb = generateBreadcrumb()

  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom shadow-sm" style={{backgroundColor: '#f8fafc'}}>
      <div className="container-fluid">
        {/* Breadcrumb */}
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
              Admin
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0">
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <span className="me-2">⚙️</span>
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <span className="me-2">📊</span>
                  Reports
                </a>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <span className="me-2">👥</span>
                  Users
                </a>
              </li>
              <li><hr className="dropdown-divider"/></li>
              <li>
                <a className="dropdown-item d-flex align-items-center text-danger" href="#">
                  <span className="me-2">🚪</span>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar