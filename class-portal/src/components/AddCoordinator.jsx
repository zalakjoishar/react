import React from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'

function AddCoordinator() {
  const{
      handleSubmit,
      register,
      formState:{errors},
      reset
    }=useForm()
    const onSubmit=(data)=>{
      console.log(data)
      fetch("http://localhost:8080/coordinator",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          id:data.id,
          name:data.name,
          phoneNo:data.phoneNo,
          emailId:data.emailId,
          password:data.password
        })
      }).then(res=>{res.json()}).then(res=>res.text()).then(res=>{
        console.log(res);
        toast.success(`${data.name} added`)
        reset()
      }).catch(error=>toast.error("failed to add coordinator"))
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
          <label htmlFor="exampleInputEmail2" className="form-label">Enter name</label>
          <input type="text" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" {...register("name",{required:"name is required"})}/>
          {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail3" className="form-label">Enter phoneNo</label>
          <input type="number" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" {...register("phoneNo",{required:"name is required"})}/>
          {errors.phoneNo && <div id='emailHelp' className='form-text'>{errors.phoneNo.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail4" className="form-label">Enter emailId</label>
          <input type="emailId" className="form-control" id="exampleInputEmail4" aria-describedby="emailHelp" {...register("emailId",{required:"name is required"})}/>
          {errors.emailId && <div id='emailHelp' className='form-text'>{errors.emailId.message}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail5" className="form-label">Enter password</label>
          <input type="password" className="form-control" id="exampleInputEmail5" aria-describedby="emailHelp" {...register("password",{required:"name is required"})}/>
          {errors.password && <div id='emailHelp' className='form-text'>{errors.password.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Add Coordinator</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default AddCoordinator