import React from 'react'

function Recipies({id,name,ingredients,image}) {
    return (
        <div class="row row-cols-1 row-cols-md-4 g-4">
            <div className="col">
                <div className="card">
                    <img src={image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{id}-{name}</h5>
                        <p className="card-text">{ingredients.map((i,index)=><li key={index}>{i}</li>)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipies