'use client'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal/Modal'
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#E8F8F5',
  borderRadius: '8px',
  textAlign: 'center',
  color: '#045783',
  p: 2,
}

const ShareTerm: React.FC<{ openModal: boolean; onClose: () => void; pathname: string }> = ({ openModal, onClose, pathname }) => {
  const [copy, setCopy] = useState('copy')
  const textRef = useRef<HTMLParagraphElement>(null)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    const url = `https://www.wealthup.me${pathname}`
    setShareUrl(url)
  }, [pathname])

  const handleCopyText = () => {
    if (navigator.clipboard && textRef.current) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopy('copied')
        setTimeout(() => setCopy('copy'), 2000)
      })
    }
  }

  const getShareLink = (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    switch (platform) {
      case 'whatsapp':
        return `https://api.whatsapp.com/send?text=${encodedUrl}`
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}`
      default:
        return '#'
    }
  }

  return (
    <Modal open={openModal} onClose={onClose} closeAfterTransition slots={{ backdrop: Backdrop }}>
      <Fade in={openModal}>
        <Box sx={style} maxWidth="90%">
          <div className="w-full flex justify-between">
            <p className="mb-0 font-semibold sm:font-medium text-xl sm:text-2xl">Share</p>
            <AiOutlineClose size={20} color="#045783" className="cursor-pointer" onClick={onClose} />
          </div>
          <div className="pt-1 pb-4 flex w-full justify-evenly items-center">
            <a href={getShareLink('whatsapp')} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
              <FaWhatsapp className="text-[#25D366] hover:scale-110 transition-transform" size={32} />
            </a>
            <a href={getShareLink('linkedin')} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
              <FaLinkedin className="text-[#0077B5] hover:scale-110 transition-transform" size={32} />
            </a>
            <a href={getShareLink('facebook')} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
              <FaFacebook className="text-[#3b5998] hover:scale-110 transition-transform" size={32} />
            </a>
            <a href={getShareLink('twitter')} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
              <FaTwitter className="text-[#1DA1F2] hover:scale-110 transition-transform" size={32} />
            </a>
          </div>
          <div className="p-2 flex border-2 border-[#045783] rounded-sm justify-between items-center">
            <p
              className="max-w-fit text-base font-medium mb-0 overflow-hidden flex-1 whitespace-nowrap overflow-ellipsis"
              ref={textRef}
            >
              {`wealthup.me${pathname}`}
            </p>
            <button
              className="px-3 py-2 w-fit bg-[#FF7300] rounded-lg text-white hover:bg-[#e66900] transition-colors"
              onClick={handleCopyText}
            >
              {copy}
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  )
}

export default ShareTerm
