import React, { useEffect, useState } from 'react'

function E() {
    const [obj,setObj]=useState(null)
    const fetchData=()=>{
        fetch("https://official-joke-api.appspot.com/random_joke").then(response=>response.json()).then(data=>setObj(data))
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div>
        {obj && <h1>{obj.setup} answer is {obj.punchline}</h1>}
    </div>
  )
}

export default E