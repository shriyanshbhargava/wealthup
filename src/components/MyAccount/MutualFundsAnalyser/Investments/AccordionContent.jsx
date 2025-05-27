const AccordionContent = ({units, percentage, totalReturn, percentReturn, shares, amount=null}) => {
    return(
        <>
            {units && 
                <div className={`flex justify-between  bg-[#99E0E0] p-2 rounded-lg my-2 text-base font-medium`}>
                    <span>No. Of Units</span>
                    <span>{units}</span>
                </div>
            }
            {shares && 
                <div className={`flex justify-between bg-[#99E0E0] p-2 rounded-lg my-2 text-base font-medium`}>
                    <span>No. Of Shares</span>
                    <span>{shares}</span>
                </div>
            }
            {amount !== null && 
                <div className={`flex justify-between bg-[#99E0E0] p-2 rounded-lg my-2 text-base font-medium`}>
                    <span>Investment Amount</span>
                    <span><span style={{fontFamily:'sans-serif'}}>₹</span> {amount}</span>
                </div>
            }
            <div className={`flex justify-between p-2 text-base font-medium`}>
                    <span>% of Portfolio</span>
                    <span>{percentage}%</span>
            </div>
            {totalReturn && 
                <div className={`flex justify-between bg-[#99E0E0] p-2 rounded-lg my-2 text-base font-medium`}>
                    <span>Total Return</span>
                    <span><span style={{fontFamily:'sans-serif'}}>₹</span> {totalReturn}</span>
                </div>
            }
            {percentReturn && 
                <div className={`flex justify-between  p-2 text-base font-medium`}>
                    <span>% Return</span>
                    <span>{percentReturn}%</span>
                </div>
            }
        </>
    )
}

export default AccordionContent