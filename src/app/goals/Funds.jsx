import { useEffect, useState } from 'react';

import FinalResult from "./FinalResult"
import React from 'react'
import Storage from "@/utils/storage";
import { apiUrl } from '@/utils/constants';

const Funds = (props) => {
    const [fundsData, setFundsData] = useState([]);
    const [formData, setFormData] = useState({
        allocatedAmount: "",
    });

    const goalID = props.goalID;
    // console.log("goalId ", goalID);


    function fetchFunds() {
        const { access_token } = Storage.getToken();
        fetch(`${apiUrl}/api/v1/new-goals/all-funds`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${access_token}`
            }
        }).then(response => response.json())
            .then(data => {
                // console.log(data);
                setFundsData(data);
            }).catch((err) => {
                console.log("Error in fetching all funds");
                console.log(err);
            })
    }

    useEffect(() => {
        fetchFunds();
    }, []);

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <div>
            {
                fundsData.map((f, index) => {
                    return (
                        <div key={f._id}>
                            <h2> {f.fund_name} </h2>
                            <p>Total - Rs {Math.floor(f.quantity * f.NAV)} </p>
                            <p>Available - Rs {Math.floor(f.availableQuantity * f.NAV)}</p>
                            <form key={index} onSubmit={async (event) => {
                                event.preventDefault();
                                const { access_token } = Storage.getToken();
                                const jsonObj = {
                                    availableFunds_id: f._id,
                                    goal_id: goalID,
                                    allocatedQuantity: formData.allocatedAmount
                                };

                                  

                                fetch(`${apiUrl}/api/v1/new-goals/allocate-funds`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'authorization': `Bearer ${access_token}`
                                    },
                                    body: JSON.stringify(jsonObj)
                                }).then(response => response.json())
                                    .then(data => {
                                        console.log("success ", data);
                                        if(data.status === 404){
                                            alert("Allocated amount is greter than available")
                                        }
                                    })
                                    .catch(err=>{
                                        console.log("error in allocating funds");
                                        console.log(err);
                                    })

                                }
                            }>
                                <input type="text" placeholder="enter amount to select" onChange={changeHandler} name="allocatedAmount" id={f.isin} />
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                    )

                })
            }

            <FinalResult  goalID={goalID}  />
        </div>

    )
}

export default Funds