import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ShowBatches from './ShowBatches'

function Batch() {
  const [batch, setBatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  const fetchBatch = () => {
    setLoading(true)
    fetch(`http://localhost:8080/batch`)
      .then(res => res.json())
      .then(data => {
        setBatch(data["_embedded"]["batches"])
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching batches:', error)
        setLoading(false)
      })
  }
  
  useEffect(() => {
    fetchBatch()
  }, [])

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-0">📚 All Batches</h4>
              <small className="text-muted">Manage batch information and student assignments</small>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/add-batch')}>
                <span className="me-2">➕</span>Add Batch
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="loading-spinner"></div>
                <p className="text-muted mt-3">Loading batches...</p>
              </div>
            ) : batch && batch.length > 0 ? (
              <div className="accordion" id="batchAccordion">
                {batch.map((b, i) => (
                  <ShowBatches
                    key={i}
                    id={b.id}
                    name={b.name}
                    certification={b.certification}
                    genre={b.genre}
                    classRoom={b.classRoom}
                    trainer={b.trainer}
                    coordinator={b.coordinator}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="text-muted mb-3" style={{fontSize: '3rem'}}>📚</div>
                <h5 className="text-muted">No batches found</h5>
                <p className="text-muted">Get started by creating your first batch</p>
                <button className="btn btn-primary" onClick={() => navigate('/add-batch')}>
                  <span className="me-2">➕</span>Add Batch
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Batch