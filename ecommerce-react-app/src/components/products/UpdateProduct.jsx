import React from 'react'
import { useForm } from 'react-hook-form'

function UpdateProduct({id,name,description,price}) {
    const {handleSubmit,
        register,
        formState:{errors}}=useForm({defaultValues:{name,description,price}})
    const onSubmit=(data)=>{
        console.log(data);
        fetch(`http://localhost:8080/products/${id}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(res=>{      
            if (res.ok) {
                alert("product updated")

            } else {
                alert("something went wrong")
            }
            return res.json()
        }).catch(error=>alert("something went wrong"))
    }
  return (
    <div>
        {/* Modal */}
        <div className="modal fade" id={`exampleModal${id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='p-4' onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Enter name</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("name",{required:"name is required"},{default:{name}})}/>
                                {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Enter description</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("description",{required:"description is required"},{default:{description}})}/>
                                {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Enter price</label>
                                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("price",{required:"price is required"},{default:{price}})}/>
                                {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateProduct