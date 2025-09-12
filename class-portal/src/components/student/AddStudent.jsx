import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { toast } from 'react-toastify'

function AddStudent() {
  const{
    handleSubmit,
    register,
    formState:{errors},
    reset
  }=useForm()
  const onSubmit=(data)=>{
    console.log(data)
    fetch("http://localhost:8080/student",{
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
    }).then(res=>res.json()).then(res=>{
      fetch(`http://localhost:8080/student/${id}/batch`,{
        method:"PUT",
        headers:{
            "Content-Type":"text/uri-list"
        },
        body:data.batch
      }).then(res=>res.text()).then(res=>{console.log(res)})
          toast.success(`${res.name} added`)
          reset()
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
          <label htmlFor="exampleInputEmail1" className="form-label">Enter age</label>
          <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("age",{required:"age is required"})}/>
          {errors.age && <div id='emailHelp' className='form-text'>{errors.age.message}</div>}
        </div>
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1"/>
              <label className="form-check-label" htmlFor="gridRadios1">
                Male
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
              <label className="form-check-label" htmlFor="gridRadios2">
                Female
              </label>
            </div>
          </div>
        </fieldset>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter phoneNo</label>
          <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("phoneNo",{required:"PhoneNo is required"})}/>
          {errors.phoneNo && <div id='emailHelp' className='form-text'>{errors.phoneNo.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Enter emailId</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("emailId",{required:"EmailId is required"})}/>
          {errors.emailId && <div id='emailHelp' className='form-text'>{errors.emailId.message}</div>}
        </div>
        <div className='mb-3'>
          <select className="form-select" aria-label="Default select example" {...register("batch",{required:"Batch is required"})}>
            <option defaultValue={true}>select batch</option>
            {bat && bat .map((c,i)=><option value={c._links.self.href} key={i}>{c.name}</option>)}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    </div>
  )
}

export default AddStudent