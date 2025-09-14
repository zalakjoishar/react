import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

function Batch() {
  const{
    handleSubmit,
    register,
    formState:{errors},
    reset
  }=useForm()
  const onSubmit=(data)=>{
    console.log(data)
    fetch("http://localhost:8080/batch",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        id:data.id,
        name:data.name,
        certification:data.certification,
        genre:data.genre
      })
    }).then(res=>res.json())
    .then(res=>{
        fetch(`http://localhost:8080/batch/${data.id}/classRoom`,{
        method:"PUT",
        headers:{
          "Content-Type":"text/uri-list"
        },
        body:data.classRoom
      }).then(res=>{
        console.log(res)
        fetch(`http://localhost:8080/batch/${data.id}/trainer`,{
          method:"PUT",
          headers:{
            "Content-Type":"text/uri-list"
          },
        body:data.trainer
      }).then(res=>{
        console.log(res)
        fetch(`http://localhost:8080/batch/${data.id}/coordinator`,{
          method:"PUT",
          headers:{
              "Content-Type":"text/uri-list"
          },
          body:data.coordinator
        }).then(res=>{console.log(res)})      
      })
    })
    toast.success(`${data.name} added`)
    reset()
    })
    .catch(error=>toast.error("failed to add product"))
  }
  
  const [cla,setCla]=useState(null)
  const fetchCla=()=>{
      fetch("http://localhost:8080/classRoom").then(res=>res.json()).then(data=>setCla(data["_embedded"]["classRooms"]))
  }
  const [tra,setTra]=useState(null)
  const fetchTra=()=>{
      fetch("http://localhost:8080/trainer").then(res=>res.json()).then(data=>setTra(data["_embedded"]["trainers"]))
  }
  const [cor,setCor]=useState(null)
  const fetchCor=()=>{
      fetch("http://localhost:8080/coordinator").then(res=>res.json()).then(data=>setCor(data["_embedded"]["coordinators"]))
  }
  useEffect(()=>{
      fetchCla()
      fetchCor()
      fetchTra()
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
          <label htmlFor="exampleInputEmail1" className="form-label">Enter certification</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("certification",{required:"certification is required"})}/>
          {errors.certification && <div id='emailHelp' className='form-text'>{errors.certification.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter genre</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("genre",{required:"certification is required"})}/>
          {errors.genre && <div id='emailHelp' className='form-text'>{errors.genre.message}</div>}
        </div>
        <div className='mb-3'>
          <select className="form-select" aria-label="Default select example" {...register("classRoom",{required:"classRoom is required"})}>
            <option defaultValue={true}>select classRoom</option>
            {cla && cla .map((c,i)=><option value={c._links.self.href} key={i}>{c.name}</option>)}
          </select>
        </div>
        <div className='mb-3'>
          <select className="form-select" aria-label="Default select example" {...register("trainer",{required:"trainer is required"})}>
            <option defaultValue={true}>select trainer</option>
            {tra && tra .map((c,i)=><option value={c._links.self.href} key={i}>{c.name}</option>)}
          </select>
        </div>
        <div className='mb-3'>
          <select className="form-select" aria-label="Default select example" {...register("coordinator",{required:"coordinator is required"})}>
            <option defaultValue={true}>select coordinator</option>
            {cor && cor .map((c,i)=><option value={c._links.self.href} key={i}>{c.name}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    <ToastContainer/>
    </div>
  )
}

export default Batch