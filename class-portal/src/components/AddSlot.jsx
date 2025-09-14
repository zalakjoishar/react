import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

function AddSlot() {
    const{
    handleSubmit,
    register,
    formState:{errors},
    reset
  }=useForm()
  const onSubmit=(data)=>{
    console.log(data)
    fetch("http://localhost:8080/slot",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:data.id,
        name:data.name,
        age:data.age,
        gender:data.gender,
        phoneNo:data.phoneNo,
        emailId:data.emailId,
      })
    }).then(res=>res.json())
    .then(res=>{
        console.log("Response",res);
        fetch(`http://localhost:8080/slot/${data.id}/classRoom`,{
            method:"PUT",
            headers:{
            "Content-Type":"text/uri-list"
            },
            body:data.classRoom
        }).then(res=>{
        console.log(res)
        fetch(`http://localhost:8080/slot/${data.id}/batch`,{
          method:"PUT",
          headers:{
            "Content-Type":"text/uri-list"
          },
        body:data.batch
      })
    })
    toast.success(`${data.name} added`)
    reset()
    })
    .catch(error=>toast.error("failed to add product"))
  }
  const [bat,setBat]=useState(null)
  const fetchBatch=()=>{
    fetch("http://localhost:8080/batch").then(res=>res.json()).then(data=>setBat(data["_embedded"]["batches"]))
  }
  const [cla,setCla]=useState(null)
  const fetchCla=()=>{
    fetch("http://localhost:8080/classRoom").then(res=>res.json()).then(data=>setCla(data["_embedded"]["classRooms"]))
  }
  useEffect(()=>{
    fetchBatch()
    fetchCla()
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
          <label htmlFor="exampleInputEmail1" className="form-label">Enter day</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("day",{required:"name is required"})}/>
          {errors.day && <div id='emailHelp' className='form-text'>{errors.day.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter start time</label>
          <input type="time" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("startTime",{required:"age is required"})}/>
          {errors.startTime && <div id='emailHelp' className='form-text'>{errors.startTime.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter end Time</label>
          <input type="time" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("endTime",{required:"PhoneNo is required"})}/>
          {errors.endTime && <div id='emailHelp' className='form-text'>{errors.endTime.message}</div>}
        </div>
        <div className='mb-3'>
          <select className="form-select" aria-label="Default select example" {...register("batch",{required:"Batch is required"})}>
            <option defaultValue={true}>select batch</option>
            {bat && bat .map((c,i)=><option value={c._links.self.href} key={i}>{c.name}</option>)}
          </select>
        </div>
        <div className='mb-3'>
          <select className="form-select" aria-label="Default select example" {...register("classRoom",{required:"classRoom is required"})}>
            <option defaultValue={true}>select classRoom</option>
            {cla && cla .map((c,i)=><option value={c._links.self.href} key={i}>{c.name}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Student</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default AddSlot