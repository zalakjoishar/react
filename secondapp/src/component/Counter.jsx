import { useState } from "react"

function Counter() {
    let [count,setCount]=useState(0)
    const increment=()=>{
        setCount(count+1)
    }
    const decrement=()=>{
        setCount(count-1)
    }
    return <>
        <h3>Counter {count}</h3>
        <button className="btn btn-primary" onClick={increment}>Increment</button>
        <button className="btn btn-danger" onClick={decrement}>Decrement</button>
    </>
}
export default Counter