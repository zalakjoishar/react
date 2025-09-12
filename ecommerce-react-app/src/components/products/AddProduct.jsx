import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import {ToastContainer,toast} from 'react-toastify'

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
            body:JSON.stringify({
                id:data.id,
                name:data.name,
                description:data.description,
                price:data.price
            })
        }).then(res=>res.json()).then(res=>{
            fetch(`http://localhost:8080/product/${res.id}/category`,{
                method:"PUT",
                headers:{
                    "Content-Type":"text/uri-list"
                },
                body:data.category
            })
            let formData= new FormData()
            formData.append('product_image',data.image[0])
            fetch(`http://localhost:8080/products/${res.id}/upload-image`,{
                method:"POST",
                body:formData
            }).then(res=>res.text()).then(res=>{console.log(res)})
            toast.success(`${res.name} added`)
            reset()}).catch(error=>toast.error("failed to add product"))
    }
    const [cat,setCat]=useState(null)
    const fetchCategories=()=>{
        fetch("http://localhost:8080/categories").then(res=>res.json()).then(data=>setCat(data["_embedded"]["categories"]))
    }
    useEffect(()=>{
        fetchCategories()
    },[])
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
                <label htmlFor="exampleInputEmail1" className="form-label">Enter description</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("description",{required:"description is required"})}/>
                {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter price</label>
                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("price",{required:"price is required"})}/>
                {errors.name && <div id='emailHelp' className='form-text'>{errors.name.message}</div>}
            </div>
            <div className='mb-3'>
                <select className="form-select" aria-label="Default select example" {...register("category")}>
                    <option defaultValue={true}>select category</option>
                    {cat && cat .map((c,i)=><option value={c._links.self.href} key={i}>{c.name}</option>)}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Upload product image</label>
                <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("image")}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <ToastContainer/>
        </form>
    </div>
  )
}

export default AddProduct