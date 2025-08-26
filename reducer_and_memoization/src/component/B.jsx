import React from 'react'
import C from './C'

function B({data}) {
  return (
    <div>
        <h1>B component</h1>
        <p>data : {data.id} {data.name}</p>
        <hr />
        <C data={data}/>
    </div>
  )
}

export default B