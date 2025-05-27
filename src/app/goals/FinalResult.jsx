import React, { useState } from 'react'

import Storage from '@/utils/storage';
import { apiUrl } from '@/utils/constants';

const FinalResult = (props) => {
  
   const goalID = props.goalID;
    const [result,setResult] = useState({}); 

    function resultCalculator(){
        const { access_token } = Storage.getToken();
        const jsonObj = {
            goal_id:goalID
        };
        fetch(`${apiUrl}/api/v1/new-goals/final-result`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify(jsonObj)
        })
        .then(response=>response.json())
        .then(data=>{setResult(data)})
        .catch((err)=>{console.log(err)})
    }
    
    return (
    <div>
        <button onClick={resultCalculator} className='border-2 bg-yellow-400 text-black p-4' >Final result</button>
        {
            result && 
            <div>
                <p> target Value - {result.target_value} </p>
                <p> Current Value - {result.current_value} </p>
                <p> Projected Value - {result.projected_value} </p>
                <p> Gap - {result.gap} </p>
                <p> lumpsum - {result.lumpsum} </p>
                <p> SIP - {result.sip}</p>
            </div>
        }
    </div>
  )
}

export default FinalResult