import { useState } from 'react'
import './App.css'
import A from './component/A'
import P from './component/P'
import Parent from './component/Parent'
import ReducerExample from './component/ReducerExample'
import ReducerExample2 from './component/ReducerExample2'
import RefExample from './component/RefExample'
import { ErrorBoundary } from 'react-error-boundary'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
      <A/>
      <P/>
      <Parent/>
      <ReducerExample/>
      <ReducerExample2/>
      <RefExample/>
      </ErrorBoundary>
    </>
  )
}

export default App
