import React, { useContext } from 'react'
import {userContext} from './P'

function S() {
    const {name,age}=useContext(userContext)
  return (
    <div>
        <h1>S Component</h1>
        {name} {age}
    </div>
  )
}

export default S