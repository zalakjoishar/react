import React, { useReducer } from 'react'

function ReducerExample2() {
    const reducer=(state,action)=>{
        switch(action.type){
            case "ADD":
                return[...state,action.payload]
            case "DEL":
                return state.filter((s,i)=>i!=action.payload)
        }
    }
    const [sub,setSub]=useReducer(reducer,["Web Designing","SQL"])
    return (
        <div>
            <input type="text" onBlur={e=>setSub({type:"ADD",payload:e.target.value})}/>
            <hr />
            {sub.map((s,i)=><p key={i}>{s}
                <button onClick={e=>setSub({type:"DEL",payload:i})}>Delete</button>
            </p>)}
        </div>
    )
}

export default ReducerExample2