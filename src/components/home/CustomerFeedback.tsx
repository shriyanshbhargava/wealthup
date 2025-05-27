import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import Image from 'next/image';
const CustomerFeedback = () => {
 
  // Define the feedbacks to map over them
  const feedbacks = [
    {
      title: "Peace of mind",
      description: "They monitor market movements, and actively manage my investments, allowing me to relax and do things that matter most to me.",
      link:"https://www.youtube.com/embed/HnW3TspUegc?si=yhN8_WSDx4oVVsAL" ,
    },
    {
      title: "Convenience",
      description: "Whether it's a simple or complex, all my money-related matters are seamlessly managed under one roof, providing me with the ultimate convenience.",
      link:"https://www.youtube.com/embed/ngV_1fdsdgQ?si=tXLpLbKTbsBWxSze",
    },
    {
      title: "Reliability",
      description: "Their experts will never ghost you. My dedicated expert is always a phone call or WhatsApp away.",
      link:"https://www.youtube.com/embed/fPNFNIdx8k0?si=gm9iNZgdeqtPYZwE",
    }
  ];

  return (
    <section className="bg-[#0CBAB8] px-8 sm:h-[800px] md:h-auto flex flex-col gap-[35px] justify-center items-center mb-0 md:pt-[4rem] md:pb-[4rem] pt-[2rem] xsm:pb-[2rem] xxsm:pb-16">
      <div className="text-white text-center">
        <h1 className="sm:w-full text-4xl sm:text-4xl lg:text-[2.5rem] text-center font-semibold capitalize leading-tight mb-4">
          Why our customers Love us
        </h1>
        <p className="text-xl sm:text-2xl">
          Beyond generic recommendations -
          <br className='br-xl-show'/>
          experience truly personalized solutions.
        </p>
      </div>
      <div className="hidden lg:flex  mb-[2rem] justify-center items-center gap-[8rem] md:gap-[4rem] text-white">
        {feedbacks.map((feedback) => (
          <div key={feedback.title} className="custom-gradient p-8 relative flex flex-col h-128 w-72 text-left rounded-lg overflow-hidden xxsm:h-[27rem] xxsm:w-80">
            <div className='h-40'>
        <iframe 
         className="absolute top-0 left-0 w-full h-40" 
         src={feedback.link}
         title="YouTube video" 
         frameBorder="0" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
         allowFullScreen
></iframe>  
            
            
            </div> {/* Placeholder for the video/image */}
            <div>
              <h5 className="text-lg sm:text-xl text-white font-medium">{feedback.title}</h5>
              <p className="text-base text-white mt-2">{feedback.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <div className='flex justify-center items-center mt-[30px] sm:mt-[65px] flex-col  text-white mb-[50px]'>
            <div className='text-white text-base text-left font-medium leading-tight flex flex-col gap-4'> 
                <div className=' w-80 xsm:w-96  lg:w-72 h-56 rounded-2xl bg-white'>
                    <div className='w-80 xsm:w-96 lg:w-72 h-56 rounded-2xl overflow-hidden relative bg-black'></div> 
                    <div className='md:hidden sm:w-[500px] mx-auto block xxsm:w-[350px] xsm:w-[450px]'>    
                    */}
      <div className='block lg:hidden w-[300px] xsm:w-[400px] sm:w-[475px] mx-auto'>
    <Carousel showThumbs={false} showStatus={false} className=''>
        {feedbacks.map((feedback) => (
            <div key={feedback.title} className='mx-auto xxsm:w-[200px] sm:w-[300px] mb-[60px] flex justify-center items-center custom-gradient'>
                <div className='mx-auto'>
                    <div className="p-8 relative flex flex-col text-left rounded-lg overflow-hidden">
                        <div className='h-44 w-[225px]  xsm:w-[225px] sm:w-[322px]'>
                            <iframe 
                                className="absolute top-0 left-0 "
                                src={feedback.link}
                                title="YouTube video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <h5 className="text-lg sm:text-xl text-white font-medium mt-4 px-8">{feedback.title}</h5>
                        <p className="text-[0.75rem] sm:text-base text-white mt-2 px-8 ">{feedback.description}</p>
                    </div>
                </div>
            </div>
        ))}
    </Carousel>
</div>


      <div className="flex justify-center">
        <Link href="/" className="bg-orange-500 h-12 sm:h-16 w-64 sm:w-96 flex justify-center rounded-lg border-orange-500 shadow">
          <button className="text-center text-white text-xl sm:text-2xl font-semibold">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CustomerFeedback;
