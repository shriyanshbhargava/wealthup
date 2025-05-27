'use client'

import React, { useEffect, useRef, useState } from 'react'

import {AiOutlineClose} from 'react-icons/ai'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal/Modal'
import {icardDetails} from '../IcardDetails'

const style = theme => ({
  position: 'absolute',
  top:'50%',
  left:"50%",
  transform:'translate(-50%, -50%)',
  width:400,
  bgcolor:'#069',
  borderRadius:'8px',
  textAlign:"center",
  color:"white",
  p:2
})

const Icard = ({open, onClose, itemKey, title, details }) => {
  return (
     <Modal 
      open={open} 
      onClose={onClose}
      closeAfterTransition
      slots={{backdrop: Backdrop}}
    >
        <Fade in={open}>
          <Box sx={style} maxWidth={'90%'} >
            <div className='w-full flex justify-end'>
              <AiOutlineClose size={20} color='white' className='cursor-pointer' onClick={onClose}/>
            </div>
            <div className='pt-1 pb-2 px-2 w-full'>
                {/* {title} */}
                <h5 className='text-white text-left'>{title ? title : icardDetails[itemKey]?.title}</h5>
            </div>

              <div className='p-2 text-left '>
                {details ? details : icardDetails[itemKey]?.content}
              </div>
          </Box>
        </Fade>
    </Modal>
  )
}

export default Icard
