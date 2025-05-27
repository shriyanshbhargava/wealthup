"use client"

import React, { useState } from 'react'

import dynamic from 'next/dynamic'

const Testimonies = dynamic(() => import('@/components/wealthometer-new/Testimony'), {ssr:false});

export const Testimonials = () => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  const handleOpenVideoPlayer = (link: string) => {
    setVideoLink(link);
    setShowVideoPlayer(true);
  }

  const handleCloseVideoPlayer = () => {
    setVideoLink('');
    setShowVideoPlayer(false);
  }
  return <Testimonies handleOpenVideoPlayer={handleOpenVideoPlayer} loop={!showVideoPlayer} />
}
