import React, { useState } from 'react'
import StudentDetails from './StudentDetails'
import UpdateStudent from './UpdateStudent'

function Student({id, name, age, gender, phoneNo, emailId, batch, refresh}) {
  // Debug logging to see what's being passed
  console.log('Student component received batch:', batch)
  console.log('Student component received name:', name)
  console.log('Student component received phoneNo:', phoneNo)
  console.log('Student component received emailId:', emailId)
  
  // Safety checks for all props
  const safeId = id || ''
  const safeName = name || ''
  const safeAge = age || 0
  const safeGender = gender || ''
  const safePhoneNo = phoneNo || ''
  const safeEmailId = emailId || ''
  
  // Additional safety check - if any prop is an object, don't render it
  if (typeof name === 'object' || typeof phoneNo === 'object' || typeof emailId === 'object') {
    console.error('Student component received object instead of string for name/phoneNo/emailId:', {name, phoneNo, emailId})
    return null
  }
  
  const getGenderIcon = (gender) => {
    return gender === 'Male' ? '' : gender === 'Female' ? '' : '👤'
  }

  const getGenderColor = (gender) => {
    return gender === 'Male' ? '' : gender === 'Female' ? '' : ''
  }

  return (
    <>
      <tr className="align-middle">
        <td className="fw-semibold">{safeId}</td>
        <td>
          <div className="d-flex align-items-center">
            <div>
              <div className="fw-semibold">{safeName}</div>
              <small className="text-muted">{safePhoneNo}</small>
            </div>
          </div>
        </td>
        <td>
          <span className="badge bg-light text-dark">{safeAge} years</span>
        </td>
        <td>
          <span className={`fw-medium ${getGenderColor(safeGender)}`}>
            {getGenderIcon(safeGender)} {safeGender}
          </span>
        </td>
        <td>
          <small className="text-muted">{safeEmailId}</small>
        </td>
        <td>
          {(() => {
            // Safety check to prevent object rendering
            if (!batch) return <span className="badge bg-secondary">No Batch</span>
            
            if (typeof batch === 'string') {
              return <span className="badge bg-primary">{batch}</span>
            }
            
            if (typeof batch === 'object' && batch.name) {
              return <span className="badge bg-primary">{batch.name}</span>
            }
            
            // If batch is an object but doesn't have name, don't render it
            console.warn('Invalid batch object:', batch)
            return <span className="badge bg-secondary">No Batch</span>
          })()}
        </td>
        <td className="text-center">
          <div className="btn-group" role="group">
            <StudentDetails 
              id={safeId}
              name={safeName}
              age={safeAge}
              gender={safeGender}
              phoneNo={safePhoneNo}
              emailId={safeEmailId}
              batch={batch}
            />
            <button 
              type="button" 
              className="btn btn-outline-success btn-sm" 
              data-bs-toggle="modal" 
              data-bs-target={`#exampleModal1${safeId}`}
              title="Update Student"
            >
              Edit
          </button>
          </div>
        </td>
      </tr>
      <UpdateStudent 
        id={safeId}
        name={safeName}
        age={safeAge}
        gender={safeGender}
        phoneNo={safePhoneNo}
        emailId={safeEmailId}
        batch={batch}
        refresh={refresh}
      />
    </>
  )
}

export default Student