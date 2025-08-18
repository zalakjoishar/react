import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
function C() {
    const [count,setCount]=useState(0)
    useEffect(() => {
        const timeout=setTimeout(()=>{
            console.log(count);
        },10000);
        return ()=>{
            clearTimeout(timeout)
        }
    }, [count])
    return (
        <div>
            <h1>C component {count}</h1>
            <button type='button' className='btn btn-primary' onClick={()=>setCount(count+1)}>click</button>
        </div>
    )
}

export default C