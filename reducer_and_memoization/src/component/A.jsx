import React, { useState } from 'react'
import B from './B'

function A() {
    const [data,setData]=useState({id:1,name:"Nisha"})
  return (
    <div>
        <h1>A Component</h1>
        <p>Data : {data.id} {data.name}</p>
        <hr />
        <B data={data}/>
    </div>
  )
}

export default A