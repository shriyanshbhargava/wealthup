'use client'

import React, {useEffect, useRef, useState} from 'react';

import Image from 'next/image';
import Meter from './Meter';
import People from './People';
import mobileframe from '@/assets/images/wealthometer_main/mobileframenew.png';
import shadow from '@/assets/images/wealthometer_main/shadow.png'

const MobileFrame = ({isMfpa}) => {

    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const[active, setActive] = useState(0);
    const [isPageLoaded, setPageLoaded] = useState(false);
    const colors = ['#00C9A7','#FAD225','#FA8D33', '#D15200', '#D42929']
    const height = ['37px','40px','44px','47px','50px']

    const array = Array.from({ length: 5 }, (_, index) => index);

    useEffect(()=>{
      setTimeout(()=>{
        setPageLoaded(true);
      }, 1000)
    })
    

    useEffect(()=>{
      if(isPageLoaded && isVisible){
        const timer = setInterval(() => {
          setActive(prevState => {
            if (prevState >= 3) {
              clearInterval(timer);
              return prevState;
            }
            return prevState + 1;
          });
        }, 1000);
      }
    },[isPageLoaded, isVisible])

  

    useEffect(() => {
      const currentElement = elementRef.current;
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 1000)
        }
      });
  
      if (currentElement) {
        observer.observe(currentElement);
      }
  
      return () => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }, []);
  
    const className = isVisible ? 'selected meter' : '';

    


  return (
    <div className={`w-full flex items-center justify-center pb-16 md:pb-20 relative ${isMfpa ? "lg:bottom-12 lg:-mb-12" : "lg:bottom-48 lg:-mb-48"}`}>
        <div className='w-fit relative z-10 '>
            <div className='w-[320px] h-[460px] bg-cover rounded-t-[50px]'  style={{backgroundImage: `url(${mobileframe.src})`}} >
                <div className=' m-auto  text-[#035782] text-left p-[10%]'>
                    <h3 className='text-xl font-semibold pt-10 md:pt-8 lg:pt-10 pb-2 m-0'>Your Financial Health</h3>
                    <div className='py-2 px-2 rounded-lg bg-[#bfdbfe99] mb-2'>
                        <p className=' text-base m-0 px-2'>You are financially coping</p>
                        <Meter showText={false} showBg={false} arraySize={5} stopAt={2} duration={1000}/>
                    </div>
                    <div className='py-2 px-2 mt-3 lg:mt-4 rounded-lg bg-[#bfdbfe99] mb-5 '>
                        <p className=' text-base px-2 m-0'>Percentile Score</p>
                        <Meter showText={false} showBg={false} arraySize={5} stopAt={4} duration={1000}/>
                    </div>
                    <div className='flex' >
                        <div className='basis-3/5'>
                            <p className='text-base font-extrabold pt-2 m-0'>You are expected <br /> to retire at</p>
                            {/* <Image src={ageImage} alt='image' width={100} height={100}/> */}
                            <div className='w-[120px] h-[55px] flex items-end'>
                              {array.map((index)=>{
                                return(
                                  <div key={index} className={`basis-1/5 `} style={{height:height[index]}}>
                                    <People color={active === index ? colors[index] : '#035782'} height={height[index]}/>
                                  </div>

                                )
                              })}
                            </div>
                        </div>
                        <div className='basis-2/5 flex items-center' >
                            <svg className={`${className} fill-[#E8F8F5] salecoin circle frame-circle`}>
                              <defs>
                              <linearGradient id="myGradient" x1="0%" y1="30%" x2="100%" y2="0%">
                                <stop offset="20%" stopColor="rgba(255,115,0,0.9332983193277311)" />
                                <stop offset="80%" stopColor="rgba(254,255,0,0.8352591036414566)" />
                              </linearGradient>
                              </defs>
                                <circle className={`progress-circle circle1`} cx="50%" cy="50%" r="48%" ></circle>
                                <circle className={`progress-circle ${className}`} cx="50%" cy="50%" r="48%"></circle>
                                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={'#035782'}
                                className={`text-xl sm:text-2xl font-semibold ` } ref={elementRef}>
                                    75
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>
                <Image src={shadow} className='absolute -top-[1.7rem] left-full z-1' alt='shadow'/>
            </div>
        </div>
    </div>
  )
}

export default MobileFrame