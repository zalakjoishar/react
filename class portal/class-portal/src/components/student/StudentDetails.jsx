import React, { useState } from 'react'
import '../../pure-modal.css'

function StudentDetails({id, name, age, gender, phoneNo, emailId, batch}) {
  const [isOpen, setIsOpen] = useState(false)
  
  const getGenderIcon = (gender) => {
    return gender === 'Male' ? '👨' : gender === 'Female' ? '👩' : '👤'
  }

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      <button 
        type="button" 
        className="btn btn-outline-primary btn-sm" 
        onClick={openModal}
        title="View Details"
      >
        View
      </button>
      
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
            border: 'none',
            outline: 'none'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: 0,
              maxWidth: '700px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              margin: 0,
              border: '1px solid #dee2e6',
              outline: 'none'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div 
              style={{
                padding: '20px',
                borderBottom: '1px solid #dee2e6',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px 8px 0 0'
              }}
            >
              <h5 style={{ margin: 0, color: '#333', fontSize: '1.25rem' }}>
                👤 Student Details
              </h5>
              <button 
                type="button" 
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6c757d',
                  padding: '4px',
                  borderRadius: '4px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e9ecef'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                }}
              >
                ×
              </button>
            </div>
            
            {/* Body */}
            <div 
              style={{
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                {/* Left side - Avatar and basic info */}
                <div style={{ textAlign: 'center', flex: '0 0 180px' }}>
                  <h5 style={{ margin: '0 0 8px', color: '#333', fontSize: '1.1rem' }}>{name}</h5>
                  <p style={{ color: '#6c757d', margin: 0, fontSize: '0.9rem' }}>Student ID: {id}</p>
                </div>
                
                {/* Right side - Details */}
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '16px',
                    rowGap: '20px'
                  }}>
                    {/* Age */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef'
                    }}>
                      <span style={{ color: '#2196f3', fontSize: '20px' }}></span>
                      <div>
                        <div style={{ color: '#6c757d', fontSize: '0.8rem', fontWeight: '500' }}>Age</div>
                        <div style={{ fontWeight: '600', color: '#333' }}>{age} years</div>
                      </div>
                    </div>
                    
                    {/* Gender */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef'
                    }}>
                      <span style={{ color: '#2196f3', fontSize: '20px' }}></span>
                      <div>
                        <div style={{ color: '#6c757d', fontSize: '0.8rem', fontWeight: '500' }}>Gender</div>
                        <div style={{ fontWeight: '600', color: '#333' }}>{gender}</div>
                      </div>
                    </div>
                    
                    {/* Phone */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef'
                    }}>
                      <span style={{ color: '#2196f3', fontSize: '20px' }}></span>
                      <div>
                        <div style={{ color: '#6c757d', fontSize: '0.8rem', fontWeight: '500' }}>Phone Number</div>
                        <div style={{ fontWeight: '600', color: '#333' }}>{phoneNo}</div>
                      </div>
                    </div>
                    
                    {/* Email */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef'
                    }}>
                      <span style={{ color: '#2196f3', fontSize: '20px' }}></span>
                      <div>
                        <div style={{ color: '#6c757d', fontSize: '0.8rem', fontWeight: '500' }}>Email Address</div>
                        <div style={{ fontWeight: '600', color: '#333' }}>{emailId}</div>
                      </div>
                    </div>
                    
                    {/* Batch - Full width */}
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef',
                      gridColumn: '1 / -1'
                    }}>
                      <span style={{ color: '#2196f3', fontSize: '20px' }}></span>
                      <div>
                        <div style={{ color: '#6c757d', fontSize: '0.8rem', fontWeight: '500' }}>Batch</div>
                        <div style={{ fontWeight: '600', color: '#333' }}>
                          {batch && batch.name ? (
                            <span style={{
                              padding: '4px 12px',
                              borderRadius: '16px',
                              fontSize: '0.85rem',
                              fontWeight: '500'
                            }}>
                              {batch.name}
                            </span>
                          ) : (
                            <span style={{
                              backgroundColor: '#6c757d',
                              color: 'white',
                              padding: '4px 12px',
                              borderRadius: '16px',
                              fontSize: '0.85rem',
                              fontWeight: '500'
                            }}>
                              No Batch Assigned
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div 
              style={{
                padding: '16px 20px',
                borderTop: '1px solid #dee2e6',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '0 0 8px 8px'
              }}
            >
              <button 
                type="button" 
                onClick={closeModal}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  minWidth: '80px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a6268'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#6c757d'
                }}
              >
                Close
              </button>
              <button 
                type="button"
                onClick={() => {
                  closeModal()
                  // Open the UpdateStudent modal
                  const updateModal = document.getElementById(`exampleModal1${id}`)
                  if (updateModal) {
                    const modalInstance = new window.bootstrap.Modal(updateModal)
                    modalInstance.show()
                  }
                }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#2196f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1976d2'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2196f3'
                }}
              >
                Edit Student
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default StudentDetails