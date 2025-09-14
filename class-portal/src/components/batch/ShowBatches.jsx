import React, { useEffect, useState } from 'react'
import Student from '../student/Student'

function ShowBatches({id,name,certification,genre,classRoom,trainer,coordinator}) {
    const [student,SetStudent]=useState(null)
  const fetchStudent=()=>{
    fetch(`http://localhost:8080/batch/${id}/student`).then(res=>res.json()).then(data=>SetStudent(data["_embedded"]["students"]))
  }
  useEffect(()=>{
    fetchStudent()
  },[])
  return (
    <div>
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        {id} : {name}
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>
                            certification-{certification}
                            <br />
                            genre-{genre}
                            {/* classRoom-{classRoom.name}
                            trainer-{trainer}
                            coordinator-{coordinator} */}
                        </strong>
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
                            {student && student.map((s,i)=><Student key={i}
                                id={s.id}
                                name={s.name}
                                age={s.age}
                                gender={s.gender}
                                phoneNo={s.phoneNo}
                                emailId={s.emailId}
                                batch={s.batch}
                            />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShowBatches