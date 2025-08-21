import React, { useEffect, useState } from 'react'
import Recipies from './Recipies'

function AllRecipies() {
    const [recipies,setRecipies]=useState(null)
    const fetchData=()=>{
        fetch("https://dummyjson.com/recipes").then(res=>res.json()).then(data=>setRecipies(data["recipes"]))
    }
    useEffect(()=>{
        fetchData();
    },[])
    return<>
        {recipies && recipies.map(r=><Recipies key={r.id} id={r.id} name={r.name} ingredients={r.ingredients} image={r.image}/>)}
    </>
}

export default AllRecipies