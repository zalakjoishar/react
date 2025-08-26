import React from 'react'
import { useParams } from 'react-router-dom'

function CategoryDetails() {
   const {id}=useParams();
  return (
    <div>CategoryDetails {id}</div>
  )
}

export default CategoryDetails