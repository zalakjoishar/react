import React, { createContext } from 'react'
import Q from './Q'

export const userContext=createContext()
function P() {
  return (
    <div>
        <h1>P Component</h1>
        <userContext.Provider value={{name:"A",age:19}}>
            <Q/>
        </userContext.Provider>
    </div>
  )
}

export default P