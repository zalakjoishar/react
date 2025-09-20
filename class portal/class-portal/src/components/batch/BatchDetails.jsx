import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiGet, apiPut, apiPutUriList, apiDelete } from '../../utils/api'
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
  const [classrooms, setClassrooms] = useState([])
  const [coordinators, setCoordinators] = useState([])
  const [trainers, setTrainers] = useState([])
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      certification: '',
      genre: '',
      trainerId: '',
      coordinatorId: '',
      classroomId: ''
    }
  })


  useEffect(() => {
    fetchBatchDetails()
  }, [id])

  const fetchBatchDetails = async () => {
    setLoading(true)
    try {
      // Fetch batch details
      const batchData = await apiGet(`/batch/${id}`)
      setBatch(batchData)
      
      // Debug logging to understand data structure
      console.log('Batch data:', batchData)
      console.log('Trainer object:', batchData.trainer)
      console.log('Coordinator object:', batchData.coordinator)
      console.log('Classroom object:', batchData.classRoom)
      
      // Fetch related data in parallel
      const [studentsData, eventsData, slotsData, trainerData, coordinatorData, classroomData, allTrainersData, allCoordinatorsData, allClassroomsData] = await Promise.all([
        apiGet(`/batch/${id}/student`).catch(() => ({ "_embedded": { "students": [] } })),
        apiGet(`/batch/${id}/event`).catch(() => ({ "_embedded": { "events": [] } })),
        apiGet(`/batch/${id}/slot`).catch(() => ({ "_embedded": { "slots": [] } })),
        apiGet(`/batch/${id}/trainer`).catch(() => null),
        apiGet(`/batch/${id}/coordinator`).catch(() => null),
        apiGet(`/batch/${id}/classRoom`).catch(() => null),
        apiGet('/trainer').catch(() => ({ "_embedded": { "trainers": [] } })),
        apiGet('/coordinator').catch(() => ({ "_embedded": { "coordinators": [] } })),
        apiGet('/classRoom').catch(() => ({ "_embedded": { "classRooms": [] } }))
      ])

      setStudents(studentsData["_embedded"]?.students || [])
      setEvents(eventsData["_embedded"]?.events || [])
      setSlots(slotsData["_embedded"]?.slots || [])
      setTrainer(trainerData)
      setCoordinator(coordinatorData)
      setClassroom(classroomData)
      setTrainers(allTrainersData["_embedded"]?.trainers || [])
      setCoordinators(allCoordinatorsData["_embedded"]?.coordinators || [])
      setClassrooms(allClassroomsData["_embedded"]?.classRooms || [])
      
      // Reset form with batch data after fetching related data
      reset({
        name: batchData.name || '',
        certification: batchData.certification || '',
        genre: batchData.genre || '',
        trainerId: trainerData?._links?.self?.href || '',
        coordinatorId: coordinatorData?._links?.self?.href || '',
        classroomId: classroomData?._links?.self?.href || ''
      })
      
      // Debug logging for fetched data
      console.log('Fetched trainer:', trainerData)
      console.log('Fetched coordinator:', coordinatorData)
      console.log('Fetched classroom:', classroomData)
      console.log('All trainers:', allTrainersData["_embedded"]?.trainers || [])
      console.log('All coordinators:', allCoordinatorsData["_embedded"]?.coordinators || [])
      console.log('All classrooms:', allClassroomsData["_embedded"]?.classRooms || [])
      
    } catch (error) {
      console.error('Error fetching batch details:', error)
      toast.error('Failed to load batch details')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      // Update batch basic information
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
        // Update trainer assignment if changed
        if (data.trainerId) {
          await fetch(`http://localhost:8080/batch/${id}/trainer`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'text/uri-list'
            },
            body: data.trainerId
          })
        }

        // Update coordinator assignment if changed
        if (data.coordinatorId) {
          await fetch(`http://localhost:8080/batch/${id}/coordinator`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'text/uri-list'
            },
            body: data.coordinatorId
          })
        }

        // Update classroom assignment if changed
        if (data.classroomId) {
          await fetch(`http://localhost:8080/batch/${id}/classRoom`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'text/uri-list'
            },
            body: data.classroomId
          })
        }

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


  const deleteEvent = async (eventId, eventName) => {
    if (window.confirm(`Are you sure you want to delete the event "${eventName}"? This action cannot be undone.`)) {
      try {
        const response = await fetch(`http://localhost:8080/event/${eventId}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          toast.success('Event deleted successfully!')
          fetchBatchDetails() // Refresh data
        } else {
          toast.error('Failed to delete event')
        }
      } catch (error) {
        console.error('Error deleting event:', error)
        toast.error('Failed to delete event')
      }
    }
  }

  const deleteSlot = async (slotId, slotName) => {
    if (window.confirm(`Are you sure you want to delete the time slot "${slotName}"? This action cannot be undone.`)) {
      try {
        const response = await fetch(`http://localhost:8080/slot/${slotId}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          toast.success('Time slot deleted successfully!')
          fetchBatchDetails() // Refresh data
        } else {
          toast.error('Failed to delete time slot')
        }
      } catch (error) {
        console.error('Error deleting time slot:', error)
        toast.error('Failed to delete time slot')
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
              <p className="text-muted mb-0">Batch ID: {batch.id}</p>
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

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="trainerId" className="form-label">
                        Trainer
                      </label>
                      <select 
                        className="form-select"
                        id="trainerId"
                        {...register("trainerId")}
                      >
                        <option value="">Select a trainer...</option>
                        {trainers.map((trainer) => (
                          <option key={trainer.id} value={trainer._links.self.href}>
                            {trainer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label htmlFor="coordinatorId" className="form-label">
                        Coordinator
                      </label>
                      <select 
                        className="form-select"
                        id="coordinatorId"
                        {...register("coordinatorId")}
                      >
                        <option value="">Select a coordinator...</option>
                        {coordinators.map((coordinator) => (
                          <option key={coordinator.id} value={coordinator._links.self.href}>
                            {coordinator.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <label htmlFor="classroomId" className="form-label">
                        Classroom
                      </label>
                      <select 
                        className="form-select"
                        id="classroomId"
                        {...register("classroomId")}
                      >
                        <option value="">Select a classroom...</option>
                        {classrooms.map((classroom) => (
                          <option key={classroom.id} value={classroom._links.self.href}>
                            {classroom.name}
                          </option>
                        ))}
                      </select>
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
        
        {/* <div className="col-lg-3 col-md-6 mb-3">
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
        </div> */}
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
                    <div>
                      <small className="text-muted">Certification</small>
                      <div className="fw-semibold">{batch.certification || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div>
                      <small className="text-muted">Genre</small>
                      <div className="fw-semibold">{batch.genre || 'Not specified'}</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
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
                  <span className="me-2">⏰</span>Add Time Slot
                </button>
                <button 
                  className="btn btn-warning"
                  onClick={() => navigate('/add-trainer')}
                >
                  <span className="me-2">👨‍🏫</span>Assign Trainer
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate('/add-classRoom')}
                >
                  <span className="me-2">🏛️</span>Manage Classroom
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
                          <td className="fw-semibold">{student.id}</td>
                          <td>
                            <div className="d-flex align-items-center">
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
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">📅 Events ({events.length})</h5>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-success btn-sm"
                  onClick={() => navigate('/add-event')}
                >
                  <span className="me-1">➕</span>Add Event
                </button>
              </div>
            </div>
            <div className="card-body">
              {events.length > 0 ? (
                <div className="list-group list-group-flush">
                  {events.map((event, i) => (
                    <div key={i} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{event.name || `Event ${i + 1}`}</h6>
                        {event.location && (
                          <small className="text-muted">📍 {event.location}</small>
                        )}
                        {event.description && (
                          <div className="mt-1">
                            <small className="text-muted">{event.description}</small>
                          </div>
                        )}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-primary rounded-pill">
                          {event.date ? new Date(event.date).toLocaleDateString() : 'TBD'}
                        </span>
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteEvent(event.id, event.name)}
                          title="Delete event"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3">
                  <div className="text-muted mb-2" style={{fontSize: '2rem'}}>📅</div>
                  <h6 className="text-muted">No events scheduled</h6>
                  <p className="text-muted small">Events will appear here once they are scheduled</p>
                  <button 
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => navigate('/add-event')}
                  >
                    <span className="me-1">🎪</span>Add First Event
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">⏰ Time Slots ({slots.length})</h5>
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-info btn-sm"
                  onClick={() => navigate('/add-slot')}
                >
                  <span className="me-1">➕</span>Add Slot
                </button>
              </div>
            </div>
            <div className="card-body">
              {slots.length > 0 ? (
                <div className="list-group list-group-flush">
                  {slots.map((slot, i) => (
                    <div key={i} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{slot.name || `Slot ${i + 1}`}</h6>
                        <div className="align-items-center gap-2 mb-1">
                          {slot.day && (
                            <span className="badge bg-opacity-10 text-secondary" style={{fontSize: '0.75rem'}}>
                              {slot.day}:
                            </span>
                          )}
                          <span className="badge bg-info rounded-pill" style={{fontSize: '0.75rem'}}>
                            {slot.startTime || 'TBD'} - {slot.endTime || 'TBD'}
                          </span>
                        </div>
                        {slot.description && (
                          <small className="text-muted">{slot.description}</small>
                        )}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <button 
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteSlot(slot.id, slot.name || `Slot ${i + 1}`)}
                          title="Delete time slot"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3">
                  <div className="text-muted mb-2" style={{fontSize: '2rem'}}>⏰</div>
                  <h6 className="text-muted">No time slots defined</h6>
                  <p className="text-muted small">Time slots will appear here once they are created</p>
                  <button 
                    className="btn btn-info btn-sm mt-2"
                    onClick={() => navigate('/add-slot')}
                  >
                    <span className="me-1">⏰</span>Add First Slot
                  </button>
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
