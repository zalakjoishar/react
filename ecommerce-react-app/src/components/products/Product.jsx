import React from 'react'

function Product({id,name,description,price}) {
  const deleteProduct=()=>{
    fetch(`http://localhost:8080/products/${id}`,{method:"DELETE"}).then(res=>{
      if (res.status=200) {
        alert("product deleted")
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
              <button className='btn btn-success mx-2'>Update</button>
              <button className='btn btn-danger mx-2' onClick={deleteProduct}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default Product