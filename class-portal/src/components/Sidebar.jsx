import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar({ onToggle }) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNavItems, setFilteredNavItems] = useState([]);
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: "🏠", keywords: ["dashboard", "home", "main"] },
    { path: "/student", label: "Students", icon: "👥", keywords: ["students", "student", "list", "view"] },
    { path: "/add-student", label: "Add Student", icon: "➕", keywords: ["add", "student", "new", "create"] },
    { path: "/batch", label: "Batches", icon: "📚", keywords: ["batches", "batch", "list", "view"] },
    { path: "/add-batch", label: "Add Batch", icon: "➕", keywords: ["add", "batch", "new", "create"] },
    { path: "/add-classRoom", label: "Add Classroom", icon: "🏫", keywords: ["add", "classroom", "room", "new", "create"] },
    { path: "/add-event", label: "Add Event", icon: "📅", keywords: ["add", "event", "new", "create", "schedule"] },
    { path: "/add-coordinator", label: "Add Coordinator", icon: "👨‍💼", keywords: ["add", "coordinator", "new", "create", "staff"] },
    { path: "/add-trainer", label: "Add Trainer", icon: "👨‍🏫", keywords: ["add", "trainer", "teacher", "new", "create", "staff"] },
    { path: "/add-slot", label: "Add Slot", icon: "⏰", keywords: ["add", "slot", "time", "schedule", "new", "create"] }
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Initialize filtered items
  useEffect(() => {
    setFilteredNavItems(navItems);
  }, []);

  // Search functionality
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    
    if (searchValue === '') {
      setFilteredNavItems(navItems);
    } else {
      const filtered = navItems.filter(item => {
        const labelMatch = item.label.toLowerCase().includes(searchValue);
        const keywordMatch = item.keywords.some(keyword => keyword.includes(searchValue));
        return labelMatch || keywordMatch;
      });
      setFilteredNavItems(filtered);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredNavItems(navItems);
  };

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button 
          className="btn btn-primary position-fixed d-lg-none"
          onClick={toggleSidebar}
          style={{
            top: '1rem',
            left: '1rem',
            zIndex: 1001,
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}
          title={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
        >
          {isCollapsed ? '☰' : '✕'}
        </button>
      )}


      {/* Sidebar */}
      <div className={`sidebar shadow-sm border-end ${isCollapsed ? 'collapsed' : ''} ${isMobile ? (isCollapsed ? '' : 'show') : ''}`}
           style={{
             position: 'fixed',
             top: 0,
             left: 0,
             height: '100vh',
             width: isCollapsed ? '80px' : '280px',
             zIndex: 1000,
             transition: 'width 0.3s ease, transform 0.3s ease',
             overflow: 'hidden',
             backgroundColor: '#f8fafc'
           }}>
        
        {/* Header */}
        <div className="sidebar-header p-3 border-bottom">
          <div className="d-flex align-items-center justify-content-center">
            {isCollapsed ? (
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                   style={{width: '40px', height: '40px', fontSize: '18px'}}>
                🎓
              </div>
            ) : (
              <>
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                     style={{width: '40px', height: '40px', fontSize: '18px', minWidth: '40px'}}>
                  🎓
                </div>
                <div className="flex-grow-1">
                  <div className="fw-bold mb-0" style={{color: '#475569'}}>Class Portal</div>
                  <small style={{color: '#64748b'}}>Education Management</small>
                </div>
              </>
            )}
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={toggleSidebar}
              style={{
                minWidth: '32px', 
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'normal',
                marginLeft: isCollapsed ? '0' : 'auto'
              }}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? '☰' : '☰'}
            </button>
          </div>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-3 border-bottom">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input 
                className="form-control border-start-0" 
                type="text" 
                placeholder="Search pages..." 
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
                style={{boxShadow: 'none'}}
              />
              {searchTerm && (
                <button 
                  className="btn btn-outline-secondary border-start-0" 
                  type="button"
                  onClick={clearSearch}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="mt-2">
                <small className="text-muted">
                  Found {filteredNavItems.length} page{filteredNavItems.length !== 1 ? 's' : ''}
                </small>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="sidebar-nav flex-grow-1" style={{overflowY: 'auto', padding: '1rem 0'}}>
          <ul className="nav flex-column px-3">
            {filteredNavItems.length > 0 ? (
              filteredNavItems.map((item, index) => (
                <li className="nav-item mb-2" key={index}>
                  <Link 
                    className={`nav-link d-flex align-items-center px-3 py-2 rounded ${
                      location.pathname === item.path ? 'active' : ''
                    }`}
                    to={item.path}
                    style={{
                      transition: 'all 0.2s ease',
                      fontWeight: location.pathname === item.path ? '600' : '500',
                      textDecoration: 'none',
                      backgroundColor: location.pathname === item.path ? '#3b82f6' : 'transparent',
                      color: location.pathname === item.path ? 'white' : '#475569'
                    }}
                    title={isCollapsed ? item.label : ''}
                    onClick={() => {
                      if (isMobile) setIsCollapsed(true);
                      setSearchTerm(''); // Clear search when navigating
                      setFilteredNavItems(navItems);
                    }}
                  >
                    <span className="me-3" style={{minWidth: '20px', textAlign: 'center'}}>
                      {item.icon}
                    </span>
                    {!isCollapsed && item.label}
                  </Link>
                </li>
              ))
            ) : searchTerm ? (
              <li className="nav-item mb-2">
                <div className="px-3 py-2 text-muted text-center">
                  <small>No pages found</small>
                </div>
              </li>
            ) : null}
          </ul>
        </div>

      </div>

      {/* Overlay for mobile */}
      {isMobile && !isCollapsed && (
        <div 
          className="sidebar-overlay" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}
    </>
  )
}

export default Sidebar
