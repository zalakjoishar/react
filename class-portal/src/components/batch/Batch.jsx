import React, { useState } from 'react'
import ShowBatches from './ShowBatches'

function Batch() {
    const [batch,setBatch]=useState(null)
    const fetchBatch=()=>{
        fetch(`http://localhost:8080/batch`).then(res=>res.json()).then(data=>SetStudent(data["_embedded"]["batches"]))
    }
  return (
    <div>
        {
            batch && batch.map((b,i)=><ShowBatches
                id={b.id}
                name={b.name}
                certification={b.certification}
                genre={b.genre}
                classRoom={b.classRoom}
                trainer={b.trainer}
                coordinator={b.coordinator}
            />)
        }
    </div>
  )
}

export default Batch