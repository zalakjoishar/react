import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

function BatchDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [batch, setBatch] = useState(null)
  const [students, setStudents] = useState([])
  const [events, setEvents] = useState([])
  const [slots, setSlots] = useState([])
  const [trainer, setTrainer] = useState(null)
  const [coordinator, setCoordinator] = useState(null)
  const [classroom, setClassroom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEditForm, setShowEditForm] = useState(false)
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      certification: '',
      genre: ''
    }
  })

  useEffect(() => {
    fetchBatchDetails()
  }, [id])

  const fetchBatchDetails = async () => {
    setLoading(true)
    try {
      // Fetch batch details
      const batchRes = await fetch(`http://localhost:8080/batch/${id}`)
      const batchData = await batchRes.json()
      setBatch(batchData)
      
      // Debug logging to understand data structure
      console.log('Batch data:', batchData)
      console.log('Trainer object:', batchData.trainer)
      console.log('Coordinator object:', batchData.coordinator)
      console.log('Classroom object:', batchData.classRoom)
      
      // Reset form with batch data
      reset({
        name: batchData.name || '',
        certification: batchData.certification || '',
        genre: batchData.genre || ''
      })

      // Fetch related data in parallel
      const [studentsRes, eventsRes, slotsRes, trainerRes, coordinatorRes, classroomRes] = await Promise.all([
        fetch(`http://localhost:8080/batch/${id}/student`).catch(() => ({ json: () => ({ "_embedded": { "students": [] } }) })),
        fetch(`http://localhost:8080/batch/${id}/event`).catch(() => ({ json: () => ({ "_embedded": { "events": [] } }) })),
        fetch(`http://localhost:8080/batch/${id}/slot`).catch(() => ({ json: () => ({ "_embedded": { "slots": [] } }) })),
        fetch(`http://localhost:8080/batch/${id}/trainer`).catch(() => ({ json: () => null })),
        fetch(`http://localhost:8080/batch/${id}/coordinator`).catch(() => ({ json: () => null })),
        fetch(`http://localhost:8080/batch/${id}/classRoom`).catch(() => ({ json: () => null }))
      ])

      const studentsData = await studentsRes.json()
      const eventsData = await eventsRes.json()
      const slotsData = await slotsRes.json()
      const trainerData = await trainerRes.json()
      const coordinatorData = await coordinatorRes.json()
      const classroomData = await classroomRes.json()

      setStudents(studentsData["_embedded"]?.students || [])
      setEvents(eventsData["_embedded"]?.events || [])
      setSlots(slotsData["_embedded"]?.slots || [])
      setTrainer(trainerData)
      setCoordinator(coordinatorData)
      setClassroom(classroomData)
      
      // Debug logging for fetched data
      console.log('Fetched trainer:', trainerData)
      console.log('Fetched coordinator:', coordinatorData)
      console.log('Fetched classroom:', classroomData)
      
    } catch (error) {
      console.error('Error fetching batch details:', error)
      toast.error('Failed to load batch details')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8080/batch/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...batch,
          name: data.name,
          certification: data.certification,
          genre: data.genre
        })
      })

      if (response.ok) {
        toast.success('Batch updated successfully!')
        setShowEditForm(false)
        fetchBatchDetails() // Refresh data
      } else {
        toast.error('Failed to update batch')
      }
    } catch (error) {
      console.error('Error updating batch:', error)
      toast.error('Failed to update batch')
    }
  }

  const deleteBatch = async () => {
    if (window.confirm('Are you sure you want to delete this batch? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:8080/batch/${id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          toast.success('Batch deleted successfully!')
          // Refresh the page to show updated data
          window.location.reload()
        } else {
          toast.error('Failed to delete batch')
        }
      } catch (error) {
        console.error('Error deleting batch:', error)
        toast.error('Failed to delete batch')
      }
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="loading-spinner" style={{width: '40px', height: '40px'}}></div>
        <p className="text-muted mt-3">Loading batch details...</p>
      </div>
    )
  }

  if (!batch) {
    return (
      <div className="text-center py-5">
        <div className="text-muted mb-3" style={{fontSize: '3rem'}}>📚</div>
        <h5 className="text-muted">Batch not found</h5>
        <p className="text-muted">The batch you're looking for doesn't exist</p>
        <button className="btn btn-primary" onClick={() => navigate('/batch')}>
          <span className="me-2">←</span> Back to Batches
        </button>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">{batch.name}</h2>
              <p className="text-muted mb-0">Batch ID: #{batch.id}</p>
            </div>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-secondary"
                onClick={() => navigate('/batch')}
              >
                <span className="me-2">←</span> Back
              </button>
              <button 
                className="btn btn-outline-primary"
                onClick={() => setShowEditForm(!showEditForm)}
              >
                Edit Batch
              </button>
              <button 
                className="btn btn-outline-danger"
                onClick={deleteBatch}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {showEditForm && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">Edit Batch Information</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="batchName" className="form-label">
                        <span className="me-2"></span>Batch Name
                      </label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="batchName"
                        placeholder="Enter batch name"
                        {...register("name", { required: "Batch name is required" })}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label htmlFor="certification" className="form-label">
                        <span className="me-2"></span>Certification
                      </label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.certification ? 'is-invalid' : ''}`}
                        id="certification"
                        placeholder="Enter certification"
                        {...register("certification", { required: "Certification is required" })}
                      />
                      {errors.certification && <div className="invalid-feedback">{errors.certification.message}</div>}
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label htmlFor="genre" className="form-label">
                        <span className="me-2"></span>Genre
                      </label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
                        id="genre"
                        placeholder="Enter genre"
                        {...register("genre", { required: "Genre is required" })}
                      />
                      {errors.genre && <div className="invalid-feedback">{errors.genre.message}</div>}
                    </div>
                  </div>
                  
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      <span className="me-2"></span> Save Changes
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => setShowEditForm(false)}
                    >
                      <span className="me-2"></span> Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <span className="text-primary fs-4">👥</span>
              </div>
              <h4 className="mb-1">{students.length}</h4>
              <p className="text-muted mb-0">Students</p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <span className="text-success fs-4">📅</span>
              </div>
              <h4 className="mb-1">{events.length}</h4>
              <p className="text-muted mb-0">Events</p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <span className="text-info fs-4">⏰</span>
              </div>
              <h4 className="mb-1">{slots.length}</h4>
              <p className="text-muted mb-0">Time Slots</p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <span className="text-warning fs-4">👨‍🏫</span>
              </div>
              <h4 className="mb-1">{trainer && trainer.name ? '1' : '0'}</h4>
              <p className="text-muted mb-0">Trainer</p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="bg-secondary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '60px', height: '60px'}}>
                <span className="text-secondary fs-4">🏫</span>
              </div>
              <h4 className="mb-1">{classroom && classroom.name ? '1' : '0'}</h4>
              <p className="text-muted mb-0">Classroom</p>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Information */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">📋 Batch Information</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="me-3 text-primary">🏆</span>
                    <div>
                      <small className="text-muted">Certification</small>
                      <div className="fw-semibold">{batch.certification || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="me-3 text-primary">📖</span>
                    <div>
                      <small className="text-muted">Genre</small>
                      <div className="fw-semibold">{batch.genre || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="me-3 text-primary">👨‍🏫</span>
                    <div>
                      <small className="text-muted">Trainer</small>
                      <div className="fw-semibold">
                        {trainer && trainer.name ? trainer.name : 'Not assigned'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="me-3 text-primary">👨‍💼</span>
                    <div>
                      <small className="text-muted">Coordinator</small>
                      <div className="fw-semibold">
                        {coordinator && coordinator.name ? coordinator.name : 'Not assigned'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <span className="me-3 text-primary">🏫</span>
                    <div>
                      <small className="text-muted">Classroom</small>
                      <div className="fw-semibold">
                        {classroom && classroom.name ? classroom.name : 'Not assigned'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0"> Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/add-student')}
                >
                  <span className="me-2">👥</span>Add Students
                </button>
                <button 
                  className="btn btn-success"
                  onClick={() => navigate('/add-event')}
                >
                  <span className="me-2">📅</span>Schedule Event
                </button>
                <button 
                  className="btn btn-info"
                  onClick={() => navigate('/add-slot')}
                >
                  <span className="me-2"></span>Add Time Slot
                </button>
                <button 
                  className="btn btn-warning"
                  onClick={() => navigate('/add-trainer')}
                >
                  <span className="me-2"></span>Assign Trainer
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate('/add-classRoom')}
                >
                  <span className="me-2"></span>Manage Classroom
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">👥 Students ({students.length})</h5>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/add-student')}
              >
                <span className="me-2">➕</span>Add Student
              </button>
            </div>
            <div className="card-body p-0">
              {students.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0">Roll No</th>
                        <th scope="col" className="border-0">Name</th>
                        <th scope="col" className="border-0">Age</th>
                        <th scope="col" className="border-0">Gender</th>
                        <th scope="col" className="border-0">Email</th>
                        <th scope="col" className="border-0 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, i) => (
                        <tr key={i} className="align-middle">
                          <td className="fw-semibold text-primary">#{student.id}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {/* <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" 
                                   style={{width: '40px', height: '40px'}}>
                                <span className="text-muted">
                                  {student.gender === 'Male' ? '👨' : student.gender === 'Female' ? '👩' : '👤'}
                                </span>
                              </div> */}
                              <div>
                                <div className="fw-semibold">{student.name}</div>
                                <small className="text-muted">{student.phoneNo}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark">{student.age} years</span>
                          </td>
                          <td>
                            <span className="fw-medium">
                              {student.gender}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted">{student.emailId}</small>
                          </td>
                          <td className="text-center">
                            <div className="btn-group" role="group">
                              <button 
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => toast.info(`Viewing student: ${student.name}`)}
                              >
                                View
                              </button>
                              <button 
                                className="btn btn-outline-success btn-sm"
                                onClick={() => toast.info(`Editing student: ${student.name}`)}
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-muted mb-2" style={{fontSize: '2rem'}}>👥</div>
                  <h6 className="text-muted">No students in this batch</h6>
                  <p className="text-muted small">Students will appear here once they are assigned to this batch</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Events and Slots */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">📅 Events ({events.length})</h5>
            </div>
            <div className="card-body">
              {events.length > 0 ? (
                <div className="list-group list-group-flush">
                  {events.map((event, i) => (
                    <div key={i} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{event.name || `Event ${i + 1}`}</h6>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        {event.date || 'TBD'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3">
                  <div className="text-muted mb-2" style={{fontSize: '2rem'}}>📅</div>
                  <h6 className="text-muted">No events scheduled</h6>
                  <p className="text-muted small">Events will appear here once they are scheduled</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">⏰ Time Slots ({slots.length})</h5>
            </div>
            <div className="card-body">
              {slots.length > 0 ? (
                <div className="list-group list-group-flush">
                  {slots.map((slot, i) => (
                    <div key={i} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">{slot.name || `Slot ${i + 1}`}</h6>
                      </div>
                      <span className="badge bg-info rounded-pill">
                        {slot.startTime || 'TBD'} - {slot.endTime || 'TBD'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3">
                  <div className="text-muted mb-2" style={{fontSize: '2rem'}}>⏰</div>
                  <h6 className="text-muted">No time slots defined</h6>
                  <p className="text-muted small">Time slots will appear here once they are created</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BatchDetails
