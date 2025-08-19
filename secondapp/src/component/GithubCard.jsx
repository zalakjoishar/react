import React, { useEffect, useState } from 'react'

function GithubCard() {
    const [data,setData]=useState(null)
    const [rdata,setRdata]=useState([])
    const fetchData=()=>{
        fetch("https://api.github.com/users/zalakjoishar").then(res=>res.json()).then(data=>{
            setData(data)
            fetch("https://api.github.com/users/zalakjoishar/repos").then(re=>re.json()).then(da=>setRdata(da))
        })
    }
    useEffect(()=>{
        fetchData()
    },[])
    return (
        <div className='container'>
            <div className="row">
                <div className="col">
                    {data && <div className="card" style={{width: "18rem"}}>
                        <img src={data.avatar_url} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{data.login}</h5>
                            <p className="card-text">{data.type}
                                <br />{data.user_view_type}</p>
                            <a href="https://github.com/zalakjoishar" className="btn btn-primary">Go to github</a>
                        </div>
                    </div>} 
                </div>
                <div className="col">
                    {rdata.map((r,index)=>
                    <div className="card text-white bg-warning mb-3" style={{ maxWidth: 18 + "rem" }} key={index}>
                        <div className="card-header">{r.name}
                        </div>
                        <div className="card-header">{r.language}
                        </div>
                        <a href={r.html_url} className="btn btn-primary">Go to repo</a>
                    </div>)}
                </div>
            </div>
        </div>
  )
}

export default GithubCard