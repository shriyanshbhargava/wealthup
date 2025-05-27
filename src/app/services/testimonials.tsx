"use client"

import "@/styles/newstyles.css"

import React from 'react'
import Testimonies from '@/components/wealthometer-new/Testimony'

export const Testimonials = () => {
  const [showVideoPlayer, setShowVideoPlayer] = React.useState(false);
  const [videoLink, setVideoLink] = React.useState('');

  function handleOpenVideoPlayer(link: React.SetStateAction<string>) {
    setVideoLink(link);
    setShowVideoPlayer(true);
  }

  return (
    <div className="text-center w-full text-white" style={{ backgroundColor: "rgb(3, 87, 130)" }}>
        <Testimonies handleOpenVideoPlayer={handleOpenVideoPlayer} loop={!showVideoPlayer} />
    </div>
  )
}
