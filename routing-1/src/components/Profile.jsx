import React from 'react'
import { useSearchParams } from 'react-router-dom'

function Profile() {
  const [searchParam,setSearchParams]=useSearchParams();
  return (
    <div>
      Profile {searchParam.get("sort")} {searchParam.get("edit")}
      <button onClick={()=>setSearchParams({f:"watches",sort:"popularity"})}>Click</button>
      <button onClick={()=>setSearchParams({user:"Anisha"})}>Click</button>
    </div>
  )
}

export default Profile