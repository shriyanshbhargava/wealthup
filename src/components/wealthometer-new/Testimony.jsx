'use client'

import "@/styles/carousel.min.css";

import React, { useEffect, useState } from 'react';

import { Carousel } from "react-responsive-carousel";
import Image from 'next/image';
import Link from 'next/link';
import SliderCaroussel from '@/components/Slider';
import linkedinLogo from "@/assets/images/linkedin.jpeg";
import playicon from '@/assets/images/wealthometer_main/play.png'
import { testimonialData } from './testimonialdata';

const Testimonial = ({item}) => {

    return (
        <div className="flex flex-col  text-white px-10 h-full justify-center md:justify-start">
          <div className="flex flex-col items-start md:flex-row md:justify-between">
            <div className="mb-6 md:mb-0 flex  items-center text-left md:order-1">
                <div className="w-24 h-24 md:w-28 md:h-28 pl-2 rounded-full relative">
                    <Image src={item.img} alt={item.name} fill className='rounded-full' sizes='100%'/>
                </div>
                <div className="pl-4">
                    <div className="flex gap-4 items-end">
                        <p className="text-xl md:text-xl  mb-0">
                            {item.name}
                        </p>
                        <Link href={item.linkedin} target='_blank'>
                            <Image width={15} height={15} src={linkedinLogo} alt="LinkedIn Logo" />
                        </Link>
                    </div>
                    <p className="mb-0 text-base font-light">
                        {item.designation}
                    </p>
                    <p className="text-base  font-light">
                        {item.company} {item.location}
                    </p>
                </div>
              
            </div>
          </div>
          <p className=" text-left text-base md:text-xl mb-0 md:pl-32 w-fit">
            &quot;{item.review}&quot;
          </p>
        </div>
    );
}


const Testimonies = ({handleOpenVideoPlayer, loop}) => {
    const [curItem, setCurItem] = useState(1);
    const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  
    // Function to open the video player modal
    const handleOpenVideo = (url) => {
      // Extract the video ID from the URL
      setCurrentVideoUrl(url);
      setIsVideoPlayerOpen(true);
    };
  
    // Function to close the video player modal
    const handleCloseVideoPlayer = () => {
      setIsVideoPlayerOpen(false);
      setCurrentVideoUrl('');
    };
    return (
        <section id="testimony" className="px-8 py-12">
           <h2 className=" text-white text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold capitalize  leading-10 ">Transforming Lives -  Financially</h2>
            <div className="flex flex-col lg:flex-row w-full lg:w-4/5 mx-auto px-4 lg:justify-between lg:items-center">
                <div className="w-full lg:w-7/12 max-w-fit">
                    <Carousel
                        autoPlay
                        infiniteLoop={loop}
                        showArrows={true}
                        showStatus={false}
                        showThumbs={false}
                        transitionTime={300}
                        renderIndicator={(clickHandler, isSelected, index) => {
                            {isSelected ? setCurItem(index) : null}
                            return(<li></li>)
                        }}
                        
                    >
                        {testimonialData.map((item, index) => (
                            <Testimonial key={index} item={item} />
                        ))}
                    </Carousel>
                </div>

                <div className='hidden md:flex lg:block gap-4 items-center pt-12 lg:pt-0  px-8 wrapper relative lg:bottom-12 w-full  '>
                    {testimonialData.map((item, index) => (
                        <div key={index} className={`div${(index+1)%2} i${index+1} relative z-10 cursor-pointer`} onClick={()=>{handleOpenVideo(item.link)}}>
                            <Image  src={item.img} alt='image of reviwer' className={` rounded-lg ${index === curItem ? 'border-2 border-[#FF7300]' : ''} `} fill sizes='100%' style={{objectFit:'cover', overflow:'hidden'}}/>
                            <Image src={playicon} alt='play' className='relative z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                        </div>
                    ))}

{isVideoPlayerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }} onClick={handleCloseVideoPlayer}>
          <div style={{ width: '80%', height: '80%' }} onClick={(e) => e.stopPropagation()}>
            <iframe
              src={currentVideoUrl + "?autoplay=1"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}
                </div>

                <div className='md:hidden w-full px-4 sm:px-12 pt-4'>
                    <SliderCaroussel>
                    {testimonialData.map((item, index) => (
                        <div key={index} className={`div${(index+1)%2} i${index+1} relative z-10 cursor-pointer ${index === curItem ? 'border-2 border-[#FF7300]' : ''} `} onClick={()=>{handleOpenVideo(item.link)}}>
                            
                            <Image  src={item.img} alt='image of reviwer' className={`rounded-lg`} fill sizes='100%' style={{objectFit:'cover', overflow:'hidden'}}/>
                            
                            <Image src={playicon} alt='play' className='relative z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                            
                        </div>
                    ))}
  
  {isVideoPlayerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }} onClick={handleCloseVideoPlayer}>
          <div style={{ width: '80%', height: '80%' }} onClick={(e) => e.stopPropagation()}>
            <iframe
              src={currentVideoUrl + "?autoplay=1"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}
                    </SliderCaroussel>
                </div>

                
            </div>

        </section>
  )
}

export default Testimonies;