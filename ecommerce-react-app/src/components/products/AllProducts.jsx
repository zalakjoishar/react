import React, { useEffect, useState } from 'react'
import Product from './Product'

function AllProducts() {
  const [products,setProducts]=useState(null)
  const [keyword,setKeyword]=useState("")
  const [categories,setCategories]=useState(null)
  const fetchProduct=()=>{
    fetch("http://localhost:8080/products").then(res=>res.json()).then(data=>setProducts(data))
  }
  const searchByPrice=(startPrice,endPrice)=>{
    fetch(`http://localhost:8080/product/search/findByPriceBetween?startPrice=${startPrice}&endPrice=${endPrice}`).then(res=>res.json())
    .then(data=>setProducts(data["_embedded"]["products"]))
  }
  const searchByGreaterThanPrice=(startPrice)=>{
    fetch(`http://localhost:8080/product/search/findByPriceGreaterThan?Price=${startPrice}`).then(res=>res.json())
    .then(data=>setProducts(data["_embedded"]["products"]))
  }
  const fetchCategories=()=>{
    fetch("http://localhost:8080/categories").then(res=>res.json()).then(data=>setCategories(data["_embedded"]["categories"]))
  }
  const searchByCategory=(link)=>{
    fetch(`${link}/products`).then(res=>res.json())
    .then(data=>setProducts(data["_embedded"]["products"]))
  }
  useEffect(()=>{
    fetchProduct()
    fetchCategories()
  },[])
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <p>Search by name</p>
          <input type="text" className='mb-3' onChange={(e)=>setKeyword(e.target.value)}/>
          <ul className="list-group">
            <li className="list-group-item" onClick={()=>searchByPrice(100,1000)}>100-1000</li>
            <li className="list-group-item" onClick={()=>searchByPrice(1000,2000)}>1000-2000</li>
            <li className="list-group-item" onClick={()=>searchByPrice(2000,3000)}>2000-3000</li>
            <li className="list-group-item" onClick={()=>searchByPrice(3000,5000)}>3000-5000</li>
            <li className="list-group-item" onClick={()=>searchByGreaterThanPrice(5000)}>5000 & above</li>
          </ul>
          <br />
          <ul className="list-group">
            {categories && categories.map((c,i)=><li className="list-group-item" onClick={()=>searchByCategory(c._links.self.href)}>{c.name}</li>)}
          </ul>
        </div>
        <div className="col">
          <div className='container'>
            <div className="row">
              {products && products.filter((p)=>p.name.toLowerCase().includes(keyword.toLowerCase()))
              .map((p,i)=><Product key={i}
              id={p.id}
              name={p.name}
              description={p.description}
              price={p.price}
              refreshProducts={fetchProduct}
              />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllProducts