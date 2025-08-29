import React, { useReducer } from 'react'

function ReducerExample() {
    const reducer=(state,action)=>{
        switch(action.type){
            case 'ADD':
                return state+action.payload
            case 'SUB':
                return state-action.payload
            case 'MUL':
                return state*action.payload
            case 'DIV':
                return state/action.payload
        }
    }
    const [count,setCount]=useReducer(reducer,0)
    return (
        <div>ReducerExample
            <h1>{count}</h1>
            <button onClick={()=>setCount({type:'ADD',payload:10})}>Add</button>
            <button onClick={()=>setCount({type:'SUB',payload:10})}>SUB</button>
            <button onClick={()=>setCount({type:'MUL',payload:10})}>MUL</button>
            <button onClick={()=>setCount({type:'DIV',payload:10})}>DIV</button>
        </div>
    )
}

export default ReducerExample