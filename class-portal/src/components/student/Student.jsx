import React, { useState } from 'react'

function Student({id,name,age,gender,phoneNo,emailId}) {
  const [batch,setBatch]=useState(null)
  const fetchBatch=()=>{
    fetch(`http://localhost:8080/student/${id}/batch`).then(res=>res.json()).then(data=>setBatch(data))
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Roll no</th>
            <th scope="col">Name</th>
            <th scope="col">Batch</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{batch && batch.name}</td>
            <td><button className='btn btn-outline-primary'>Veiw Detail</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Student