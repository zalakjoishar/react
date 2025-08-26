import React from 'react'
import D from './D'

function C({data}) {
  return (
    <div>
        <h1>C component</h1>
        <p>data : {data.id} {data.name}</p>
        <hr />
        <D data={data}/>
    </div>
  )
}

export default C