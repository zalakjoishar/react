import React, { useEffect, useState } from 'react'
import Student from './Student'

function AllStudent() {
  const [student,SetStudent]=useState(null)
  const fetchStudent=()=>{
    fetch(`http://localhost:8080/student`).then(res=>res.json()).then(data=>SetStudent(data["_embedded"]["students"]))
  }
  useEffect(()=>{
    fetchStudent()
  },[])
  return (
    <div>
      <div className="col">
        <div className="row">
          {student && student.map((s,i)=><Student key={i}
            id={s.id}
            name={s.name}
            age={s.age}
            gender={s.gender}
            phoneNo={s.phoneNo}
            emailId={s.emailId}
          />)}
        </div>
      </div>
    </div>
  )
}

export default AllStudent