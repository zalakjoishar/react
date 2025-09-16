import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

function AddSlot() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  
  const [bat, setBat] = useState(null)
  const [cla, setCla] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const onSubmit = (data) => {
    setLoading(true)
    console.log(data)
    fetch("http://localhost:8080/slot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log("Response", res);
      
      // Link to classroom
      fetch(`http://localhost:8080/slot/${data.id}/classRoom`, {
        method: "PUT",
        headers: {
          "Content-Type": "text/uri-list"
        },
        body: data.classRoom
      })
      .then(res => res.text())
      .then(res => {
        console.log('Classroom linked:', res)
        
        // Link to batch
        fetch(`http://localhost:8080/slot/${data.id}/batch`, {
          method: "PUT",
          headers: {
            "Content-Type": "text/uri-list"
          },
          body: data.batch
        })
        .then(res => res.text())
        .then(res => {
          console.log('Batch linked:', res)
          toast.success(`Time slot added successfully! 🎉`)
          reset()
          setLoading(false)
        })
        .catch(error => {
          console.error('Batch linking error:', error)
          toast.error("Failed to link batch")
          setLoading(false)
        })
      })
      .catch(error => {
        console.error('Classroom linking error:', error)
        toast.error("Failed to link classroom")
        setLoading(false)
      })
    })
    .catch(error => {
      toast.error("Failed to add time slot")
      setLoading(false)
    })
  }
  
  const fetchBatch = () => {
    fetch("http://localhost:8080/batch")
      .then(res => res.json())
      .then(data => setBat(data["_embedded"]["batches"]))
  }
  
  const fetchCla = () => {
    fetch("http://localhost:8080/classRoom")
      .then(res => res.json())
      .then(data => setCla(data["_embedded"]["classRooms"]))
  }
  
  useEffect(() => {
    fetchBatch()
    fetchCla()
  }, [])

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-6">
        <div className="card">
          <div className="card-header text-center">
            <h4 className="mb-0">⏰ Add New Time Slot</h4>
            <small className="text-muted">Fill in the time slot information below</small>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="slotId" className="form-label">
                    Slot ID
                  </label>
                  <input 
                    type="number" 
                    className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                    id="slotId"
                    placeholder="Enter slot ID"
                    {...register("id", { required: "Slot ID is required" })}
                  />
                  {errors.id && <div className="invalid-feedback">{errors.id.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="slotDay" className="form-label">
                    Day
                  </label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.day ? 'is-invalid' : ''}`}
                    id="slotDay"
                    placeholder="Enter day (e.g., Monday)"
                    {...register("day", { required: "Day is required" })}
                  />
                  {errors.day && <div className="invalid-feedback">{errors.day.message}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="startTime" className="form-label">
                    Start Time
                  </label>
                  <input 
                    type="time" 
                    className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                    id="startTime"
                    {...register("startTime", { required: "Start time is required" })}
                  />
                  {errors.startTime && <div className="invalid-feedback">{errors.startTime.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="endTime" className="form-label">
                    End Time
                  </label>
                  <input 
                    type="time" 
                    className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                    id="endTime"
                    {...register("endTime", { required: "End time is required" })}
                  />
                  {errors.endTime && <div className="invalid-feedback">{errors.endTime.message}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="batchSelect" className="form-label">
                    Select Dance Class
                  </label>
                  <select 
                    className={`form-select ${errors.batch ? 'is-invalid' : ''}`}
                    id="batchSelect"
                    {...register("batch", { required: "Batch selection is required" })}
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
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="classroomSelect" className="form-label">
                    Select Studio
                  </label>
                  <select 
                    className={`form-select ${errors.classRoom ? 'is-invalid' : ''}`}
                    id="classroomSelect"
                    {...register("classRoom", { required: "Classroom selection is required" })}
                  >
                    <option value="">Choose a classroom...</option>
                    {cla && cla.map((c, i) => (
                      <option value={c._links.self.href} key={i}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.classRoom && <div className="invalid-feedback">{errors.classRoom.message}</div>}
                </div>
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
                      Add Time Slot
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

export default AddSlot