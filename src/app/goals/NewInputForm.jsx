"use client"

import Funds from "./Funds"
import React from 'react'
import Storage from  "@/utils/storage";
import { useState } from 'react';

const NewInputForm = () => {
    const [goalID,setGoalID] = useState();

    const [formData,setFormData] = useState({
        name:"",
        cost_today:"",
        time_left:""
    });
  

    
  function handleChange(event){
    const {name,value} = event.target;
    setFormData((prevState)=>{
        return {
            ...prevState,
            [name]:value
        }
    })
}

function fetchFunds(){
    const {access_token} = Storage.getToken();
    fetch(`http://localhost:4000/api/v1/new-goals/all-funds`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'authorization' : `Bearer ${access_token}`
        }
    }).then(response=>response.json())
    .then(data => {
        console.log(data);
    }).catch((err)=>{
        console.log("Error in fetching all funds");
        console.log(err);
    })
  }

  fetchFunds();

    function handleSubmit(event){

        event.preventDefault();
        const { access_token } = Storage.getToken();
        fetch(`http://localhost:4000/api/v1/new-goals/create-goal`,{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : `Bearer ${access_token}`
                },
                body: JSON.stringify(formData),
        }).then(response => response.json())
        .then(data => {
            
          //   console.log('Success:', data);
          //   console.log(data?._id);
            setGoalID(data?._id);
          //   setGoalName(data?.name);
          //   console.log("goal id -> ",data?._id);
          //   handleTargetValue(data?.dbEntry?._id);
          //   fetchData();
          // fetchFunds();
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error
        });
        
    }



    return (
    <div>
         <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter your Goal e.g Home' id="goal" value={formData.name} name="name" onChange={handleChange}  />
            <input type="Number" placeholder='Enter cost of today e.g 10000000' id="costToday" value={formData.cost_today} name="cost_today" onChange={handleChange}  />
            <input type="Number" placeholder='Enter time for that goal in years e.g 10' id="time" value={formData.time_left} name="time_left" onChange={handleChange}  />

            <button type="submit">Submit</button>

        </form>

        <Funds goalID={goalID} />
    </div>
  )
}

export default NewInputForm