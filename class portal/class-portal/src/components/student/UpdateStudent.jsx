import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

function UpdateStudent({id, name, age, gender, phoneNo, emailId, batch, refresh}) {
  const [bat, setBat] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // Safety checks for all props
  const safeId = id || ''
  const safeName = name || ''
  const safeAge = age || 0
  const safeGender = gender || ''
  const safePhoneNo = phoneNo || ''
  const safeEmailId = emailId || ''
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: safeName,
      age: safeAge,
      gender: safeGender,
      phoneNo: safePhoneNo,
      emailId: safeEmailId,
      batch: batch?._links?.self?.href || ''
    }
  })

  const deleteStudent = () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      fetch(`http://localhost:8080/student/${safeId}`, { method: "DELETE" })
        .then(res => {
          if (res.ok) {
            toast.success('Student deleted successfully!')
            refresh()
          } else {
            toast.error('Failed to delete student')
          }
        })
        .catch(error => toast.error('Something went wrong'))
    }
  }

  const onSubmit = (data) => {
    setLoading(true)
    console.log('Update data:', data)
    console.log('Student ID:', safeId)
    
    // Try PUT method first (more standard for updates)
    fetch(`http://localhost:8080/student/${safeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id || safeId,
        name: data.name,
        age: data.age,
        gender: data.gender,
        phoneNo: data.phoneNo,
        emailId: data.emailId,
      })
    })
    .then(res => {
      console.log('Update response status:', res.status)
      console.log('Update response headers:', res.headers)
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      return res.json()
    })
    .then(res => {
      console.log("Update response:", res);
      
      if (data.batch) {
        console.log('Updating batch:', data.batch)
        fetch(`http://localhost:8080/student/${data.id || safeId}/batch`, {
          method: "PUT",
          headers: {
            "Content-Type": "text/uri-list"
          },
          body: data.batch
        })
        .then(res => {
          console.log('Batch update response status:', res.status)
          return res.text()
        })
        .then(res => {
          console.log('Batch update response:', res);
          toast.success(`${data.name} updated successfully!`)
          refresh()
          setLoading(false)
          // Close the modal
          const modalElement = document.getElementById(`exampleModal1${safeId}`)
          if (modalElement) {
            const modalInstance = window.bootstrap.Modal.getInstance(modalElement)
            if (modalInstance) {
              modalInstance.hide()
            }
          }
        })
        .catch(error => {
          console.error('Batch update error:', error)
          toast.error("Failed to update student batch")
          setLoading(false)
        })
      } else {
        toast.success(`${data.name} updated successfully!`)
        refresh()
        setLoading(false)
        // Close the modal
        const modalElement = document.getElementById(`exampleModal1${safeId}`)
        if (modalElement) {
          const modalInstance = window.bootstrap.Modal.getInstance(modalElement)
          if (modalInstance) {
            modalInstance.hide()
          }
        }
      }
    })
    .catch(error => {
      console.error('Update error:', error)
      toast.error(`Failed to update student: ${error.message}`)
      setLoading(false)
    })
  }

  const fetchBatch = () => {
    fetch("http://localhost:8080/batch")
      .then(res => res.json())
      .then(data => setBat(data["_embedded"]["batches"]))
  }

  useEffect(() => {
    fetchBatch()
    
    // Ensure this specific modal is hidden
    const modalId = `exampleModal1${safeId}`
    const modalElement = document.getElementById(modalId)
    if (modalElement) {
      modalElement.style.display = 'none'
      modalElement.classList.remove('show')
      modalElement.setAttribute('aria-hidden', 'true')
    }
  }, [safeId])

  return (
    <div 
      className="modal fade" 
      id={`exampleModal1${safeId}`} 
      tabIndex="-1" 
      aria-labelledby={`exampleModalLabel1${safeId}`} 
      aria-hidden="true" 
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`exampleModalLabel1${safeId}`}>
              Update Student
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor={`studentName${safeId}`} className="form-label">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id={`studentName${safeId}`}
                    placeholder="Enter full name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor={`studentAge${safeId}`} className="form-label">
                    Age
                  </label>
                  <input 
                    type="number" 
                    className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                    id={`studentAge${safeId}`}
                    placeholder="Enter age"
                    min="1"
                    max="100"
                    {...register("age", { required: "Age is required" })}
                  />
                  {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Gender
                  </label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name={`gender${safeId}`} 
                        id={`male${safeId}`} 
                        value="Male"
                        {...register("gender", { required: "Gender is required" })}
                      />
                      <label className="form-check-label" htmlFor={`male${safeId}`}>
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name={`gender${safeId}`} 
                        id={`female${safeId}`} 
                        value="Female"
                        {...register("gender", { required: "Gender is required" })}
                      />
                      <label className="form-check-label" htmlFor={`female${safeId}`}>
                        Female
                      </label>
                    </div>
                  </div>
                  {errors.gender && <div className="text-danger small mt-1">{errors.gender.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor={`phoneNo${safeId}`} className="form-label">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    className={`form-control ${errors.phoneNo ? 'is-invalid' : ''}`}
                    id={`phoneNo${safeId}`}
                    placeholder="Enter phone number"
                    {...register("phoneNo", { required: "Phone number is required" })}
                  />
                  {errors.phoneNo && <div className="invalid-feedback">{errors.phoneNo.message}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor={`emailId${safeId}`} className="form-label">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                    id={`emailId${safeId}`}
                    placeholder="Enter email address"
                    {...register("emailId", { required: "Email is required" })}
                  />
                  {errors.emailId && <div className="invalid-feedback">{errors.emailId.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor={`batchSelect${safeId}`} className="form-label">
                    Select Batch
                  </label>
                  <select 
                    className={`form-select ${errors.batch ? 'is-invalid' : ''}`}
                    id={`batchSelect${safeId}`}
                    {...register("batch")}
                  >
                    <option value="">Choose a batch...</option>
                    {bat && bat.map((c, i) => (
                      <option value={c._links.self.href} key={i}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.batch && <div className="invalid-feedback">{errors.batch.message}</div>}
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                <button 
                  type="button" 
                  className="btn btn-outline-danger me-md-2"
                  onClick={deleteStudent}
                >
                  Delete Student
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner me-2"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      Update Student
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateStudent