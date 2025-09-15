import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: "/student", label: "Students", icon: "👥" },
    { path: "/add-student", label: "Add Student", icon: "➕" },
    { path: "/batch", label: "Batches", icon: "📚" },
    { path: "/add-batch", label: "Add Batch", icon: "➕" },
    { path: "/add-classRoom", label: "Add Classroom", icon: "🏫" },
    { path: "/add-event", label: "Add Event", icon: "📅" },
    { path: "/add-coordinator", label: "Add Coordinator", icon: "👨‍💼" },
    { path: "/add-trainer", label: "Add Trainer", icon: "👨‍🏫" },
    { path: "/add-slot", label: "Add Slot", icon: "⏰" }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
               style={{width: '40px', height: '40px', fontSize: '18px'}}>
            🎓
          </div>
    <div>
            <div className="fw-bold text-primary mb-0">Class Portal</div>
            <small className="text-muted">Education Management</small>
          </div>
        </Link>
        
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <Link 
                  className={`nav-link d-flex align-items-center px-3 py-2 rounded-pill mx-1 ${
                    location.pathname === item.path ? 'active bg-primary text-white' : 'text-dark'
                  }`}
                  to={item.path}
                  style={{
                    transition: 'all 0.2s ease',
                    fontWeight: location.pathname === item.path ? '600' : '500'
                  }}
                >
                  <span className="me-2">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="d-flex align-items-center">
            <div className="input-group me-3" style={{maxWidth: '300px'}}>
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input 
                className="form-control border-start-0" 
                type="search" 
                placeholder="Search students, batches..." 
                aria-label="Search"
                style={{boxShadow: 'none'}}
              />
            </div>
            
            <div className="dropdown">
              <button className="btn btn-outline-primary rounded-pill px-3" type="button" 
                      data-bs-toggle="dropdown" aria-expanded="false">
                <span className="me-2">👤</span>
                Admin
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                <li><a className="dropdown-item" href="#"><span className="me-2">⚙️</span>Settings</a></li>
                <li><a className="dropdown-item" href="#"><span className="me-2">📊</span>Reports</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item text-danger" href="#"><span className="me-2">🚪</span>Logout</a></li>
            </ul>
            </div>
          </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar