import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import A from './component/A'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <A/>
    </>
  )
}

export default App
