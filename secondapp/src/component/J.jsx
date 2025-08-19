import React, { useEffect, useState } from 'react'

function J() {
    const [pro,setPro]=useState([])
    const fetchpro=()=>{
        fetch("https://fakestoreapi.in/api/products").then(res=>res.json()).then(data => setPro(data["products"]))
    }
    useEffect(()=>{
        fetchpro();
    },[])
    return (
        <div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {pro.map((p)=>
                    <div className="col" key={p.id}>
                        <div className="card">
                        <img src={p.image} className="card-img-top" alt="..." ></img>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default J