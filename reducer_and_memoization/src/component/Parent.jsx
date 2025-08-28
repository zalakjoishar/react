import React, { useEffect, useState } from 'react'
import Child from './Child'

function Parent() {
    const [count,setCount]=useState(0)
    const [propValue,setPropValue]=useState(0)
    useEffect(()=>{
        console.log("parent component");
    })
    const changePropValue=()=>{
        if(count%10==0)
            setPropValue(count)
    }
    return (
        <div>
            <h1>Parent</h1>
            <h3>{count}</h3>
            <button onClick={()=>{
                setCount(count+1)
                changePropValue()
            }}>Click</button>
            <Child data={propValue}/>
        </div>
    )
}

export default Parent
