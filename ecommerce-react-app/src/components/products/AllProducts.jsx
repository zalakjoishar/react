import React, { useEffect, useState } from 'react'
import Product from './Product'

function AllProducts() {
  const [products,setProducts]=useState(null)
  const fetchProduct=()=>{
    fetch("http://localhost:8080/products").then(res=>res.json()).then(data=>setProducts(data))
  }
  useEffect(()=>{
    fetchProduct()
  },[])
  return (
    <div className='container'>
      <div className='row'>
          {products && products.map((p,i)=><Product key={i}
          id={p.id}
          name={p.name}
          description={p.description}
          price={p.price}
          refreshProduct={fetchProduct}
          />)}
      </div>
    </div>
  )
}

export default AllProducts