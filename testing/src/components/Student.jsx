import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function Student() {
  const [stu,setStu]=useState(["zalak","yash","aryan","zia"]);
    return (
        <div>
            <ul>
                {stu.map((n)=><li>{n}</li>)}
            </ul>
        </div>
    )
}

export default Student