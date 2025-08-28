import React, { useEffect } from 'react'

function Child(data) {
    useEffect(()=>{
        console.log("Child",data);
    })
    return (
        <div>Child</div>
    )
}

export default Child