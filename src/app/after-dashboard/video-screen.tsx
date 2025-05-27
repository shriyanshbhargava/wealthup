"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import YouTubePlayer from './video-player'
import { Dashboard } from './dashboard'
import { useMediaQuery } from 'react-responsive'


export const VideoScreen = () => {
    const [currentTime, setCurrentTime] = useState(0)
    const [totalLength, setTotalLength] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (totalLength > 0) {
            setProgress((currentTime / totalLength) * 100)
        }
    }, [currentTime, totalLength])

  const md = useMediaQuery({ minWidth: 767 })

  return (
     <div className='realtive w-full max-h-screen md:overflow-hidden'>
            {!md ? (<div>
                <div className='md:hidden relative bg-brand-blue px-4 py-2'>
                    <Link href="/" className="navbar-brand">
                        <Image
                            src="/assets/img/wealthup-new-whitelogo.png"
                            width={130}
                            height={40}
                            alt="Logo"
                            priority
                        />
                    </Link>
                    <div className="md:hidden absolute -bottom-1 left-0 w-full z-1">
                        <div className="bg-orange-500 h-1" style={{ width: `${progress}%` }} />
                    </div>
                </div>
                <div className='md:hidden h-auto w-full bg-blue-200 relative'>
                    <YouTubePlayer videoId='YY0WrUG-zpI' setCurrentTime={setCurrentTime} setTotalLength={setTotalLength} />
                    <div className='absolute bottom-0 w-full'>
                        <div className='m-4'>
                            <div className='flex justify-between'>
                                <div className='flex flex-col ml-6 mb-4'>
                                    <span className='text-brand-sky-blue font-semibold text-xl'>Ankit Agrawal</span>
                                    <span className='text-brand-sky-blue text-lg'>Founder, Wealthup</span>
                                </div>
                                <div>
                                <Link href={`/myaccount/new-dashboard/dash`}>
                                    <button
                                      className={`flex-shrink-0 py-1 px-4 text-base rounded-[11px] flex items-center justify-between gap-4 ${progress > 90 ? "bg-brand-sky-blue" : "bg-gray-500"} text-white w-[157px] h-[36px]`}>
                                        {progress > 90 ? "Proceed" : "Skip"}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>
                                    </button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:hidden bg-brand-sky-blue py-4 text-center'>
                    <p className='mb-0 text-white font-semibold text-xl'>
                        Your dashboard is {progress > 90 ? "loaded" : "loading..."}
                    </p>
                </div>
            </div>)
            : (<div>
                <div className="hidden md:flex">
                <Dashboard />
                </div>
                <div className="hidden md:flex fixed top-0 left-0 right-0 bottom-0 backdrop:blur-md backdrop-blur-md">
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="max-w-[500px] w-full flex justify-center items-center bg-primary-sky-blue py-12">
                            <div className="w-[289px]">
                                <div className='h-auto w-full bg-blue-200 relative'>
                                    <div className="absolute top-0 left-0 w-full z-1">
                        <div className="bg-orange-500 h-1" style={{ width: `${progress}%` }} />
                    </div>
                                                <YouTubePlayer videoId='YY0WrUG-zpI' setCurrentTime={setCurrentTime} setTotalLength={setTotalLength} />
                                                <div className='absolute bottom-0 w-full'>
                                <div className='m-4'>
                                    <div className='flex justify-between'>
                                        <div className='flex flex-col ml-2 mb-4'>
                                            <span className='text-brand-sky-blue font-semibold text-xl'>Ankit Agrawal</span>
                                            <span className='text-brand-sky-blue text-lg'>Founder, Wealthup</span>
                                        </div>
                                        <div>
                                        <Link href={`/myaccount/new-dashboard/dash`}>
                                    <button
                                      className={`flex-shrink-0 py-1 px-4 text-base rounded-[11px] flex items-center justify-between gap-4 ${progress > 90 ? "bg-brand-sky-blue" : "bg-gray-500"} text-white w-[100px] h-[36px]`}>
                                        {progress > 90 ? "Proceed" : "Skip"}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                        </svg>
                                    </button>
                                </Link>
                                        </div>
                                    </div>
                                </div>
                                                </div>
                                            </div>
                                            <div className=' bg-brand-sky-blue py-4 text-center'>
                                                <p className='mb-0 text-white font-semibold text-xl'>
                                Your dashboard is {progress > 90 ? "loaded" : "loading..."}
                                                </p>
                                            </div>
                                                    </div>
                            </div>
                    </div>
                </div>
            </div>)}
        </div>
  )
}
