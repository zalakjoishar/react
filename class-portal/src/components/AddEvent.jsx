import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

function AddEvent() {
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
    fetch("http://localhost:8080/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        date: data.date,
        location: data.location
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log("Response", res);
      
      fetch(`http://localhost:8080/event/${data.id}/batch`, {
        method: "PUT",
        headers: {
          "Content-Type": "text/uri-list"
        },
        body: data.batch
      })
      .then(res => res.text())
      .then(res => {
        console.log(res);
        toast.success(`${data.name} added successfully! 🎉`)
        reset()
        setLoading(false)
      })
    })
    .catch(error => {
      toast.error("Failed to add event")
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
            <h4 className="mb-0">🎪 Add New Performance</h4>
            <small className="text-muted">Fill in the performance information below</small>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="eventId" className="form-label">
                    Performance ID
                  </label>
                  <input 
                    type="number" 
                    className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                    id="eventId"
                    placeholder="Enter performance ID"
                    {...register("id", { required: "Event ID is required" })}
                  />
                  {errors.id && <div className="invalid-feedback">{errors.id.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="eventName" className="form-label">
                    Performance Name
                  </label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="eventName"
                    placeholder="Enter performance name"
                    {...register("name", { required: "Event name is required" })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="eventDate" className="form-label">
                    Performance Date
                  </label>
                  <input 
                    type="date" 
                    className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                    id="eventDate"
                    {...register("date", { required: "Event date is required" })}
                  />
                  {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="eventLocation" className="form-label">
                    Location
                  </label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                    id="eventLocation"
                    placeholder="Enter event location"
                    {...register("location", { required: "Location is required" })}
                  />
                  {errors.location && <div className="invalid-feedback">{errors.location.message}</div>}
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
                      Add Performance
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

export default AddEvent