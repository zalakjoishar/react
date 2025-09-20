import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { apiGet } from '../utils/api'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

function Reports() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalBatches: 0,
    totalTrainers: 0,
    totalClassrooms: 0,
    totalEvents: 0,
    batchesPerTrainer: [],
    classroomOccupancy: [],
    eventsPerBatch: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard data
    const fetchStats = async () => {
      try {
        const [studentsData, batchesData, trainersData, classroomsData, eventsData] = await Promise.all([
          apiGet('/student'),
          apiGet('/batch'),
          apiGet('/trainer'),
          apiGet('/classRoom'),
          apiGet('/event')
        ])
        
        // Process data for charts
        const batches = batchesData["_embedded"]?.batches || []
        const trainers = trainersData["_embedded"]?.trainers || []
        const classrooms = classroomsData["_embedded"]?.classRooms || []
        const events = eventsData["_embedded"]?.events || []
        
        // Calculate batches per trainer
        const batchesPerTrainer = trainers.map(trainer => ({
          name: trainer.name,
          batchCount: batches.filter(batch => batch.trainer?.name === trainer.name).length
        }))
        
        // Calculate classroom occupancy
        const classroomOccupancy = classrooms.map(classroom => ({
          name: classroom.name,
          occupied: batches.filter(batch => batch.classRoom?.name === classroom.name).length > 0,
          batchCount: batches.filter(batch => batch.classRoom?.name === classroom.name).length
        }))
        
        // Calculate events per batch
        const eventsPerBatch = batches.map(batch => ({
          name: batch.name,
          eventCount: events.filter(event => event.batch?.name === batch.name).length
        }))
        
        setStats({
          totalStudents: studentsData["_embedded"]?.students?.length || 0,
          totalBatches: batches.length,
          totalTrainers: trainers.length,
          totalClassrooms: classrooms.length,
          totalEvents: events.length,
          batchesPerTrainer,
          classroomOccupancy,
          eventsPerBatch,
        })
        setLoading(false)
      } catch (error) {
        console.error('Error fetching reports data:', error)
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Chart configurations
  const batchesPerTrainerChart = {
    labels: stats.batchesPerTrainer.map(item => item.name),
    datasets: [
      {
        label: 'Batches Assigned',
        data: stats.batchesPerTrainer.map(item => item.batchCount),
        backgroundColor: [
          '#8B5CF6',
          '#A855F7',
          '#C084FC',
          '#DDD6FE',
          '#F3E8FF'
        ],
        borderColor: [
          '#7C3AED',
          '#9333EA',
          '#A855F7',
          '#C084FC',
          '#DDD6FE'
        ],
        borderWidth: 2,
      },
    ],
  }

  const classroomOccupancyChart = {
    labels: ['Occupied Studios', 'Available Studios'],
    datasets: [
      {
        data: [
          stats.classroomOccupancy.filter(c => c.occupied).length,
          stats.classroomOccupancy.filter(c => !c.occupied).length
        ],
        backgroundColor: [
          '#10B981',
          '#E5E7EB'
        ],
        borderColor: [
          '#059669',
          '#D1D5DB'
        ],
        borderWidth: 2,
      },
    ],
  }

  const eventsPerBatchChart = {
    labels: stats.eventsPerBatch.map(item => item.name),
    datasets: [
      {
        label: 'Events Scheduled',
        data: stats.eventsPerBatch.map(item => item.eventCount),
        backgroundColor: '#8B5CF6',
        borderColor: '#7C3AED',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="loading-spinner" style={{width: '40px', height: '40px'}}></div>
        <p className="text-muted mt-3">Loading reports...</p>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-gradient-primary text-white border-0" style={{background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)'}}>
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="mb-2">📊 Reports & Analytics <img src="/dantra logo.png" alt="Dantra Logo" style={{width: '32px', height: '32px', objectFit: 'contain', verticalAlign: 'middle', marginLeft: '0.5rem'}} /></h2>
                  <p className="mb-0 opacity-75">Comprehensive insights into your dance academy's performance and statistics.</p>
                </div>
                <div className="col-md-4 text-end">
                  <div className="display-1 opacity-25">📈</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title text-muted mb-1">Total Students</h6>
                  <h3 className="mb-0 fw-bold">{stats.totalStudents}</h3>
                </div>
                <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                  💃
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title text-muted mb-1">Total Classes</h6>
                  <h3 className="mb-0 fw-bold">{stats.totalBatches}</h3>
                </div>
                <div className="bg-success bg-opacity-10 rounded-circle p-3">
                  <span style={{fontSize: '1.5rem'}}>🎭</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title text-muted mb-1">Total Instructors</h6>
                  <h3 className="mb-0 fw-bold">{stats.totalTrainers}</h3>
                </div>
                <div className="bg-info bg-opacity-10 rounded-circle p-3">
                  <span style={{fontSize: '1.5rem'}}>👨‍🏫</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title text-muted mb-1">Total Studios</h6>
                  <h3 className="mb-0 fw-bold">{stats.totalClassrooms}</h3>
                </div>
                <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                  <span style={{fontSize: '1.5rem'}}>🏛️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row mb-4">
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">📊 Batches per Instructor</h5>
              <small className="text-muted">Number of dance classes assigned to each instructor</small>
            </div>
            <div className="card-body">
              <div style={{height: '300px'}}>
                <Bar data={batchesPerTrainerChart} options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: false
                    }
                  }
                }} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">🏛️ Studio Occupancy</h5>
              <small className="text-muted">Current studio utilization status</small>
            </div>
            <div className="card-body">
              <div style={{height: '300px'}}>
                <Doughnut data={classroomOccupancyChart} options={{
                  ...doughnutOptions,
                  plugins: {
                    ...doughnutOptions.plugins,
                    title: {
                      display: false
                    }
                  }
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Events per Batch Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">🎪 Events per Dance Class</h5>
              <small className="text-muted">Number of performances/events scheduled for each dance class</small>
            </div>
            <div className="card-body">
              <div style={{height: '400px'}}>
                <Bar data={eventsPerBatchChart} options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      display: false
                    }
                  }
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports



