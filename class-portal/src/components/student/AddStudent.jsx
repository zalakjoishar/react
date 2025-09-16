import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

function AddStudent() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  
  const [bat, setBat] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const onSubmit = (data) => {
    setLoading(true)
    console.log(data)
    fetch("http://localhost:8080/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        age: data.age,
        gender: data.gender,
        phoneNo: data.phoneNo,
        emailId: data.emailId,
      })
    }).then(res => res.json())
      .then(res => {
        console.log("Response", res);
        
        fetch(`http://localhost:8080/student/${data.id}/batch`, {
          method: "PUT",
          headers: {
            "Content-Type": "text/uri-list"
          },
          body: data.batch
        }).then(res => res.text()).then(res => {
          console.log(res);
          toast.success(`${data.name} added successfully! 🎉`)
          reset()
          setLoading(false)
        })
      })
      .catch(error => {
        toast.error("Failed to add student")
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
  }, [])

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-6">
        <div className="card">
          <div className="card-header text-center">
            <h4 className="mb-0">💃 Add New Student</h4>
            <small className="text-muted">Fill in the student information below</small>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="studentId" className="form-label">
                    Student ID
                  </label>
                  <input 
                    type="number" 
                    className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                    id="studentId"
                    placeholder="Enter student ID"
                    {...register("id", { required: "Student ID is required" })}
                  />
                  {errors.id && <div className="invalid-feedback">{errors.id.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="studentName" className="form-label">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="studentName"
                    placeholder="Enter full name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="studentAge" className="form-label">
                    Age
                  </label>
                  <input 
                    type="number" 
                    className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                    id="studentAge"
                    placeholder="Enter age"
                    min="1"
                    max="100"
                    {...register("age", { required: "Age is required" })}
                  />
                  {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    Gender
                  </label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="gender" 
                        id="male" 
                        value="Male"
                        {...register("gender", { required: "Gender is required" })}
                      />
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="gender" 
                        id="female" 
                        value="Female"
                        {...register("gender", { required: "Gender is required" })}
                      />
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>
                    </div>
                  </div>
                  {errors.gender && <div className="text-danger small mt-1">{errors.gender.message}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneNo" className="form-label">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    className={`form-control ${errors.phoneNo ? 'is-invalid' : ''}`}
                    id="phoneNo"
                    placeholder="Enter phone number"
                    {...register("phoneNo", { required: "Phone number is required" })}
                  />
                  {errors.phoneNo && <div className="invalid-feedback">{errors.phoneNo.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="emailId" className="form-label">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                    id="emailId"
                    placeholder="Enter email address"
                    {...register("emailId", { required: "Email is required" })}
                  />
                  {errors.emailId && <div className="invalid-feedback">{errors.emailId.message}</div>}
                </div>
              </div>

              <div className="mb-4">
                  <label htmlFor="batchSelect" className="form-label">
                    Select Dance Class
                  </label>
                <select 
                  className={`form-select ${errors.batch ? 'is-invalid' : ''}`}
                  id="batchSelect"
                  {...register("batch", { required: "Batch selection is required" })}
                >
                  <option value="">Choose a dance class...</option>
                  {bat && bat.map((c, i) => (
                    <option value={c._links.self.href} key={i}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.batch && <div className="invalid-feedback">{errors.batch.message}</div>}
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary me-md-2"
                    onClick={() => reset()}
                  >
                    Reset
                  </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner me-2"></span>
                      Adding...
                    </>
                  ) : (
                    <>
                      Add Student
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AddStudent