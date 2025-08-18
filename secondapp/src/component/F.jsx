import React, { useState } from 'react'

function F() {
    const [subjects,setSubjects]=useState(["Maths","English","Science"])
  return (
    <div>
        {subjects.map((s,i)=><li key={i}>{s}</li>)}
    </div>
  )
}

export default F