import { AiOutlineInfoCircle } from 'react-icons/ai';
import Icard from './Icard';
import Popup from '@/components/ui/popup';
import React from 'react'
import {icardDetails} from '../IcardDetails';
import { useState } from 'react';

const CardTitle = ({itemKey}) => {
    // const [showIcard, setShowIcard] = useState(false);

    // const handleIcardOpen = () => {
    //     setShowIcard(true);
    // }
    // const handleIcardClose = () => {
    //     setShowIcard(false);
    // } 
  return (
    <>
        <div className='flex gap-2 items-center md:mb-3'>
            <h5>{icardDetails[itemKey]?.title}</h5>
            <Popup text={icardDetails[itemKey]?.content}>
                <AiOutlineInfoCircle size={25} className=' text-primary-blue cursor-pointer'/>
            </Popup>
        </div>
    
        {/* <Icard open={showIcard} onClose={handleIcardClose} itemKey={itemKey}/> */}
    </>

  )
}

export default CardTitle