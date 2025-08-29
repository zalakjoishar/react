import React, { useRef } from 'react'

function RefExample() {
    const box=useRef()
    const changeColor=(color)=>{
        box.current.style.backgroundColor=color
    }
    const inpBox=useRef()
    const fetchValue=()=>{
        console.log(inpBox.current.value);
        
    }
    const num=useRef()
    const checkEven=()=>{
        if (num.current.value%2==0) {
            console.log(num.current.value,"is even");
        } else {
            console.log(num.current.value,"is not even");
        }
    }
    return (
        <div>
            <div className="box" ref={box}></div>
            <button onClick={()=>changeColor('red')}>Red</button>
            <button onClick={()=>changeColor('green')}>Green</button>
            <button onClick={()=>changeColor('yellow')}>Yellow</button>
            <hr />
            <input type="text" ref={inpBox}/>
            <button onClick={()=>fetchValue()}>Fetch value</button>
            <hr />
            <input type="text" ref={num}/>
            <button onClick={()=>checkEven()}>check num</button>
        </div>
    )
}

export default RefExample