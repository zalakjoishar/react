import React from 'react'
import UpdateProduct from './UpdateProduct'

function Product({id,name,description,price,refreshProduct}) {
  const deleteProduct=()=>{
    fetch(`http://localhost:8080/products/${id}`,{method:"DELETE"}).then(res=>{
      if (res.ok) {
        alert("product deleted")
        refreshProduct()
      } else {
        alert("something went wrong")
      }
    }).catch(error=>alert("something went wrong"))
  }
  return (
    <div className='col'>
        <div className="card" style={{width: 18+"rem"}}>
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <p className="card-text">{name}</p>
              <p className="card-text">{description}</p>
              <p className="card-text">price : {price}</p>
              {/* Button trigger modal */}
              <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target={`#exampleModal${id}`}>
                update
              </button>
              <button className='btn btn-outline-danger mx-2' onClick={deleteProduct}>Delete</button>
              <UpdateProduct id={id} name={name} description={description} price={price}/>
            </div>
        </div>
    </div>
  )
}

export default Product