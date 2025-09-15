import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Student from '../student/Student'

function ShowBatches({id, name, certification, genre, classRoom, trainer, coordinator, index}) {
  const [student, SetStudent] = useState(null)
  
  // Debug logging for trainer and coordinator
  console.log('ShowBatches received trainer:', trainer)
  console.log('ShowBatches received coordinator:', coordinator)
  
  const fetchStudent = () => {
    fetch(`http://localhost:8080/batch/${id}/student`)
      .then(res => res.json())
      .then(data => {
        console.log('Raw student data:', data)
        if (data && data["_embedded"] && data["_embedded"]["students"]) {
          SetStudent(data["_embedded"]["students"])
        } else {
          SetStudent([])
        }
      })
      .catch(error => {
        console.error('Error fetching students:', error)
        SetStudent([])
      })
  }
  
  useEffect(() => {
    fetchStudent()
  }, [])

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading${index}`}>
        <button 
          className="accordion-button collapsed" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target={`#collapse${index}`} 
          aria-expanded="false" 
          aria-controls={`collapse${index}`}
        >
          <div className="d-flex align-items-center w-100">
            {/* <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" 
                 style={{width: '40px', height: '40px'}}>
              <span className="text-primary">📚</span>
            </div> */}
            <div className="flex-grow-1 text-start">
              <div className="fw-bold">{name}</div>
              <small className="text-muted">
                {certification} • {genre}
              </small>
            </div>
            <div className="text-end">
              <span className="badge bg-primary me-2">
                {student ? student.length : 0} Students
              </span>
            </div>
          </div>
        </button>
      </h2>
      <div 
        id={`collapse${index}`} 
        className="accordion-collapse collapse" 
        aria-labelledby={`heading${index}`} 
        data-bs-parent="#batchAccordion"
      >
        <div className="accordion-body p-0">
          <div className="p-4 bg-light border-bottom">
            <div className="row">
              <div className="col-md-6">
                <h6 className="text-muted mb-2">📋 Batch Details</h6>
                <div className="d-flex align-items-center mb-2">
                  <strong>Certification:</strong>
                  <span className="ms-2">{certification}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <strong>Genre:</strong>
                  <span className="ms-2">{genre}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <h6 className="mb-3">👥 Students in this Batch</h6>
            {student && student.length > 0 ? (
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
                    {student.map((s, i) => {
                      console.log('ShowBatches rendering student:', s)
                      // Ensure all required fields are present and are strings/numbers
                      if (!s || typeof s !== 'object') {
                        console.warn('Invalid student data:', s)
                        return null
                      }
                      
                      // Additional check to ensure this is actually student data
                      if (s.password) {
                        console.warn('Found object with password field - this might be trainer/coordinator data:', s)
                        return null
                      }
                      
                      return (
                        <Student 
                          key={s.id || i}
                          id={s.id || ''}
                          name={s.name || ''}
                          age={s.age || 0}
                          gender={s.gender || ''}
                          phoneNo={s.phoneNo || ''}
                          emailId={s.emailId || ''}
                          batch={s.batch || null}
                        />
                      )
                    })}
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
            <div className="mt-3">
              <Link 
                to={`/batch/${id}`} 
                className="btn btn-primary"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowBatches