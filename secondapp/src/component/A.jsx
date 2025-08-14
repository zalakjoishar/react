import React from 'react'
import { useState } from 'react'

function A() {
    const [name, setName] = useState("")
    const changeName=(e)=>{
        setName(e.target.value)
    }
    return <>
        <input type="text" onChange={changeName}/>
        <h1>Welcome {name}</h1>
    </>
}

export default A