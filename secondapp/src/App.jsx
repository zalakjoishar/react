import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './component/Counter'
import A from './component/A'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Counter/>
      <hr />
      <A/>
    </>
  )
}

export default App
