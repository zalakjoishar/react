import React from 'react'

function StudentDetails({id,name,age,gender,phoneNo,emailId,batch}) {
  return (
    <div>
      <div className="modal" id={`exampleModal${id}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>
                <table>
                  <tr>
                    <td>Name :</td>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <td>Roll No :</td>
                    <td>{id}</td>
                  </tr>
                  <tr>
                    <td>Age :</td>
                    <td>{age}</td>
                  </tr>
                  <tr>
                    <td>Gender :</td>
                    <td>{gender}</td>
                  </tr>
                  <tr>
                    <td>Phone No : </td>
                    <td> {phoneNo}</td>
                  </tr>
                  <tr>
                    <td>EmailId :</td>
                    <td>{emailId}</td>
                  </tr>
                </table>
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDetails