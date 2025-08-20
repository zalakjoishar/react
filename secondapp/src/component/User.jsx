import React from 'react'

function User({id,name,desc}) {
    return <>
        <div className="card w-25">
            <div className="card-body">
                <h5 className="card-title">{id} {name}</h5>
                <p className="card-text">age{desc}</p>
                <a href="#" className="btn btn-primary">Button</a>
            </div>
        </div>
    </>
}

export default User