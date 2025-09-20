import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

function AddBatch() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()
  
  const [cla, setCla] = useState(null)
  const [tra, setTra] = useState(null)
  const [cor, setCor] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const onSubmit = (data) => {
    setLoading(true)
    console.log(data)
    fetch("http://localhost:8080/batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        certification: data.certification,
        genre: data.genre
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log("Response", res);
      
      // Link to classroom
      fetch(`http://localhost:8080/batch/${data.id}/classRoom`, {
        method: "PUT",
        headers: {
          "Content-Type": "text/uri-list"
        },
        body: data.classRoom
      })
      .then(res => res.text())
      .then(res => {
        console.log('Classroom linked:', res)
        
        // Link to trainer
        fetch(`http://localhost:8080/batch/${data.id}/trainer`, {
          method: "PUT",
          headers: {
            "Content-Type": "text/uri-list"
          },
          body: data.trainer
        })
        .then(res => res.text())
        .then(res => {
          console.log('Trainer linked:', res)
          
          // Link to coordinator
          fetch(`http://localhost:8080/batch/${data.id}/coordinator`, {
            method: "PUT",
            headers: {
              "Content-Type": "text/uri-list"
            },
            body: data.coordinator
          })
          .then(res => res.text())
          .then(res => {
            console.log('Coordinator linked:', res)
            toast.success(`${data.name} added successfully! 🎉`)
            reset()
            setLoading(false)
          })
          .catch(error => {
            console.error('Coordinator linking error:', error)
            toast.error("Failed to link coordinator")
            setLoading(false)
          })
        })
        .catch(error => {
          console.error('Trainer linking error:', error)
          toast.error("Failed to link trainer")
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
      toast.error("Failed to add batch")
      setLoading(false)
    })
  }
  
  const fetchCla = () => {
    fetch("http://localhost:8080/classRoom")
      .then(res => res.json())
      .then(data => setCla(data["_embedded"]["classRooms"]))
  }
  
  const fetchTra = () => {
    fetch("http://localhost:8080/trainer")
      .then(res => res.json())
      .then(data => setTra(data["_embedded"]["trainers"]))
  }
  
  const fetchCor = () => {
    fetch("http://localhost:8080/coordinator")
      .then(res => res.json())
      .then(data => setCor(data["_embedded"]["coordinators"]))
  }
  
  useEffect(() => {
    fetchCla()
    fetchCor()
    fetchTra()
  }, [])

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8 col-xl-6">
        <div className="card">
          <div className="card-header text-center">
            <h4 className="mb-0">🎭 Add New Dance Class</h4>
            <small className="text-muted">Fill in the dance class information below</small>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="batchId" className="form-label">
                    Dance Class ID
                  </label>
                  <input 
                    type="number" 
                    className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                    id="batchId"
                    placeholder="Enter dance class ID"
                    {...register("id", { required: "Batch ID is required" })}
                  />
                  {errors.id && <div className="invalid-feedback">{errors.id.message}</div>}
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="batchName" className="form-label">
                    Dance Class Name
                  </label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="batchName"
                    placeholder="Enter dance class name"
                    {...register("name", { required: "Batch name is required" })}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="certification" className="form-label">
                    Certification
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
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="genre" className="form-label">
                    Dance Style
                  </label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
                    id="genre"
                    placeholder="Enter dance style (e.g., Ballet, Hip-Hop, Contemporary)"
                    {...register("genre", { required: "Genre is required" })}
                  />
                  {errors.genre && <div className="invalid-feedback">{errors.genre.message}</div>}
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="classroomSelect" className="form-label">
                    Select Studio
                  </label>
                  <select 
                    className={`form-select ${errors.classRoom ? 'is-invalid' : ''}`}
                    id="classroomSelect"
                    {...register("classRoom", { required: "Classroom selection is required" })}
                  >
                    <option value="">Choose a studio...</option>
                    {cla && cla.map((c, i) => (
                      <option value={c._links.self.href} key={i}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.classRoom && <div className="invalid-feedback">{errors.classRoom.message}</div>}
                </div>
                
                <div className="col-md-4 mb-3">
                  <label htmlFor="trainerSelect" className="form-label">
                    Select Instructor
                  </label>
                  <select 
                    className={`form-select ${errors.trainer ? 'is-invalid' : ''}`}
                    id="trainerSelect"
                    {...register("trainer", { required: "Trainer selection is required" })}
                  >
                    <option value="">Choose an instructor...</option>
                    {tra && tra.map((c, i) => (
                      <option value={c._links.self.href} key={i}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.trainer && <div className="invalid-feedback">{errors.trainer.message}</div>}
                </div>
                
                <div className="col-md-4 mb-3">
                  <label htmlFor="coordinatorSelect" className="form-label">
                    Select Coordinator
                  </label>
                  <select 
                    className={`form-select ${errors.coordinator ? 'is-invalid' : ''}`}
                    id="coordinatorSelect"
                    {...register("coordinator", { required: "Coordinator selection is required" })}
                  >
                    <option value="">Choose a coordinator...</option>
                    {cor && cor.map((c, i) => (
                      <option value={c._links.self.href} key={i}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.coordinator && <div className="invalid-feedback">{errors.coordinator.message}</div>}
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
                      Add Dance Class
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

export default AddBatch