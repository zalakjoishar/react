import React, { useState } from 'react'
import StudentDetails from './StudentDetails'

function Student({id,name,age,gender,phoneNo,emailId,batch}) {
  return (
    <>
      <tr>
        <th scope="row">{id}</th>
        <td>{name}</td>
        <td>{batch && batch.name}</td>
        <td>
          <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal${id}`}>
            view details
          </button>
        </td>
      </tr>
      <StudentDetails id={id}
        name={name}
        age={age}
        gender={gender}
        phoneNo={phoneNo}
        emailId={emailId}
        batch={batch}/>
    </>
  )
}

export default Student