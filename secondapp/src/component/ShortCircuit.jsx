import React, { useState } from 'react'
import R from './R'
import Q from './Q'

function ShortCircuit() {
    const [loggedIn,setLoggedin]=useState(true)
    return <>
        {loggedIn && <h1>Welcome</h1>}
        {loggedIn ? <h1>to react</h1> : <h1>Please</h1>}
        {loggedIn || <h1>login</h1>}
        <button className='btn btn-primary' onClick={()=>setLoggedin((prev)=>!prev)}>
            {loggedIn ? "logout":"login"}
        </button>
        {loggedIn?<R></R>:<Q/>}
    </>
}

export default ShortCircuit