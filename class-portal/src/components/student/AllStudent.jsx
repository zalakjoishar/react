import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Student from './Student'

function AllStudent() {
  const [student, SetStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  const fetchStudent = () => {
    setLoading(true)
    console.log('Fetching students from: http://localhost:8080/student')
    
    // Add timeout to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    fetch(`http://localhost:8080/student`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log('Response status:', res.status)
        console.log('Response headers:', res.headers)
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        return res.json()
      })
      .then(data => {
        console.log('Raw API response:', data)
        
        if (data && data["_embedded"] && data["_embedded"]["students"]) {
          SetStudent(data["_embedded"]["students"])
          console.log('Students loaded:', data["_embedded"]["students"])
        } else {
          console.log('No students found or unexpected data structure:', data)
          SetStudent([])
        }
        setLoading(false)
      })
      .catch(error => {
        clearTimeout(timeoutId)
        console.error('Error fetching students:', error)
        console.error('Error details:', error.message)
        
        if (error.name === 'AbortError') {
          console.error('Request timed out after 10 seconds')
        }
        
        SetStudent([])
        setLoading(false)
      })
  }
  
  useEffect(() => {
    fetchStudent()
  }, [])

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0">👥 All Students</h4>
              <small className="text-muted">Manage student information and records</small>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/add-student')}>
                <span className="me-2">➕</span>Add Student
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="loading-spinner"></div>
                <p className="text-muted mt-3">Loading students...</p>
              </div>
            ) : student === null ? (
              <div className="text-center py-5">
                <div className="text-danger mb-3" style={{fontSize: '3rem'}}>⚠</div>
                <h5 className="text-danger">API Connection Error</h5>
                <p className="text-muted">Unable to connect to the server at localhost:8080</p>
                <p className="text-muted small">Please check if the backend server is running</p>
                <button className="btn btn-outline-primary" onClick={fetchStudent}>
                  Retry
                </button>
              </div>
            ) : student && student.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0">Roll No</th>
                      <th scope="col" className="border-0">Name</th>
                      <th scope="col" className="border-0">Age</th>
                      <th scope="col" className="border-0">Gender</th>
                      <th scope="col" className="border-0">Email</th>
                      <th scope="col" className="border-0">Batch</th>
                      <th scope="col" className="border-0 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.map((s, i) => (
                      <Student 
                        key={i}
                        id={s.id}
                        name={s.name}
                        age={s.age}
                        gender={s.gender}
                        phoneNo={s.phoneNo}
                        emailId={s.emailId}
                        batch={s.batch}
                        refresh={fetchStudent}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="text-muted mb-3" style={{fontSize: '3rem'}}>👥</div>
                <h5 className="text-muted">No students found</h5>
                <p className="text-muted">Get started by adding your first student</p>
                <button className="btn btn-primary" onClick={() => navigate('/add-student')}>
                  <span className="me-2">➕</span>Add Student
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllStudent