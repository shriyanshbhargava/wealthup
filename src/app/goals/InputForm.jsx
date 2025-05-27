"use client"

import DisplayGoals from "./DisplayGoals"
import Funds from "./Funds";
import React from 'react'
import Storage from  "@/utils/storage";
import { apiUrl } from '@/utils/constants';
import { useState } from 'react';

const InputForm = () => {

  const [goalID,setGoalID] = useState();
  const [allGoals,setAllGoals] = useState([]);
  const [loading,setLoading] = useState(false);

  function fetchAllGoals(){
    setLoading(true);
    const {access_token} = Storage.getToken();
    fetch(`${apiUrl}/api/v1/new-goals/all-goals`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'authorization' : `Bearer ${access_token}`
        }
    }).then(response=>response.json())
    .then(data => {
        console.log(data);
        setAllGoals(data);
        setLoading(false);
    }).catch((err)=>{
        console.log("Error in fetching all funds");
        console.log(err);
    })
  }


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



  function handleSubmit(event){

      event.preventDefault();
      const { access_token } = Storage.getToken();
      fetch(`${apiUrl}/api/v1/new-goals/create-goal`,{
          method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'authorization' : `Bearer ${access_token}`
              },
              body: JSON.stringify(formData),
      }).then(response => response.json())
      .then(data => {

          setGoalID(data?._id);
          fetchAllGoals();
      })
      .catch((error) => {
          console.error('Error:', error);

      });
      
  }



  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter your Goal e.g Home' id="goal" value={formData.name} name="name" onChange={handleChange}  />
            <input type="Number" placeholder='Enter cost of today e.g 10000000' id="costToday" value={formData.cost_today} name="cost_today" onChange={handleChange}  />
            <input type="Number" placeholder='Enter time for that goal in years e.g 10' id="time" value={formData.time_left} name="time_left" onChange={handleChange}  />

            <button type="submit"  >Submit</button>

        </form>

        {
            loading ? (<div>Loading...Please wait</div>) :  (<DisplayGoals goalsdata={allGoals} />)
        }

        <Funds goalID={goalID} />
    </div>
  )
}

export default InputForm