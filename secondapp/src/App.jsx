import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './component/Counter'
import A from './component/A'
import C from './component/C'
import D from './component/D'
import E from './component/E'
import F from './component/F'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Counter/>
      <hr />
      <A/>
      <C/>
      <D/>
      <E/>
      <F/>
    </>
  )
}

export default App
