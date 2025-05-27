"use client"

import React from 'react'
import { ToastContainer as TC, Slide } from 'react-toastify'

export const ToastContainer = () => {
  return (
    <TC position="bottom-center" transition={Slide} />
  )
}
