import React from 'react'
import UpdateProduct from './UpdateProduct'
import {useNavigate} from 'react-router-dom'

function Product({id,name,description,price,refreshProducts}) {
  const navigate=useNavigate();
  const deleteProduct=()=>{
    fetch(`http://localhost:8080/products/${id}`,{method:"DELETE"}).then(res=>{
      if (res.ok) {
        alert("product deleted")
        refreshProducts()
      } else {
        alert("something went wrong")
      }
    }).catch(error=>alert("something went wrong"))
  }
  return (
    <div className='col'>
        <div className="card" style={{width: 18+"rem"}}>
            <img src={`http://localhost:8080/products/${id}/image?${Date.now()}`} className="card-img-top" alt="..."/>
            <div className="card-body">
              <p className="card-text">{name}</p>
              <p className="card-text">{description}</p>
              <p className="card-text">price : {price}</p>
              {/* Button trigger modal */}
              <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target={`#exampleModal${id}`}>
                update
              </button>
              <button className='btn btn-outline-danger mx-2' onClick={deleteProduct}>Delete</button>
              <div className='d-grid gap-2 mt-2'>
                <button className='btn btn-outline-primary' type='button' onClick={()=>navigate(`/products/${id}`)}>Veiw Detail</button>
              </div>
              <UpdateProduct id={id} name={name} description={description} price={price} refreshProducts={refreshProducts}/>
            </div>
        </div>
    </div>
  )
}

export default Product