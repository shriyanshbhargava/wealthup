import React from 'react'
import Storage from '@/utils/storage';
import { apiUrl } from '@/utils/constants';

const DisplayGoals = (props) => {
    const goalsdata = props.goalsdata;
    async function clearFund(id) {
        const {access_token} = Storage.getToken();
        const jsonObj = {goal_id:id};

        fetch(`${apiUrl}/api/v1/new-goals/delete-goal`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json',
                'authorization' : `Bearer ${access_token}`
            },
            body: JSON.stringify(jsonObj)
        })
        .then(response => response.json())
        .then((data)=>{
            console.log("success ", data);
        })
        .catch((err)=>{
            console.log("error in deleteing goal")
            console.log(err);
        })
    }
  return (
    <div>
        {
            goalsdata.map(g=>{
                return (
                    <div key={g._id} >
                        {/* {id = g._id} */}
                        <h4>{g.name}</h4>
                        <p>Cost Today - Rs {g.cost_today}</p>
                        <p>Time Left - {g.time_left} years</p>
                        <button onClick={()=> clearFund(g._id)} className='p-2 border-2 border-blue-900 bg-blue-400 text-black' >Delete Goal</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default DisplayGoals