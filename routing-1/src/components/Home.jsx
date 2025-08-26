import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const[loggedIn,setLoggedIn]=useState(false)
  const navigate=useNavigate()
  const goToProfile=()=>{
    if (loggedIn) {
      navigate("/profile")
    } else {
      
    }
  }
  return (
    <div>
      Home
      <ul>
        <li><Link to={"/profile"}>profile</Link></li>
        <li><Link to={"/category"}>category</Link></li>
        <li><Link to={"/contact"}>contact</Link></li>
      </ul>
      <hr />
      <h1>{loggedIn?"you are logged in":"you are logged out"}</h1>
      <button onClick={()=>setLoggedIn(perv=>!perv)}>{loggedIn?"logout":"loggin"}</button>
      <button onClick={goToProfile()}>Profile</button>
    </div>
  )
}

export default Home