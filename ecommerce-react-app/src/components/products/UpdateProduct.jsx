import React from 'react'
import { useForm } from 'react-hook-form'

function UpdateProduct({id,name,description,price,refreshProducts}) {
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
            body:JSON.stringify({
                name:data.name,
                description:data.description,
                price:data.price
            })
        }).then(res=>{      
            if (res.ok) {
                let formData= new FormData()
                formData.append('product_image',data.image[0])
                fetch(`http://localhost:8080/products/${id}/upload-image`,{
                    method:"POST",
                    body:formData
                }).then(res=>res.text()).then(res=>{
                    console.log(res)
                    refreshProducts()
                })
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
                            {/* <div className='mb-3'>
                                <select className="form-select" aria-label="Default select example" {...register("category")}>
                                    <option defaultValue={true}>select category</option>
                                    {cat && cat .map((c,i)=><option value={c._links.self.href} key={i}>{c.name}</option>)}
                                </select>
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Upload product image</label>
                                <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("image")}/>
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