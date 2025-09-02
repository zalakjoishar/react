import React from 'react'
import {useForm} from 'react-hook-form'

function AddProduct() {
    const{
        handleSubmit,
        register,
        formState:{errors},
        reset}=useForm()
    const onSubmit=(data)=>{
        console.log(data);
        fetch("http://localhost:8080/products",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(res=>res.json()).then(res=>{
            alert(`${res.name} added`)
            reset()}).catch(error=>alert("failed to add product"))
    }
  return (
    <div>
        <form className='container m-3 p-4 border border-secondary' onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter id</label>
                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("id",{required:"id is required"})}/>
                {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("name",{required:"name is required"})}/>
                {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
            </div>
            <div className="mb-3">
                <label fhtmlFor="exampleInputEmail1" className="form-label">Enter description</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("description",{required:"description is required"})}/>
                {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter price</label>
                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("price",{required:"price is required"})}/>
                {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default AddProduct