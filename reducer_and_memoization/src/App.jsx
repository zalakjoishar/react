import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import A from './component/A'
import P from './component/P'
import Parent from './component/Parent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <A/> */}
      {/* <P/> */}
      <Parent/>
    </>
  )
}

export default App
