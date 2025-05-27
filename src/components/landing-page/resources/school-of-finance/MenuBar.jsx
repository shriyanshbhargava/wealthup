'use client'
import React, { useEffect, useState, useCallback } from 'react'
import {BiPaperPlane} from 'react-icons/bi'
import {AiOutlineClose} from 'react-icons/ai';

const MenuBar = ({handleOpenModal, clicked, setClicked, handleOpenShareTermModal}) => {
  const [open, setOpen] = useState(false);

  // Use useCallback to memoize the effect dependencies
  const handleClickedChange = useCallback(() => {
    if(clicked){
      setOpen(false);
      setClicked(false);
    }
  }, [clicked, setClicked]);

  useEffect(() => {
    handleClickedChange();
  }, [handleClickedChange]);

  return (
    <div className={`w-fit bg-[#E7F9F2] rounded-full  fixed z-10 bottom-10 ml-auto right-10 lg:right-20 menu-bar ${open? 'pt-4' : 'pt-0'}`}>
      <div className={`menu-items ${open? 'md:translate-y-0 opacity-100 pb-1' : 'translate-y-full opacity-0'} transition-all duration-500`}>
        <div 
          className={`m-auto rounded-full gradientbg5 w-12 ${open?'h-12':'h-0'} transition-all duration-500 text-[#E7F9F2] text-[20px]  flex items-center justify-center cursor-pointer `} 
          onClick={handleOpenModal}
        >
          +
        </div>
        <p className={`text-xs  font-medium text-[#045783] ${open? 'h-auto opacity-100 mb-1': 'h-0 opacity-0 mb-0'} transition-all duration-75`}>Add term</p>
      </div>
      <div className={`menu-items ${open? 'md:translate-y-0 opacity-100 pb-1' : 'translate-y-full opacity-0'} transition-all duration-500`}>
        <div 
          onClick={handleOpenShareTermModal}
          className={`m-auto rounded-full gradientbg5 w-12 ${open?'h-12':'h-0'} transition-all duration-500 flex items-center justify-center cursor-pointer `}
        >
          <BiPaperPlane color='#E7F9F2' size={open?20:0} />
        </div>
        <p className={`text-xs  font-medium text-[#045783] ${open? 'h-auto opacity-100 mb-1': 'h-0 opacity-0 mb-0'} transition-all duration-75`}>Share</p>
      </div>
      <div 
        onClick={()=>{setOpen(prevState => !prevState)}}
        className="m-auto rounded-full bg-[#FB7306] w-16 h-16 flex items-center justify-center cursor-pointer relative z-10">
        {!open?
          <div>
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
            <span className="toggler-icon"></span>
          </div>:
          <div>
            <AiOutlineClose size={30}/>
          </div>
        }
      </div>
    </div>
  )
}

export default MenuBar