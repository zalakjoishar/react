import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGetPublic, apiGet } from '../utils/api'
import { useAuth } from '../contexts/AuthContext'
import PermissionWrapper from './guards/PermissionWrapper'
import { PERMISSIONS } from '../utils/rbac'

function Dashboard() {
  const { user, isAuthenticated } = useAuth()
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalBatches: 0,
    totalTrainers: 0,
    totalClassrooms: 0,
    totalEvents: 0,
    recentActivity: []
  })
  const [upcomingPerformances, setUpcomingPerformances] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only fetch data if user is authenticated
    if (!isAuthenticated) {
      setLoading(false)
      return
    }

    // Fetch dashboard data
    const fetchStats = async () => {
      try {
        // Use the dashboard stats endpoint (public)
        const dashboardStats = await apiGetPublic('/api/dashboard/stats')
        
        console.log('Dashboard stats received:', dashboardStats)
        
        // Update stats with the new data
        setStats({
          totalStudents: dashboardStats.totalStudents || 0,
          totalBatches: dashboardStats.totalBatches || 0,
          totalTrainers: dashboardStats.totalTrainers || 0,
          totalClassrooms: dashboardStats.totalClassRooms || 0,
          totalEvents: dashboardStats.totalEvents || 0,
          recentActivity: []
        })
        
        // Fetch events for upcoming performances
        try {
          const eventsData = await apiGet('/event')
          const globalEvents = eventsData["_embedded"]?.events || []
          
          // Debug logging
          console.log('Global events:', globalEvents)
          console.log('Total events count:', globalEvents.length)
          
          // Filter upcoming performances (events with future dates)
          const now = new Date()
          const upcoming = globalEvents.filter(event => {
            console.log('Event:', event, 'Date field:', event.date)
            if (!event.date) return false
            const eventDate = new Date(event.date)
            return eventDate > now
          }).sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5) // Get next 5 upcoming
          
          console.log('Upcoming performances:', upcoming)
          
          setUpcomingPerformances(upcoming)
        } catch (eventsError) {
          console.error('Error fetching events for upcoming performances:', eventsError)
          setUpcomingPerformances([])
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }

      fetchStats()
    }, [isAuthenticated])

  const quickActions = [
    {
      title: "Add Student",
      description: "Register a new student",
      icon: "💃",
      link: "/add-student",
      color: "primary",
      permissions: [PERMISSIONS.STUDENT_CREATE]
    },
    {
      title: "Add Dance Class",
      description: "Create a new dance class",
      icon: "🎭",
      link: "/add-batch",
      color: "success",
      permissions: [PERMISSIONS.BATCH_CREATE]
    },
    {
      title: "Add Studio",
      description: "Set up a new studio",
      icon: "🏛️",
      link: "/add-classRoom",
      color: "info",
      permissions: [PERMISSIONS.CLASSROOM_CREATE]
    },
    {
      title: "Add Performance",
      description: "Schedule a performance",
      icon: "🎪",
      link: "/add-event",
      color: "warning",
      permissions: [PERMISSIONS.EVENT_CREATE]
    },
    {
      title: "Add Instructor",
      description: "Register an instructor",
      icon: "👨‍🏫",
      link: "/add-trainer",
      color: "secondary",
      permissions: [PERMISSIONS.TRAINER_CREATE]
    },
    {
      title: "Add Coordinator",
      description: "Add a coordinator",
      icon: "👨‍💼",
      link: "/add-coordinator",
      color: "dark",
      permissions: [PERMISSIONS.COORDINATOR_CREATE]
    }
  ]

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: "💃",
      color: "primary"
    },
    {
      title: "Total Classes",
      value: stats.totalBatches,
      icon: "🎭",
      color: "success"
    },
    {
      title: "Total Instructors",
      value: stats.totalTrainers,
      icon: "👨‍🏫",
      color: "info"
    },
    {
      title: "Total Studios",
      value: stats.totalClassrooms,
      icon: "🏛️",
      color: "warning"
    }
  ]

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="loading-spinner" style={{width: '40px', height: '40px'}}></div>
        <p className="text-muted mt-3">Loading dashboard...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center py-5">
        <div className="text-danger mb-3" style={{fontSize: '3rem'}}>🔒</div>
        <h5 className="text-danger">Authentication Required</h5>
        <p className="text-muted">Please log in to access the dashboard.</p>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-gradient-primary text-white border-0" style={{background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)'}}>
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="mb-2">Welcome to Dantra!</h2>
                  {user && (
                    <p className="mb-0 opacity-90">
                      Logged in as: <strong>{user.name}</strong> 
                      {user.roles && user.roles.length > 0 && (
                        <span className="ms-2 badge bg-light text-dark">
                          {user.roles[0].replace('ROLE_', '')}
                        </span>
                      )}
                    </p>
                  )}
                </div>
                <div className="col-md-4 text-end">
                  <div className="display-1 opacity-25">📊</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        {statCards.map((stat, index) => (
          <div className="col-lg-3 col-md-6 mb-3" key={index}>
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="card-title text-muted mb-1">{stat.title}</h6>
                    <h3 className="mb-0 fw-bold">{stat.value}</h3>
                  </div>
                  <div className={`bg-${stat.color} bg-opacity-10 rounded-circle p-3`}>
                    {stat.icon.startsWith('/') ? (
                      <img src={stat.icon} alt={stat.title} style={{width: '24px', height: '24px', objectFit: 'contain'}} />
                    ) : (
                      <span style={{fontSize: '1.5rem'}}>{stat.icon}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">⚡ Quick Actions</h5>
              <small className="text-muted">Common tasks and shortcuts</small>
            </div>
            <div className="card-body">
              <div className="row">
                {quickActions.map((action, index) => (
                  <PermissionWrapper key={index} permissions={action.permissions}>
                    <div className="col-lg-4 col-md-6 mb-3">
                    <Link to={action.link} className="text-decoration-none">
                      <div className="card h-100 border-0 shadow-sm hover-lift">
                        <div className="card-body text-center">
                          <div className={`bg-${action.color} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} 
                               style={{width: '60px', height: '60px'}}>
                            {action.icon.startsWith('/') ? (
                              <img src={action.icon} alt={action.title} style={{width: '32px', height: '32px', objectFit: 'contain'}} />
                            ) : (
                              <span style={{fontSize: '1.5rem'}}>{action.icon}</span>
                            )}
                          </div>
                          <h6 className="card-title text-dark">{action.title}</h6>
                          <p className="card-text text-muted small">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  </PermissionWrapper>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Performances */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">🎪 Upcoming Performances</h5>
              <small className="text-muted">Next scheduled performances and events</small>
            </div>
            <div className="card-body">
              {upcomingPerformances.length > 0 ? (
                <div className="row">
                  {upcomingPerformances.map((performance, index) => {
                    const eventDate = new Date(performance.date)
                    const daysUntil = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24))
                    
                    // Debug logging for batch information
                    console.log('Performance batch info:', {
                      name: performance.name,
                      type: performance.type,
                      batchName: performance.batchName,
                      batchId: performance.batchId,
                      hasBatchAssociation: performance.hasBatchAssociation
                    })
                    
                    return (
                      <div className="col-lg-6 col-md-12 mb-3" key={index}>
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div className="flex-grow-1">
                                <h6 className="card-title text-dark mb-1">{performance.name || 'Performance'}</h6>
                                {(performance.type === 'batch' || performance.hasBatchAssociation) && performance.batchName && (
                                  <div className="d-flex align-items-center mb-2">
                                    <span className="badge bg-primary bg-opacity-10 text-primary me-2" style={{fontSize: '0.75rem'}}>
                                      <span className="me-1">🎭</span>
                                      {performance.batchName}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <span className={`badge ${daysUntil <= 7 ? 'bg-danger' : daysUntil <= 30 ? 'bg-warning' : 'bg-success'}`}>
                                {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                              </span>
                            </div>
                            <div className="row text-muted small">
                              <div className="col-6">
                                <div className="d-flex align-items-center mb-1">
                                  <span className="me-2">📅</span>
                                  <span>{eventDate.toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="d-flex align-items-center mb-1">
                                  <span className="me-2">🕐</span>
                                  <span>{eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                              </div>
                            </div>
                            {performance.description && (
                              <p className="card-text text-muted small mt-2 mb-0">
                                {performance.description.length > 100 
                                  ? `${performance.description.substring(0, 100)}...` 
                                  : performance.description}
                              </p>
                            )}
                            {performance.location && (
                              <div className="d-flex align-items-center mt-2">
                                <span className="me-2">📍</span>
                                <small className="text-muted">{performance.location}</small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-muted mb-3">
                    <span style={{fontSize: '3rem'}}>🎭</span>
                  </div>
                  <h6 className="text-muted">No upcoming performances</h6>
                  <p className="text-muted small mb-3">Schedule your next performance to see it here</p>
                  <Link to="/add-event" className="btn btn-outline-primary btn-sm">
                    <span className="me-2">➕</span>
                    Add Performance
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
