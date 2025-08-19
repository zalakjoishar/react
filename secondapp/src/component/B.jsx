import React, { useEffect, useState } from 'react'

function B() {
    const [user,setUser]=useState(null)
    const fetchUser=()=>(
        fetch("https://fakestoreapi.com/users").then(response=>response.json()).then(data=>setUser(data[0]))
    )
    useEffect(()=>{
        fetchUser();
    })
  return (
    <div>
        {user && <h1>{user.id} is {user.username}</h1>}
    </div>
  )
}

export default B