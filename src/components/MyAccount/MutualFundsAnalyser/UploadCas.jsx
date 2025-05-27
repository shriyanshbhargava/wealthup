'use client'
import React, { useEffect, useRef, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal/Modal'
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box'
import {AiOutlineClose} from 'react-icons/ai'


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

const Icard = ({open, onClose, title, content}) => {
  return (
     <Modal 
      open={open} 
      onClose={() => {onClose(false)}} 
      closeAfterTransition
      slots={{backdrop: Backdrop}}
    >
        <Fade in={open}>
          <Box sx={style} maxWidth={'90%'} >
            <div className='w-full flex justify-end'>
              <AiOutlineClose size={20} color='white' className='cursor-pointer' onClick={() => {onClose(false)}}/>
            </div>
            <div className='pt-1 pb-2 px-2 w-full'>
                {/* {title} */}
                <h5 className='text-white text-center'>Upload CAS</h5>
            </div>

            <div>
            </div>
          </Box>
        </Fade>
    </Modal>
  )
}

export default Icard
