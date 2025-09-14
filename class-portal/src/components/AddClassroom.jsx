import React from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'

function AddClassroom() {
  const{
      handleSubmit,
      register,
      formState:{errors},
      reset
    }=useForm()
    const onSubmit=(data)=>{
      console.log(data)
      fetch("http://localhost:8080/classRoom",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          id:data.id,
          name:data.name
        })
      }).then(res=>{res.json()
      toast.success(`${data.name} added`)
      reset()}).catch(error=>toast.error("failed to add event"))
    }
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
        <button type="submit" className="btn btn-primary">Add ClassRoom</button>
      </form>
    <ToastContainer/>
    </div>
  )
}

export default AddClassroom