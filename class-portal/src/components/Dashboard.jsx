import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalBatches: 0,
    activeStudents: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard data
    const fetchStats = async () => {
      try {
        const [studentsRes, batchesRes] = await Promise.all([
          fetch('http://localhost:8080/student'),
          fetch('http://localhost:8080/batch')
        ])
        
        const studentsData = await studentsRes.json()
        const batchesData = await batchesRes.json()
        
        setStats({
          totalStudents: studentsData["_embedded"]?.students?.length || 0,
          totalBatches: batchesData["_embedded"]?.batches?.length || 0,
          activeStudents: studentsData["_embedded"]?.students?.length || 0,
          recentActivity: []
        })
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const quickActions = [
    {
      title: "Add Student",
      description: "Register a new student",
      icon: "👥",
      link: "/add-student",
      color: "primary"
    },
    {
      title: "Add Batch",
      description: "Create a new batch",
      icon: "📚",
      link: "/add-batch",
      color: "success"
    },
    {
      title: "Add Classroom",
      description: "Set up a new classroom",
      icon: "🏫",
      link: "/add-classRoom",
      color: "info"
    },
    {
      title: "Add Event",
      description: "Schedule an event",
      icon: "📅",
      link: "/add-event",
      color: "warning"
    },
    {
      title: "Add Trainer",
      description: "Register a trainer",
      icon: "👨‍🏫",
      link: "/add-trainer",
      color: "secondary"
    },
    {
      title: "Add Coordinator",
      description: "Add a coordinator",
      icon: "👨‍💼",
      link: "/add-coordinator",
      color: "dark"
    }
  ]

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: "👥",
      color: "primary",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Active Batches",
      value: stats.totalBatches,
      icon: "📚",
      color: "success",
      change: "+5%",
      changeType: "positive"
    },
    {
      title: "Active Students",
      value: stats.activeStudents,
      icon: "✅",
      color: "info",
      change: "+8%",
      changeType: "positive"
    },
    {
      title: "Classrooms",
      value: "12",
      icon: "🏫",
      color: "warning",
      change: "+2",
      changeType: "positive"
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

  return (
    <div className="container-fluid">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-gradient-primary text-white border-0" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="mb-2">Welcome to Class Portal! 🎓</h2>
                  <p className="mb-0 opacity-75">Manage your educational institution efficiently with our comprehensive management system.</p>
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
                    <small className={`text-${stat.changeType === 'positive' ? 'success' : 'danger'}`}>
                      {stat.change} from last month
                    </small>
                  </div>
                  <div className={`bg-${stat.color} bg-opacity-10 rounded-circle p-3`}>
                    <span style={{fontSize: '1.5rem'}}>{stat.icon}</span>
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
                  <div className="col-lg-4 col-md-6 mb-3" key={index}>
                    <Link to={action.link} className="text-decoration-none">
                      <div className="card h-100 border-0 shadow-sm hover-lift">
                        <div className="card-body text-center">
                          <div className={`bg-${action.color} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3`} 
                               style={{width: '60px', height: '60px'}}>
                            <span style={{fontSize: '1.5rem'}}>{action.icon}</span>
                          </div>
                          <h6 className="card-title text-dark">{action.title}</h6>
                          <p className="card-text text-muted small">{action.description}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">📈 Recent Activity</h5>
            </div>
            <div className="card-body">
              <div className="text-center py-4">
                <div className="text-muted mb-3" style={{fontSize: '3rem'}}>📊</div>
                <h6 className="text-muted">No recent activity</h6>
                <p className="text-muted small">Activity will appear here as you use the system</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">🔗 Quick Links</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <Link to="/student" className="list-group-item list-group-item-action border-0">
                  <div className="d-flex align-items-center">
                    <span className="me-3">👥</span>
                    <div>
                      <div className="fw-semibold">View All Students</div>
                      <small className="text-muted">Browse student records</small>
                    </div>
                  </div>
                </Link>
                <Link to="/batch" className="list-group-item list-group-item-action border-0">
                  <div className="d-flex align-items-center">
                    <span className="me-3">📚</span>
                    <div>
                      <div className="fw-semibold">View All Batches</div>
                      <small className="text-muted">Manage batch information</small>
                    </div>
                  </div>
                </Link>
                <Link to="/add-slot" className="list-group-item list-group-item-action border-0">
                  <div className="d-flex align-items-center">
                    <span className="me-3">⏰</span>
                    <div>
                      <div className="fw-semibold">Add Time Slot</div>
                      <small className="text-muted">Schedule time slots</small>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
