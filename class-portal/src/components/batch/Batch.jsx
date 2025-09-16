import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ShowBatches from './ShowBatches'

function Batch() {
  const [batch, setBatch] = useState(null)
  const [filteredBatches, setFilteredBatches] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  
  const fetchBatch = () => {
    setLoading(true)
    fetch(`http://localhost:8080/batch`)
      .then(res => res.json())
      .then(data => {
        const batches = data["_embedded"]["batches"]
        setBatch(batches)
        setFilteredBatches(batches)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching batches:', error)
        setLoading(false)
      })
  }

  // Search functionality
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase()
    setSearchTerm(searchValue)
    
    if (!batch) return
    
    if (searchValue === '') {
      setFilteredBatches(batch)
    } else {
      const filtered = batch.filter(b => {
        const batchId = b.id ? b.id.toString() : ''
        const batchName = b.name ? b.name.toLowerCase() : ''
        const batchCertification = b.certification ? b.certification.toLowerCase() : ''
        const batchGenre = b.genre ? b.genre.toLowerCase() : ''
        
        return batchId.includes(searchValue) || 
               batchName.includes(searchValue) || 
               batchCertification.includes(searchValue) || 
               batchGenre.includes(searchValue)
      })
      setFilteredBatches(filtered)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
    setFilteredBatches(batch)
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
              <h4 className="mb-0">🎭 All Dance Classes</h4>
              <small className="text-muted">Manage dance class information and student assignments</small>
            </div>
            <div className="d-flex gap-2 align-items-center">
              {/* Search Bar */}
              <div className="d-flex align-items-center">
                <div className="input-group search-input-group compact">
                  <span className="input-group-text">
                    <i className="bi bi-search text-muted"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by ID, Name, Certification, or Dance Style..." 
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  {searchTerm && (
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={clearSearch}
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <div className="search-results-count ms-2">
                    <span className="me-1">🔍</span>
                    <small>{filteredBatches ? filteredBatches.length : 0}</small>
                  </div>
                )}
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/add-batch')}>
                <span className="me-2">➕</span>Add Dance Class
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="loading-spinner"></div>
                <p className="text-muted mt-3">Loading batches...</p>
              </div>
            ) : filteredBatches && filteredBatches.length > 0 ? (
              <div className="accordion" id="batchAccordion">
                {filteredBatches.map((b, i) => (
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
            ) : searchTerm ? (
              <div className="text-center search-no-results">
                <div className="text-muted mb-3" style={{fontSize: '3rem'}}>🔍</div>
                <h5 className="text-muted">No dance classes found</h5>
                <p className="text-muted">No dance classes match your search criteria</p>
                <button className="btn btn-outline-primary" onClick={clearSearch}>
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="text-muted mb-3" style={{fontSize: '3rem'}}>🎭</div>
                <h5 className="text-muted">No dance classes found</h5>
                <p className="text-muted">Get started by creating your first dance class</p>
                <button className="btn btn-primary" onClick={() => navigate('/add-batch')}>
                  <span className="me-2">➕</span>Add Dance Class
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