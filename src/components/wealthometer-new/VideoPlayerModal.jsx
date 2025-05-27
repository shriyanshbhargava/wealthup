import React from 'react'
import Modal from '@mui/material/Modal/Modal'
import Backdrop from '@mui/material/Backdrop';
import  Fade from '@mui/material/Fade';
import Box from '@mui/material/Box'
import ReactPlayer from 'react-player'

const style = theme => ({
  position: 'absolute',
  top:'50%',
  left:"50%",
  transform:'translate(-50%, -50%)',
  bgcolor:'background.paper',
  border:'2px solid #000'
})

const VideoPlayerModal = ({isOpen, onClose, url}) => {

  return (
    <Modal 
      open={isOpen} 
      onClose={onClose} 
      closeAfterTransition
      slots={{backdrop: Backdrop}}
    >
        <Fade in={isOpen}>
          <Box sx={style} >
            <div className='w-[320px] h-[180px] sm:w-[512px] sm:h-[288px] md:w-[640px] md:h-[360px] '>
             <ReactPlayer url={url} controls playing width={'100%'} 
              height={'100%'}/> 
            </div>
          </Box>
        </Fade>
    </Modal>
  )
}

export default VideoPlayerModal