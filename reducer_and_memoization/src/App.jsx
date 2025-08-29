import { useState } from 'react'
import './App.css'
import A from './component/A'
import P from './component/P'
import Parent from './component/Parent'
import ReducerExample from './component/ReducerExample'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <A/>
      <P/>
      <Parent/> */}
      <ReducerExample/>
    </>
  )
}

export default App
