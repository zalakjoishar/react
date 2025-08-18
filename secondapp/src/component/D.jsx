import React, { useEffect, useState } from 'react'
function D() {
    const [product, setProduct]=useState(null)
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData=()=>{
        fetch("https://fakestoreapi.in/api/products/1").then(respose=>respose.json()).then(data=>setProduct(data))
    }
  return (
    <div>
        {product && <div class="card" style={{width:18+"rem"}}>
        <img src="..." class="card-img-top" alt="..."/>
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>}
    </div>
  )
}

export default D