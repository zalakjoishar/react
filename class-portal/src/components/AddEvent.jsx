import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

function AddEvent() {
  const{
      handleSubmit,
      register,
      formState:{errors},
      reset
    }=useForm()
    const onSubmit=(data)=>{
      console.log(data)
      fetch("http://localhost:8080/event",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          id:data.id,
          name:data.name,
          date:data.date,
          location:data.location
        })
      }).then(res=>res.json())
    .then(res=>{
      console.log("Response",res);
      
      fetch(`http://localhost:8080/student/${data.id}/batch`,{
        method:"PUT",
        headers:{
            "Content-Type":"text/uri-list"
        },
        body:data.batch
      }).then(res=>res.text()).then(res=>{
        console.log(res);
        toast.success(`${data.name} added`)
        reset()
      })
    }).catch(error=>toast.error("failed to add product"))
  }
  const [bat,setBat]=useState(null)
  const fetchBatch=()=>{
    fetch("http://localhost:8080/batch").then(res=>res.json()).then(data=>setBat(data["_embedded"]["batches"]))
  }
  useEffect(()=>{
    fetchBatch()
  },[])
  return (
    <div>
      <form className='container m-3 p-4 border border-secondary' onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter id</label>
          <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("id",{required:"id is required"})}/>
          {errors.id && <div id='emailHelp' className='form-text'>{errors.id.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("name",{required:"name is required"})}/>
          {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter date</label>
          <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("date",{required:"date is required"})}/>
          {errors.date && <div id='emailHelp' className='form-text'>{errors.date.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter location</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("location",{required:"location is required"})}/>
          {errors.location && <div id='emailHelp' className='form-text'>{errors.location.message}</div>}
        </div>
        <div className='mb-3'>
          <select className="form-select" aria-label="Default select example" {...register("batch",{required:"Batch is required"})}>
            <option defaultValue={true}>select batch</option>
            {bat && bat .map((c,i)=><option value={c._links.self.href} key={i}>{c.name}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Event</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default AddEvent