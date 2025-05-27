import React from 'react'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import DoughnutChart from './Doughnut.jsx'
import CardTitle from './CardTitle';

const getColor = (score) => {
    if(score <=4){
        return "#DA2B2B"
    }else if(score <=6){
        return "#FF7300"
    }else if(score <=8){
        return "#F2C605"
    }else{
        return "#0FD28C"
    }
}

const ScoreChart = ({itemKey, score, comment, red}) => {
  const redBorder = red !== undefined ? red : score <= 4;

  return (
    <div className={`w-full  dashboard-card text-center  flex flex-col gap-4 justify-center ${!redBorder ? "" : "border-red-600 border-2 border-b-4 "} `}>
        <CardTitle itemKey={itemKey} />
        {(score !==null) &&
            <>
                <div className='max-h-[175px] my-0 mx-auto relative'>
                    <span className={`text-5xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} style={{color:getColor(score)}}>
                        {score}<span className='text-3xl text-primary-blue font-medium'>/10</span>
                    </span>
                    <DoughnutChart datapoints={[score*10, 100-score*10]} color={[getColor(score),'#D9D9D9']} circumference={290} rotation={215} spacing={0}/>
                </div>
                <p className='mb-0 text-lg font-medium md:w-3/4 m-auto'>{comment}</p>
                {/* <button className='py-2 px-4 bg-primary-blue text-white text-center w-fit m-auto' >Improve Your Score &gt;</button> */}
            </>
        }
    </div>
  )
}

export default ScoreChart