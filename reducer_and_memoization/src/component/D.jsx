import React from 'react'

function D({data}) {
  return (
    <div>
        <h1>D component</h1>
        <p>data : {data.id} {data.name}</p>
    </div>
  )
}

export default D