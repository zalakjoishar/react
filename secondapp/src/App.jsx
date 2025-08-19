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
import B from './component/B'
import J from './component/J'
import GithubCard from './component/GithubCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Counter/>
      <hr />
      <A/>
      <C/>
      <D/>
      <E/>
      <F/>
      <B/>
      <J/> */}
      <GithubCard/>
    </>
  )
}

export default App
