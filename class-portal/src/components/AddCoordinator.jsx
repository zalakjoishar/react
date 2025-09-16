import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

function AddCoordinator() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  
  const [loading, setLoading] = useState(false)
  
  const onSubmit = (data) => {
    setLoading(true)
    console.log(data)
    fetch("http://localhost:8080/coordinator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        phoneNo: data.phoneNo,
        emailId: data.emailId,
        password: data.password
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log("Response", res);
      toast.success(`${data.name} added successfully! 🎉`)
      reset()
      setLoading(false)
    })
    .catch(error => {
      toast.error("Failed to add coordinator")
      setLoading(false)
    })
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-6">
        <div className="card">
          <div className="card-header text-center">
            <h4 className="mb-0">👨‍💼 Add New Coordinator</h4>
            <small className="text-muted">Fill in the coordinator information below</small>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="coordinatorId" className="form-label">
                    Coordinator ID
                  </label>
                  <input 
                    type="number" 
                    className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                    id="coordinatorId"
                    placeholder="Enter coordinator ID"
                    {...register("id", { required: "Coordinator ID is required" })}
                  />
                  {errors.id && <div className="invalid-feedback">{errors.id.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="coordinatorName" className="form-label">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="coordinatorName"
                    placeholder="Enter full name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input 
                  type="password" 
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Enter password"
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
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
                      Add Coordinator
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

export default AddCoordinator