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
import ShortCircuit from './component/ShortCircuit'
import R from './component/R'
import User from './component/User'

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
      <J/>
      <GithubCard/> */}
      <ShortCircuit/>
      <hr />
      <User id={101} name={"Zia"} desc={"15"}/>
      <hr />
      <User id={102} name={"Zalak"} desc={"20"}/>
      <hr />
      <User id={103} name={"Yash"} desc={"21"}/>
      <hr />
    </>
  )
}

export default App
