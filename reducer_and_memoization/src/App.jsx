import { useState } from 'react'
import './App.css'
import A from './component/A'
import P from './component/P'
import Parent from './component/Parent'
import ReducerExample from './component/ReducerExample'
import ReducerExample2 from './component/ReducerExample2'
import RefExample from './component/RefExample'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <A/>
      <P/>
      <Parent/>
      <ReducerExample/>
      <ReducerExample2/> */}
      <RefExample/>
    </>
  )
}

export default App
